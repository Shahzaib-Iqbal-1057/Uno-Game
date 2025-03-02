// Card component moved inline
import '../styles/uno-cards.css';
import { Socket } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VictoryModal from '../components/victoryModal';


interface CardProps {
  name: string;
  value: number;
  color: string;
}

interface GameTableProps {
  socket: Socket;
}

interface Message {
  sender: string;
  message: string;
}

function Card({ name, value, onClick }: CardProps & { onClick?: () => void }) {
  return (
    <div className={`${name} cursor-pointer`} onClick={onClick}>
      <span className="inner">
        <span className="mark">{value !== 0 && value}</span>
      </span>
    </div>
  );
}


export default function GameTable({ socket }: GameTableProps) {
  const location = useLocation();
  const { playerName, roomId, currentTurn } = location.state;
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [activePlayer, setActivePlayer] = useState<string>(currentTurn);
  const [players, setPlayers] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [playerCards, setPlayerCards] = useState<CardProps[]>([]);
  const [centerCard, setCenterCard] = useState<CardProps | null>(null);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState<string>('');
  const navigate = useNavigate();
  const unoSentRef = useRef(false);

  useEffect(() => {
    socket.on('receiveMessage', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('turnChange', (data) => {
      setActivePlayer(data.currentTurn);
    });

    
    socket.on('playerNamesAndCards', (data: { players: string[]; playerCards: Record<string, CardProps[]>; centerCard: CardProps }) => {
      setPlayers(data.players);
      setPlayerCards(data.playerCards[socket.id!]);
      setCenterCard(data.centerCard);
    });

    socket.on('updateCenterCard', (data: { centerCard: CardProps }) => {
      setCenterCard(data.centerCard);
  });

    socket.on('removePlayedCard', (data: { card: CardProps }) => {
      setPlayerCards((prevCards) => {
        const updatedCards = prevCards.filter((c) => c.name !== data.card.name);
    
        if (updatedCards.length === 1 && !unoSentRef.current) {
          unoSentRef.current = true;
          socket.emit("unoSignal", { roomId });
        } else if (updatedCards.length === 0) {
          socket.emit("playerWon", { roomId });
          setVictoryMessage("You won!");
          setIsVictoryModalOpen(true);
          unoSentRef.current = false; 
        } else if (updatedCards.length > 1) {
          unoSentRef.current = false; 
        }
    
        return updatedCards;
      });
    });
    

    socket.on('receiveCardFromDeck', (data: { card: CardProps }) => {
      setPlayerCards((prevCards) => [...prevCards, data.card]);
    });

    socket.on('receiveMultipleCards', (data: { cards: CardProps[] }) => {
        setPlayerCards((prevCards) => [...prevCards, ...data.cards]);
    });

    socket.on('winnerNotification', () => {
      setVictoryMessage('You won!');
      setIsVictoryModalOpen(true);
    });

    socket.on('gameOverNotification', (data: { winner: string }) => {
        setVictoryMessage(`${data.winner} won!`);
        setIsVictoryModalOpen(true);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('turnChange');
      socket.off('playerNames');
      socket.off('updateCenterCards');
      socket.off('removePlayedCard');
      socket.off('receiveCardFromDeck');
      socket.off('receiveMultipleCards');
      socket.off('winnerNotification');
      socket.off('gameOverNotification');
    };
  }, [socket]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      console.log('sending message : ', messageInput);
      socket.emit('sendMessage', {
        name: playerName,
        message: messageInput.trim(),
        roomId: roomId,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: playerName, message: messageInput.trim() },
      ]);
      setMessageInput('');
    }
  };

  const handleCardClick = (card: CardProps) => {
    socket.emit('playCard', {
      roomId: roomId,
      card: card,
    });
  };

  const handlePickFromDeck = () => {
    socket.emit('pickFromDeck', {
        roomId: roomId,
    });
  };

  const handleVictoryModalClose = () => {
    setIsVictoryModalOpen(false);
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-6 h-full max-w-[1400px] mx-auto">
        {/* Game Area */}
        <div className="relative flex flex-col">
          <div className="flex-1">
            {/* Game Table - Using fixed dimensions similar to original */}
            <div className="relative w-[1000px] h-[500px] mx-auto">
              <div className="absolute inset-0 bg-[#4aad4a] border-[15px] border-[#a95555] rounded-[150px]">
                {/* Inner Table Border */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[615px] h-[300px] border-[5px] border-[#63c763] rounded-[10px]" />

                {/* Player Names */}
                <div className="absolute inset-0">
                  {players
                    .slice()
                    .sort((a, b) =>
                      a === playerName ? 1 : b === playerName ? -1 : 0,
                    ) // Move the current player to the bottom
                    .map((player, index) => (
                      <div
                        key={index}
                        className={`absolute ${
                          player === playerName
                            ? 'left-[44%] bottom-[2%]' // Current player goes at the bottom
                            : index === 0
                              ? 'left-[44%] top-5' // Top player
                              : index === 1
                                ? 'left-0 top-[44%] -rotate-90' // Left player
                                : 'right-0 top-[44%] rotate-90' // Right player
                        }`}
                      >
                        <PlayerTag
                          name={player}
                          active={activePlayer === player}
                        />
                      </div>
                    ))}
                </div>
                {/* Center Cards */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {centerCard && <Card name={centerCard.name} value={centerCard.value} color={centerCard.color} />}
                </div>
                {/* Table Shadows - Matching original design */}
                <div className="absolute -top-[15px] -left-[15px] w-[1015px] h-[515px] border-[7px] border-black/10 rounded-[150px]" />
                <div className="absolute top-0 left-0 w-[985px] h-[486px] border-[7px] border-black/10 rounded-[130px]" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={handlePickFromDeck}
            >
              Pick from deck
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Messages */}
          <div className="bg-slate-800 rounded-xl p-4 h-[300px] flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>

            {/* Message box with scrolling */}
            <div
              className="space-y-2 flex-1 overflow-y-auto"
              ref={messagesEndRef}
            >
              <div className="space-y-2 h-full max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-slate-700 text-white p-3 rounded-lg"
                  >
                    <strong>{msg.sender}:</strong> {msg.message}
                  </div>
                ))}
                {/* Dummy div to scroll into view */}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input field */}
            <div className="mt-4">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
            </div>
          </div>
          {/* Player Cards */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">My Cards</h2>
            <div className="flex flex-wrap gap-2 h-[300px] overflow-y-auto max-w-full p-2">
              {playerCards.map((card, index) => (
                <Card key={index} name={card.name} value={card.value} color={''} onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <VictoryModal isOpen={isVictoryModalOpen} onClose={handleVictoryModalClose} victoryMessage = {victoryMessage}/>
    </div>
  );
}

function PlayerTag({
  name,
  active = false,
}: {
  name: string;
  active?: boolean;
}) {
  return (
    <div
      className={`px-2 py-2 text-sm font-medium ${
        active
          ? 'bg-[#96e296] text-slate-900'
          : 'bg-transparent text-[#96e296] border-2 border-[#96e296]'
      } rounded-md w-[100px] text-center overflow-hidden text-ellipsis whitespace-nowrap`}
    >
      {name}
    </div>
  );
}
