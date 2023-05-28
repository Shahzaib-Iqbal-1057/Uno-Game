import React from "react";
import { Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { useNavigate } from "react-router-dom";

interface HomePageProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> 
}

const Wait = ({socket} : HomePageProps) => {
    const navigate = useNavigate();
    React.useEffect(()=>{
        socket.on("homepage",()=>{
            navigate("/homepage")
        })
        return(()=>{
            socket.off("homepage");
        })
    },[socket])
    return (
        <h3 style={{
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "24px",
            textShadow: "1px 1px 1px #ccc"
          }}>Please wait while others join...</h3>
          
    )
}
export default Wait;