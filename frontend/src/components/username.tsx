import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import React from "react";
import { useNavigate } from "react-router-dom";
const uno = require("./resources/uno.png");

interface HomePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Username = ({ socket }: HomePageProps) => {
  const [user, setuser] = React.useState<string>("");
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setuser(event.target.value);
  }

  function handleClick() {
    socket.emit("username", user);
    navigate("/wait");
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <img
        src={uno}
        alt="Uno logo"
        className="brightness-100 w-1/6 m-10"
      />
      <div className="flex flex-col">
        <input
          placeholder="Enter Username"
          value={user}
          onChange={handleChange}
          className="px-4 py-2 rounded-md text-black text-lg w-72 mb-4 border-none focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        />
        <button
        onClick={handleClick}
        className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-lg cursor-pointer w-36 mx-auto"
      >
        Join Game!
      </button>
      </div>
    </div>
  );
  
}

export default Username;
