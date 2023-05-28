import React from "react"
import { io, Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import GameOverlay from "./overlay"
import './uno.css'
import './uno-cards.css'



interface HomePageProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> 
}
interface Card {
    name : string,
    value : number,
}


function HomePage({socket}:HomePageProps){
    const [data,setData] = React.useState({
        my_name : "",
        other_names : ["","",""],
    }) 
    const [cards,setCards] = React.useState<Card[]>([]);
    const [deck_card,setDeckCard] = React.useState({name : "",value : 0});
    const [free_card,isFreeCard] = React.useState(false);
    const [text,setText] = React.useState("");
    const [message,setMessage] = React.useState("");
    const [current_player,setCurrentPlayer] = React.useState("");
    const [winner,setWinner] = React.useState("");


    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter")
        {
            setMessage("You : " + text);
            setText("");
            socket.emit("sendMessage",{message : text,name : data.my_name});
        }
    }
    function getCardFromDeck() {
        socket.emit("getCardFromDeck");
    }
    function CardSingle(card : Card) {
        function handleClick() {
            let flag : boolean = false;
            if(free_card)
            {
                flag = true;
                isFreeCard(false);
            }
            else
            {
                if(card.name === "card wild" || deck_card.name === "card wild")
                {
                    flag = true;
                }
                else
                {
                    if(card.name.split(' ')[1].split('-')[0] === "num" && deck_card.name.split(' ')[1].split('-')[0] === "num")
                    {
                        if(card.name.split(' ')[2] === deck_card.name.split(' ')[2] || card.value === deck_card.value)
                        {
                            flag = true;
                        }
                    }
                    if(card.name.split(' ')[1].split('-')[0] !== "num" && deck_card.name.split(' ')[1].split('-')[0] === "num")
                    {
                        if(card.name.split(' ')[2] === deck_card.name.split(' ')[2])
                        {
                            flag = true;
                        }
                    }
                    if(card.name.split(' ')[1].split('-')[0] === "num" && deck_card.name.split(' ')[1].split('-')[0] !== "num")
                    {
                        if(card.name.split(' ')[2] === deck_card.name.split(' ')[2])
                        {
                            flag = true;
                        }
                    }
                    if(card.name.split(' ')[1].split('-')[0] !== "num" && deck_card.name.split(' ')[1].split('-')[0] !== "num")
                    {
                        if(card.name.split(' ')[2] === deck_card.name.split(' ')[2])
                        {
                            flag = true;
                        }
                    }   
                }
            }
            if(flag && current_player === data.my_name)
            {
                socket.emit("cardOnDeck",card);
                setCards((prev_array)=>{
                    let new_array = prev_array.slice();
                    new_array.splice(new_array.findIndex((obj : Card)=>(obj.name === card.name && obj.value === card.value)),1);
                    if(new_array.length === 0)
                    {
                        socket.emit("winner",data.my_name);
                        setWinner(data.my_name); 
                    }
                    return new_array;
                })
                if(card.name === "card wild")
                {
                    isFreeCard(true);
                }
            }

        }
        return (  <div className={card.name} onClick = {handleClick}>
            <span className="inner">
                <span className="mark">{card.value !==0 && card.value}</span>
            </span>
        </div>
      )
    }
    function generateCards(cards : Card[])
    {
        return (
            <>
            {cards.map(card =>card !== null && <CardSingle name = {card.name} value = {card.value}/>) }
            </>
        )
    }
    React.useEffect(()=>{
        socket.on("playerData",(playerData)=>{
            setData(playerData);
        })
        socket.on("cards",(data)=>{
            setCards(data);
        })
        socket.on("cardOnDeck",(data)=>{
            setDeckCard(data);
        })
        socket.on("message",(data)=>{
            setMessage(data.name + " : " + data.message);
        })
        socket.on("turn",(data)=>{
            setCurrentPlayer(data);
        })
        socket.on("getCardFromDeck",(data)=>{
            console.log(data);
            setCards((prev_array)=>{
                return [...prev_array,data]
            })
        })
        socket.on("winner",(name : string)=>{
            setWinner(name);
        })
        return(()=>{
            socket.off("playerData");
            socket.off("cards");
            socket.off("message");
            socket.off("turn");
            socket.off("getCardFromDeck");
            socket.off("winner");
        })
    },[socket])
    React.useEffect(()=>{
        socket.emit("ready",data.my_name);
    },[])
    return(
        <>
            <div className="main-container">
            <div className="game-container">
                <div className="heading-container">
                <h1>UNO</h1>
                </div>
                <div className="game-table-container">
                <div className="game-table">
                    <div className="card-area">
                    <div className="card discard-pile black">
                        <span className="inner">
                        <span className="mark">U</span>
                        </span>
                    </div>
                        {deck_card != null && deck_card.name !== "" && CardSingle(deck_card)}
                    </div>

                    <div className="game-players-container">
                    <div className={`player-tag player-one ${data.my_name === current_player ? "glowing" : ""}`}>{data.my_name}</div>
                    </div>

                    <div className="game-players-container">
                    <div className={`player-tag player-two ${data.other_names[0] === current_player ? "glowing" : ""}`}>{data.other_names[0]}</div>
                    </div>

                    <div className="game-players-container">
                    <div className={`player-tag player-three ${data.other_names[1] === current_player ? "glowing" : ""}`}>{data.other_names[1]}</div>
                    </div>

                    <div className="game-players-container">
                    <div className={`player-tag player-four ${data.other_names[2] === current_player ? "glowing" : ""}`}>{data.other_names[2]}</div>
                    </div>
                </div>
                </div>
                <div className="select-rang-container">
                <button className="button-select-rang" onClick={getCardFromDeck}>
                    <span>Pick from deck</span>
                </button>
                {/* <button className="button-select-rang">Pass</button> */}
                </div>
            </div>
            <div className="messages-and-cards-container">
            <div className="right-side-container messages-container">
            <h1>Messages</h1>
            <div className="message-box">
                <div className="message-content-container message">{message}</div>
                <input className="message-content-container" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            </div>
            <div className="right-side-container my-cards-container">
            <h1>My Cards</h1>
            <div className="my-cards-inner-container">
                {generateCards(cards)}
            </div>
            </div>
            </div>

            </div>
            {(winner !== "") && <GameOverlay name= {winner} me = {cards.length === 0}/>}
        </>
    )

}
export default HomePage