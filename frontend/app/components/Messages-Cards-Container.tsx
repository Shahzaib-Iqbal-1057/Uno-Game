'use client'
import React from "react"
import { Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"



interface HomePageProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    player_names : {
        my_name : string,
        other_player_names : string[]
    }
}
interface PlayerMessage {
    message : string,
    name : string
}
interface Card {
    name : string,
    value : number,
    color : string
}




const MessagesCardsContainer = ({socket,player_names} : HomePageProps) => 
{
    const [messages,setMessages] = React.useState<PlayerMessage[]>([]);
    const [message,setMessage] = React.useState<string>("");
    const [cards,setCards] = React.useState<Card[]>([]);



    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }
    const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter")
        {
            socket.emit("message",{message : message, name : player_names.my_name});
            setMessage("");
        }
    }
    const handleClick = (card : Card) => {
        console.log(card);
        socket.emit("card_selected",card);
    }

    const createMessages = () => {
        return messages.map(player_message => {
          return (
            <div
              className={`message-content-container ${player_message.name === player_names.my_name ? "ml-auto float-right" : "mr-auto"} whitespace-normal max-w-full`}
            >
              {`${player_message.name !== player_names.my_name ? `${player_message.name} : ` : ""} ${player_message.message}`}
            </div>
          );
        });
    };
      

    const createCards = () => {
        return (cards.map(card=>{
            return (
                <div className = {`${card.name}`}  onClick = {()=>handleClick(card)}>
                    <span className="inner">
                        <span className="mark">{card.value !==0 && card.value}</span>
                    </span>
                </div>
            )
        }))
    }

    React.useEffect(()=>{
        socket.on("message",(message : PlayerMessage) => {
            setMessages(prev_messages=> [message,...prev_messages]);
        })
        socket.on("cards",(data : Card[])=>{
            setCards(data);
        })
        return ()=>{
            socket.off("message");
            socket.off("cards");
        }
    },[socket])

    return (
        <div className = "messages-and-cards-container">
            <div className = "right-side-container messages-container mt-5">
                <div className = "message-box ">
                    {createMessages()}
                </div>
                <input className="message-input-container border-none focus:outline-none bg-transparent" placeholder="Enter Message Here to Chat" value={message} onChange = {handleChange} onKeyDown = {handleKeyDown}>
                </input>
            </div>
            <div className = "right-side-container my-cards-container">
            <h1 className="text-center mt-10 mb-5 text-2xl">My Cards</h1>
                <div className = "my-cards-inner-container">
                    {createCards()}
                </div>
            </div>
      </div>
    )
}
export default MessagesCardsContainer;