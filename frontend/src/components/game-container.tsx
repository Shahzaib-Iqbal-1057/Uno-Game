import React from "react"
import { io, Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"



interface HomePageProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    player_names : {
        my_name : string,
        other_player_names : string[]
    }
}
interface Card {
    name : string,
    value : number,
    color : string
}


const GameContainer = ({socket,player_names} : HomePageProps) => 
{
    const [deck_card,setDeckCard] = React.useState<Card>({name : "",value : 0,color : ""});
    const [turn,setTurn] = React.useState<string>("");


    const pickFromDeck = () => {
        socket.emit("pick_from_deck");
    }

    React.useEffect(()=>{
        socket.on("deck_card",(data)=>{
            setDeckCard(data);
        })
        socket.on("turn",(data)=>{
            setTurn(data);
        })
        return ()=>{
            socket.off("deck_card");
            socket.off("turn");
        }
    },[socket])

    return (
        <div className = "game-container">
            <div className = "heading-container">
                <h1 className="text-2xl">UNO</h1>
            </div>
            <div className = "game-table-container">
            <div className = "game-table">
                <div className = "card-area">
                    <div className = "card discard-pile black">
                    <span className = "inner">
                        <span className = "mark">U</span>
                    </span>
                    </div>
                    {deck_card.name !== "" && <div className = {deck_card.name}>
                    <span className = "inner">
                        <span className = "mark">{deck_card.value !== 0 && deck_card.value}</span>
                    </span>
                    </div>}
                </div>
                {player_names.other_player_names !== undefined && <>
                    <div className="game-players-container">
                        <div className={`player-tag player-one ${turn === player_names.my_name ? 'ring-4 ring-yellow-600 shadow-lg' : ''}`}>
                            {player_names.my_name}
                        </div>
                    </div>
                    <div className = "game-players-container">
                        <div className={`player-tag player-two ${turn === player_names.other_player_names[0] ? 'ring-4 ring-yellow-600 shadow-lg' : ''}`}>
                            {player_names.other_player_names[0]}
                        </div>
                    </div>

                    <div className = "game-players-container">
                        <div className={`player-tag player-three ${turn === player_names.other_player_names[1] ? 'ring-4 ring-yellow-600 shadow-lg' : ''}`}>
                            {player_names.other_player_names[1]}
                        </div>
                    </div>

                    <div className = "game-players-container">
                        <div className={`player-tag player-four ${turn === player_names.other_player_names[2] ? 'ring-4 ring-yellow-600 shadow-lg' : ''}`}>
                            {player_names.other_player_names[2]}
                        </div>
                    </div>
                </>}
                </div>
            </div>
            <div className = "select-rang-container">
            <button className="bg-red-600 hover:bg-red-700 px-2 py-2.5 text-sm cursor-pointer w-30 mx-auto whitespace-nowrap" onClick={pickFromDeck}>
                Pick from Deck
            </button>
            </div>
            </div>
    )
}
export default GameContainer;