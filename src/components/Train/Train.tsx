import { ITrainProps } from "../../interfaces/ITrainProps";
import "./Train.css";

const getRotationAngle = (direction: string) => {
  switch (direction) {
    case "left":
      return "90";
    case "right":
      return "270";
    case "up":
      return "180";
    case "down":
      return "0";
  }
};

export default function Train(data: ITrainProps) {
  return (
    <div
      className={data.isHead ? "train-head" : "train"}
      style={{ transform: `rotate(${getRotationAngle(data.dir)}deg)` }}
    ></div>
  );
}
