import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Train from "./components/Train/Train";
import { Passenger } from "./components/Passenger/Passenger";
import { ITrain } from "./interfaces/ITrain";
import MouseController from "./components/MouseController/MouseController";
import GameOverBoard from "./components/GameOverBoard/GameOverBoard";
import StartBoard from "./components/StartBoard/StartBoard";

function App() {
  const BOARD_LENGTH = 10;
  const [train, setTrain] = useState<ITrain[]>([
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");
  const getPassenger = () => {
    const x = Math.floor(Math.random() * BOARD_LENGTH);
    const y = Math.floor(Math.random() * BOARD_LENGTH);
    return { x, y };
  };
  const [passenger, setPassenger] = useState(getPassenger());
  const [gameOver, setGameOver] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const isTrainCheck = (element: ITrain, index: number) => {
    const x = index % BOARD_LENGTH;
    const y = Math.floor(index / BOARD_LENGTH);

    return element.x === x && element.y === y;
  };

  const startGameHandler = useCallback(() => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setDirection("right");
    setPassenger(getPassenger());
    setTrain([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    setIsGame(true);
  }, []);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "h":
          if (direction !== "right") {
            setDirection("left");
          }
          break;
        case "ArrowRight":
        case "l":
          if (direction !== "left") {
            setDirection("right");
          }
          break;
        case "ArrowUp":
        case "k":
          if (direction !== "down") {
            setDirection("up");
          }
          break;
        case "ArrowDown":
        case "j":
          if (direction !== "up") {
            setDirection("down");
          }
          break;
        case "Enter":
          startGameHandler();
          break;

        default:
          break;
      }
    },
    [direction, startGameHandler],
  );

  const trainMoveHandler = useCallback(() => {
    const newTrain = [...train];
    const headTrain = { ...newTrain[0] };

    switch (direction) {
      case "left":
        headTrain.x - 1 < 0 ? (headTrain.x = 9) : (headTrain.x -= 1);
        break;
      case "right":
        headTrain.x + 1 > 9 ? (headTrain.x = 0) : (headTrain.x += 1);
        break;
      case "up":
        headTrain.y - 1 < 0 ? (headTrain.y = 9) : (headTrain.y -= 1);
        break;
      case "down":
        headTrain.y + 1 > 9 ? (headTrain.y = 0) : (headTrain.y += 1);
    }

    newTrain.unshift(headTrain);
    if (newTrain.length > 1) {
      newTrain.pop();
    }
    setTrain(newTrain);
  }, [train, direction]);

  useEffect(() => {
    const moveInterval = setInterval(trainMoveHandler, 700 - level * 50);
    return () => clearInterval(moveInterval);
  }, [trainMoveHandler, level]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  useEffect(() => {
    if (train[0].x === passenger.x && train[0].y === passenger.y) {
      setPassenger(getPassenger());

      setScore((prev) => prev + 10);
      if (train.length % 4 === 0) {
        if (level < 13) {
          setLevel((prev) => prev + 1);
          // setDirection("right");
          // setTrain([
          //   { x: 1, y: 0 },
          //   { x: 0, y: 0 },
          // ]);
          const newTrain = [...train];
          newTrain.push(newTrain[newTrain.length - 1]);
          setTrain(newTrain);
        }
      } else {
        const newTrain = [...train];
        newTrain.push(newTrain[newTrain.length - 1]);
        setTrain(newTrain);
      }
    }
    for (let i = 1; i < train.length; i++) {
      if (train[0].x === train[i].x && train[0].y === train[i].y) {
        setGameOver(true);
        if (score > totalScore) {
          localStorage.setItem("totalScore", JSON.stringify(score));
          setTotalScore(score);
        }
      }
    }
  }, [level, passenger, train, score, totalScore]);

  useEffect(() => {
    const newTotalScore = localStorage.getItem("totalScore");
    if (!newTotalScore) {
      localStorage.setItem("totalScore", JSON.stringify(0));
    } else {
      setTotalScore(Number(newTotalScore));
    }
  }, [totalScore]);

  return (
    <>
      <div className="game">
        <h1>Train Game</h1>
        <section>
          <p>Level: {level}</p>
          <p>Score: {score}</p>
        </section>
        {!isGame ? (
          <StartBoard startFn={startGameHandler} tScore={totalScore} />
        ) : (
          <div className="gameboard">
            {!gameOver ? (
              <Passenger x={passenger.x} y={passenger.y} />
            ) : (
              <GameOverBoard tScore={totalScore} startFn={startGameHandler} />
            )}
            {Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
              <div className="item" key={i}>
                {!gameOver && train.some((t) => isTrainCheck(t, i)) && (
                  <Train isHead={isTrainCheck(train[0], i)} dir={direction} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <MouseController dir={direction} setDir={setDirection} />
    </>
  );
}

export default App;
