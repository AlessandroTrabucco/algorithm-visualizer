import {
  Dijkstra,
  findShortestPath,
  findShortestPathSync,
} from './algorithms/pathfinding.js';

export class State {
  constructor(rows, columns) {
    this.matrix = [];
    for (let i = 0; i < rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < columns; j++) {
        this.matrix[i][j] = {
          value: Math.floor(Math.random() * 10),
          pos: `${i} ${j}`,
        };
      }
    }
    this.start = [11, 5];
    this.target = [11, 35];
    this.visited = {};
    this.queue = [];
    this.path = {};
    this.isLoading = false;
    this.isDone = false;
    this.dijkstra = new Dijkstra();
  }

  reset() {
    this.visited = {};
    this.path = {};
  }

  setWeight(id) {
    const [i, j] = id.split(' ');
    this.matrix[i][j].weight = 15;
  }

  removeWeight(id) {
    const [i, j] = id.split(' ');
    this.matrix[i][j].weight = null;
  }

  removeWall(id) {
    const [i, j] = id.split(' ');
    this.matrix[i][j].wall = null;
  }

  setWall(id) {
    const [i, j] = id.split(' ');
    this.matrix[i][j].weight = Infinity;
  }

  setStop(stop) {
    this.dijkstra.setStop(stop);
  }

  async pathfinding(init, animationSpeed) {
    this.isLoading = true;
    if (!init) {
      this.dijkstra.runAlgorithmSync(
        this.matrix,
        this.visited,
        this.start,
        this.target
      );
      findShortestPathSync(this.target, this.matrix, this.path);
    } else {
      await this.dijkstra.runAlgorithm(
        this.matrix,
        this.visited,
        this.start,
        this.target,
        animationSpeed
      );
      await findShortestPath(this.target, this.matrix, this.path);
    }

    this.isLoading = false;
    this.isDone = true;
  }
}
