import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerForm from '../components/playerform';
import StartButton from '../components/startbutton';
import Background from '../components/background';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  socket: Socket;
}

function Home({ socket }: HomeProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerCount, setPlayerCount] = useState(2);
  const [currentPlayers, setCurrentPlayers] = useState(1);
  const [, setCurrentTurn] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (playerName && playerCount >= 2) {
      setGameStarted(true);
      // Emit to join a room
      socket.emit('joinRoom', {
        name: playerName,
        maxPlayers: playerCount,
      });
    }
  };

  useEffect(() => {
    // Listen for room updates
    socket.on('roomUpdate', (data) => {
      setCurrentPlayers(data.playersJoined);
    });

    socket.on('gameStart', (data) => {
      setCurrentTurn(data.currentTurn);

      // ✅ Redirect to game page and pass playerName, roomId, and currentTurn
      navigate('/game', {
        state: {
          playerName: playerName,
          roomId: data.roomId,
          currentTurn: data.currentTurn,
        },
      });
    });

    // Listen for game over event
    socket.on('gameOver', (data) => {
      alert(data.message);
      setGameStarted(false);
      navigate('/'); // Redirect to homepage
    });

    // Cleanup on unmount
    return () => {
      socket.off('roomUpdate');
      socket.off('gameOver');
      socket.off('gameStart');
    };
  }, [socket, playerName, navigate]);

  return (
    <div className="App">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="content"
      >
        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="title">UNO</h1>
              <PlayerForm
                playerName={playerName}
                setPlayerName={setPlayerName}
                playerCount={playerCount}
                setPlayerCount={setPlayerCount}
              />
              <StartButton onClick={handleStartGame} disabled={!playerName} />
            </motion.div>
          ) : (
            <motion.div
              key="started"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="game-started"
            >
              <h2>Game Started!</h2>
              <p>Enjoy playing UNO, {playerName}!</p>
              <p>
                Number of players joined: {currentPlayers}/{playerCount}, Try joining with multiple tabs if you are just checking out the game
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Home;
