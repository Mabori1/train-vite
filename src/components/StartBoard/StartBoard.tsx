import { FC } from "react";
import { IGameProps } from "../../interfaces/IGameProps";
import "./StartBoard.css";

const StartBoard: FC<IGameProps> = ({ tScore, startFn }) => {
  return (
    <div className="startBoard">
      <p>Press "Enter" to start Game</p>
      <p>TotalScore: {tScore}</p>
      <button onClick={startFn}>Start</button>
    </div>
  );
};

export default StartBoard;
