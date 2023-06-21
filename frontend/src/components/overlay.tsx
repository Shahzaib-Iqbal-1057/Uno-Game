interface Winner {
    name : string,
    winner : string,
    onButtonClick : React.MouseEventHandler<HTMLDivElement>
}

function GameOverlay(props : Winner) {
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
  </div>
</div>


  
  );
}

export default GameOverlay;
