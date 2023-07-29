'use client'
import React from "react";
import socket from "../webSocket";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const Wait = () => {
    const [num_players,setNumPlayers] = React.useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    React.useEffect(()=>{
        socket.on("homepage",()=>{
            router.push(`/game?players=${searchParams.get('players')}`);
        })
        socket.on("num_players",(numplayers : number)=>{
            setNumPlayers(numplayers);
        })
        return(()=>{
            socket.off("homepage");
            socket.off("num_players");
        })
    },[socket])
    return (
 
    <div className="flex flex-col items-center mt-6 h-screen  bg-gradient-to-t from-blue-900">
      <Image
        src= "/uno.png"
        alt="Uno logo"
        width={50}
        height={50}
        className="brightness-100 w-1/6 m-10"
        unoptimized = {true}
      />
      
      
      <h3 className="text-white text-2xl mb-8">Please wait while others join...{num_players}/{searchParams.get('players')}</h3>
        <div className="flex items-center justify-center">
        <div className="w-[50%]  flex-center h-10">
            <div
                style={{ width: `35px`, height: `35px` }}
                className="animate-spin">
                <div className="h-full w-full border-4 border-t-blue-900
                border-b-blue-900 rounded-[50%]">
                </div>
            </div>
            </div>
        </div>
    </div>
      
    )
}
export default Wait;