import { FC } from "react";
import { boardT } from "../types";
import Cell from "./Cell";

const Board: FC<{ board: boardT }> = ({ board }) => {
  return (
    <div className="grid grid-cols-11 w-96 h-96 gap-1">
      {board.map((row, y) => {
        return row.map((cell, x) => {
          return <Cell key={`${x}-${y}`} type={cell} />;
        });
      })}
    </div>
  );
};

export default Board;
