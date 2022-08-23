import { directionT, cellT } from "../types";
import { random } from "../../utils/random";
import Snake from "./snake";

class Board {
  state: (cellT | null)[][] = [];
  snake = new Snake(this);

  constructor(state?: (cellT | null)[][]) {
    if (state) {
      this.state = state;
    } else {
      this.init();
    }
  }

  init() {
    for (let i = 0; i < 11; i++) {
      this.state.push([]);

      for (let j = 0; j < 11; j++) {
        this.state[i].push(null);
      }
    }

    this.snake.state = [[5, 5]];
    this.state[this.snake.state[0][1]][this.snake.state[0][1]] = "head";
    this.setFood();
  }

  setFood() {
    const x = random(1, 9);
    const y = random(1, 9);

    if (!this.state[y][x]) {
      this.state[y][x] = "eat";
      return;
    }

    this.setFood();
  }

  returnCopy() {
    const newBoard = new Board(this.state);
    newBoard.snake = this.snake;

    return newBoard;
  }
}

export default Board;
