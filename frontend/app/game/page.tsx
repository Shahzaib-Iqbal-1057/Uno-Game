'use client'
import React from "react"
import socket from "../webSocket"
import GameContainer from "../components/game-container"
import MessagesCardsContainer from "../components/Messages-Cards-Container"
import GameOverlay from "../components/overlay";
import "../styles/index.css";
import "../styles/uno-cards.css";
import "../styles/uno.css"


interface Card {
    name : string,
    value : number,
    color : string
}
interface PlayerNames {
    my_name : string,
    other_player_names : string[]
}

const HomePage = () => {
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
            socket.off("winners");
        }
    },[socket])
    
    return (
        <>
            <div className = "main-container bg-gradient-to-t from-blue-900">
                <GameContainer socket={socket} player_names = {player_names}/>
                <MessagesCardsContainer socket={socket} player_names = {player_names}/>
                {winner !== "" && <GameOverlay name={player_names.my_name} winner = {winner} onButtonClick = {()=>showWinner("")} socket = {socket}/>}
            </div>
        </>
    )
}
export default HomePage;