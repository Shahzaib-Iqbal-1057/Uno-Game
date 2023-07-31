// import HomePage from './components/Home';
// import Username from './components/username';
// import Wait from './components/wait';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {io} from "socket.io-client";
// import "./styles/index.css";

// const socket = io('https://uno-game-vtdp.onrender.com/',{ transports: ["websocket"] });
// socket.connect()

// function App() {
//   return (
//     <div>
//       <Router>
      
//       <Routes>
//           <Route path = "/" element = {<Username socket = {socket}/>}/>
//           <Route path = "/wait" element = {<Wait socket = {socket}/>}/>
//           <Route path="/homepage" element={<HomePage socket={socket} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;



'use client'
import React from "react";
import socket from "./webSocket";
import Link from "next/link";
import Image from "next/image";


export default function page () {
  const [user, setuser] = React.useState<string>("");
  const [players,setPlayers] = React.useState<number>(0);



  const GlowingBox = ({ option } : {option : string}) => { 
    let glow : string = players === Number(option[0]) ? "" : "hover:";
    return (
      <div className={`relative inline-block p-6 m-4 border border-white-1px rounded-lg ${glow}border-blue-600 2px shadow-md transition-all cursor-pointer`}
      onClick={()=>{setPlayers(Number(option[0]))}} 
      >
        <div className="absolute inset-0 rounded-lg" />
        <div className="relative z-10 text-white ">{option}</div>
      </div>
    );
  };

  return (
    <div className="uno-image">
      <Image
        src= "/uno.png"
        alt="Uno logo"
        width={50}
        height={50}
        className="brightness-100 w-1/6 m-10"
        unoptimized={true}
      />
      <div className="flex flex-col items-center">
        <input
          placeholder="Enter Name"
          value={user}
          onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setuser(event.target.value)}}
          className="px-4 py-2 rounded-md text-lg w-72 mb-4 focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-transparent message-input-container-homepage" 
        />
      <div className="">
        <GlowingBox option="2 Players" />
        <GlowingBox option="3 players" />
        <GlowingBox option="4 Players" />
      </div>
       
        <Link href= {`/wait?players=${players}`}>   
          <button
          onClick={()=>{socket.emit("username", {user : user,players : players});}}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-lg cursor-pointer w-36 mx-auto flex justify-center mt-5"
          >
          Join Game!
          </button>
        </Link>
      </div>
      
    </div>
  );
  
}
