import { FC, useEffect, useState } from "react";
import BoardComponent from "./components/Board";
import Board from "./models/board";
import { directionT } from "./types";

const App: FC = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.key.includes("Arrow")) return;

      let dir: directionT = null!;
      switch (e.key) {
        case "ArrowLeft":
          dir = "left";
          break;
        case "ArrowRight":
          dir = "right";
          break;
        case "ArrowUp":
          dir = "up";
          break;
        case "ArrowDown":
          dir = "down";
          break;
      }

      board.snake.setDirection(dir);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const intervalHead = setInterval(() => {
      board.snake.setSnake();
      setBoard(board.returnCopy());
    }, 300);

    return () => {
      clearInterval(intervalHead);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {board?.state && <BoardComponent board={board.state} />}
    </div>
  );
};

export default App;
