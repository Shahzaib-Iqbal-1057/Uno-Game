interface Winner {
    name : string,
    me : boolean
}

function GameOverlay(props : Winner) {
  return (
    <div className="overlay">
      <div className="modal">
        {props.me ? <h2>You won the Game!</h2> : <h2>{props.name} won the Game!</h2>}
      </div>
    </div>
  );
}

export default GameOverlay;
