import { bfs, dfs } from './algorithms/traversals.js';

export class State {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
    this.start = [15, 33];
    this.visited = {};
    this.sleepTime = null;
    this.queue = [];
  }

  reset() {
    this.matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }

    this.queue.length = 0;

    this.queue = [];
    this.visited = {};
  }

  changeSleepTime(sleepTime) {
    this.sleepTime = sleepTime;
  }

  async traversal(traversal) {
    this.isLoading = true;
    if (traversal === 'bfs') {
      await bfs(
        this.matrix,
        this.visited,
        this.queue,
        this.start,
        this.sleepTime
      );
    }

    if (traversal === 'dfs') {
      await dfs(this.matrix, this.visited, this.start, this.sleepTime);
    }

    this.isLoading = false;
  }
}
