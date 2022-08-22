import { directionT, cellT } from "../types";
import { random } from "../../utils/random";

class Board {
  state: (cellT | null)[][] = [];
  direction = [1, 0];
  snake = [] as [number, number][];

  constructor(state?: (cellT | null)[][]) {
    if (state) {
      this.state = state;
    } else this.init();
  }

  init() {
    for (let i = 0; i < 11; i++) {
      this.state.push([]);

      for (let j = 0; j < 11; j++) {
        this.state[i].push(null);
      }
    }

    this.snake = [...this.snake, [5, 5]];
    this.state[this.snake[0][1]][this.snake[0][1]] = "head";
    this.setFood();
  }

  setSnake() {
    const [x, y] = this.snake[0];
    const [xd, yd] = this.direction;

    const newX = x + xd;
    const newY = y + yd;

    if (newX === -1 || newY === -1 || newX === 11 || newY === 11) return;

    if (this.state[newY][newX] === "eat") {
      this.snake = [...this.snake, [x, y]];
      this.setFood();
    }

    this.state[this.snake[this.snake.length - 1][1]][
      this.snake[this.snake.length - 1][0]
    ] = null;

    for (let i = this.snake.length - 1; i >= 0; i--) {
      if (i !== 0) {
        const [newX, newY] = this.snake[i - 1];
        this.snake[i] = [newX, newY];
        this.state[newY][newX] = "body";
      } else {
        this.state[newY][newX] = "head";
        this.snake[0] = [newX, newY];
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
    newBoard.direction = this.direction;

    return newBoard;
  }
}

export default Board;
