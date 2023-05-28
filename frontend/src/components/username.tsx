import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import React from "react";
import { useNavigate } from "react-router-dom";
import uno from './resources/uno.png';

interface HomePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Username = ({ socket }: HomePageProps) => {
  const [user, setuser] = React.useState("");
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setuser(event.target.value);
  }

  function handleClick() {
    socket.emit("username", user);
    navigate("/wait");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <img
        src={uno}
        alt="Uno"
        style={{
          filter: "brightness(1)",
          width: "15%",
          margin: "2.5% 34%",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          placeholder="Enter Username"
          value={user}
          onChange={handleChange}
          style={{
            padding: "10px",
            border: "1px solid grey",
            borderRadius: "5px",
            fontSize: "16px",
            width: "300px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 10px",
            borderRadius: "5px",
            fontSize: "15px",
            cursor: "pointer",
            border: "none",
            width: "150px",
            margin : "auto"
          }}
        >
          Join Game!
        </button>
      </div>
    </div>
  );
}

export default Username;
