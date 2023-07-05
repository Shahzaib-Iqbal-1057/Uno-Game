import React from "react"
import { io, Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import './uno.css'
import './uno-cards.css'
import GameContainer from "./game-container"
import MessagesCardsContainer from "./Messages-Cards-Container"
import GameOverlay from "./overlay"


interface HomePageProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}
interface Card {
    name : string,
    value : number,
    color : string
}
interface PlayerNames {
    my_name : string,
    other_player_names : string[]
}

const HomePage = ({socket} : HomePageProps) => {
    const [player_names,setPlayerNames] = React.useState<PlayerNames>({my_name : "",other_player_names : ["","",""]});
    const [winner,showWinner] = React.useState<string>("");
    React.useEffect(()=>{
        socket.on("player_names",(data)=>{
            setPlayerNames(data);
        })
        socket.on("winner",(data)=>{
            showWinner(data);
        })
        return () => {
            socket.off("player_names");
        }
    },[socket])
    
    return (
        <>
            <div className = "main-container">
                <GameContainer socket={socket} player_names = {player_names}/>
                <MessagesCardsContainer socket={socket} player_names = {player_names}/>
                {winner !== "" && <GameOverlay name={player_names.my_name} winner = {winner} onButtonClick = {()=>showWinner("")} socket = {socket}/>}
            </div>
        </>
    )
}
export default HomePage;