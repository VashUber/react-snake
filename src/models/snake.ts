import Board from "./board";
import { directionT } from "../types";

class Snake {
  state = [] as [number, number][];
  board: Board;
  direction = [1, 0];

  constructor(board: Board) {
    this.board = board;
  }

  setSnake() {
    const [x, y] = this.state[0];
    const [xd, yd] = this.direction;

    const newX = x + xd;
    const newY = y + yd;

    if (newX === -1 || newY === -1 || newX === 11 || newY === 11) return;

    if (this.board.state[newY][newX] === "eat") {
      this.state.push([x, y]);
      this.board.setFood();
    }

    this.board.state[this.state[this.state.length - 1][1]][
      this.state[this.state.length - 1][0]
    ] = null;

    for (let i = this.state.length - 1; i >= 0; i--) {
      if (i !== 0) {
        const [newX, newY] = this.state[i - 1];
        this.state[i] = [newX, newY];
        this.board.state[newY][newX] = "body";
      } else {
        this.board.state[newY][newX] = "head";
        this.state[0] = [newX, newY];
      }
    }
  }

  setDirection(direction: directionT) {
    switch (direction) {
      case "left":
        this.direction = [-1, 0];
        break;

      case "right":
        this.direction = [1, 0];
        break;

      case "up":
        this.direction = [0, -1];
        break;

      case "down":
        this.direction = [0, 1];
        break;
    }
  }
}

export default Snake;
