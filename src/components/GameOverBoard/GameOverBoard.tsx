import { FC } from "react";
import "./GameOverBoard.css";
import { IGameProps } from "../../interfaces/IGameProps";

const GameOverBoard: FC<IGameProps> = ({ startFn, tScore }) => {
  return (
    <div className="gameover-board">
      <h2>Game Over!</h2>
      <p>Press "Enter" to start Game</p>
      <p>TotalScore: {tScore}</p>
      <button onClick={startFn}>Start</button>
    </div>
  );
};

export default GameOverBoard;
