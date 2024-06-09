import { FC } from "react";
import "./MouseController.css";

type TMouseControllerProps = {
  lvl: number;
  curSpeed: number;
  setDir: (data: string) => void;
  dir: string;
  speedFn: (data: number) => void;
};

export const MouseController: FC<TMouseControllerProps> = ({
  lvl,
  curSpeed,
  dir,
  setDir,
  speedFn,
}) => {
  const setDirectionHandler = (data: string) => {
    switch (data) {
      case "ArrowRight":
        if (dir !== "left") {
          setDir("right");
        }
        break;
      case "ArrowLeft":
        if (dir !== "right") {
          setDir("left");
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
      case "Pause":
        speedFn(99999999999);
        break;
      case "Start":
        speedFn(lvl === 1 ? 700 : 750 - lvl * 50);
        break;
      default:
        break;
    }
  };

  return (
    <div className="controller">
      <div>
        <button onClick={() => setDirectionHandler("ArrowLeft")}>left</button>
        <button onClick={() => setDirectionHandler("ArrowRight")}>right</button>
      </div>
      <div>
        <button
          onClick={() =>
            setDirectionHandler(curSpeed > 999 ? "Start" : "Pause")
          }
        >
          {curSpeed > 999 ? "Start" : "Pause"}
        </button>
      </div>
      <div>
        <button onClick={() => setDirectionHandler("ArrowUp")}>up</button>
        <button onClick={() => setDirectionHandler("ArrowDown")}>down</button>
      </div>
    </div>
  );
};
