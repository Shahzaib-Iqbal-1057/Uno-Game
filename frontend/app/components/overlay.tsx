'use client'
import { Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation';;


interface Winner {
  name : string,
  winner : string,
  onButtonClick : React.MouseEventHandler<HTMLDivElement>
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

function GameOverlay(props : Winner) {

  const router = useRouter();
  const searchParams = useSearchParams();
  return (
  <div className="overlay">
    <div className="modal text-black bg-red-600 text-2xl font-bold relative">
    {props.name === props.winner ? (
      <h2>You won the Game!</h2>
    ) : (
      <h2>{props.winner} won the Game!</h2>
    )}
    <div className="absolute top-0 right-0" onClick={props.onButtonClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-black cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <button
        onClick={()=>{props.socket.emit("username",{user : props.name,players : Number(searchParams.get('players'))});router.push(`/wait?players=${searchParams.get('players')}`)}}
        className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-lg cursor-pointer w-25 mx-auto"
      >
        Play again
      </button>
  </div>
</div>

  );
}

export default GameOverlay;
