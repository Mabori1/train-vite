import { FC } from "react";
import "./MouseController.css";

type TMouseControllerProps = {
  setDir: (data: string) => void;
  dir: string;
};

const MouseController: FC<TMouseControllerProps> = ({ dir, setDir }) => {
  const setDirHandler = (data: string) => {
    switch (data) {
      case "ArrowLeft":
        if (dir !== "right") {
          setDir("left");
        }
        break;
      case "ArrowRight":
        if (dir !== "left") {
          setDir("right");
        }
        break;
      case "ArrowUp":
        if (dir !== "down") {
          setDir("up");
        }
        break;
      case "ArrowDown":
        if (dir !== "up") {
          setDir("down");
        }
        break;

      default:
        break;
    }
  };
  return (
    <div className="controller">
      <div>
        <button onClick={() => setDirHandler("ArrowLeft")}>left</button>
        <button onClick={() => setDirHandler("ArrowRight")}>right</button>
      </div>
      <div>
        <button onClick={() => setDirHandler("ArrowUp")}>up</button>
        <button onClick={() => setDirHandler("ArrowDown")}>down</button>
      </div>
    </div>
  );
};

export default MouseController;
