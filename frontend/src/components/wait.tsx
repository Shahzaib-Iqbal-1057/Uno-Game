import React from "react";
import { Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { useNavigate } from "react-router-dom";
const uno = require("./resources/uno.png");

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
 
    <div className="flex flex-col items-center mt-6">
      <img
        src={uno}
        alt="Uno logo"
        className="brightness-100 w-1/6 m-10"
      />
      <h3 className="text-white text-2xl mb-8">Please wait while others join...</h3>
        <div className="flex items-center justify-center">
        <div className="w-[50%]  flex-center h-10">
            <div
                style={{ width: `${35}px`, height: `${35}px` }}
                className="animate-spin">
                <div className="h-full w-full border-4 border-t-red-500
                border-b-red-500 rounded-[50%]">
                </div>
            </div>
            </div>
        </div>
    </div>
      
    )
}
export default Wait;




