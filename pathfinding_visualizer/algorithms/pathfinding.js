import { sleep } from '../utils/utils.js';
import { PriorityQueue } from './priorityqueue.js';

export class Dijkstra {
  constructor() {
    this.queue = new PriorityQueue();

    this.directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    this.alt = null;
    this.i = null;
    this.j = null;
    this.r = null;
    this.c = null;
    this.key = null;
    this.stop = false;
  }

  clean() {
    this.queue = new PriorityQueue();
    this.directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    this.alt = null;
    this.i = null;
    this.j = null;
    this.r = null;
    this.c = null;
    this.key = null;
    this.stop = false;
  }

  setStop(stop) {
    this.stop = stop;
  }

  runAlgorithmSync(m, visited, start, target) {
    console.log(JSON.stringify(visited));
    this.clean();

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        if (`${i} ${j}` === start.join(' ')) {
          visited[`${i} ${j}`] = 1;
          m[i][j].d = 0;
        } else {
          m[i][j].d = Infinity;
        }
        m[i][j].p = null;
        this.queue.enqueue(m[i][j].d, `${i} ${j}`);
      }
    }

    while (!this.queue.empty()) {
      this.key = this.queue.dequeue();

      [this.i, this.j] = this.key.split(' ');

      this.i = +this.i;
      this.j = +this.j;

      for (let dir of this.directions) {
        this.r = this.i + dir[0];
        this.c = this.j + dir[1];

        let weight = 1;

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length
        ) {
          weight = m[this.r][this.c].weight ? m[this.r][this.c].weight : weight;
        }

        this.alt = m[this.i][this.j].d + weight;

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length &&
          !(`${this.r} ${this.c}` in visited)
        ) {
          if (`${this.r} ${this.c}` === `${target[0]} ${target[1]}`) {
            visited[`${this.r} ${this.c}`] = 1;
            if (this.alt < m[this.r][this.c].d) {
              m[this.r][this.c].d = this.alt;
              m[this.r][this.c].p = m[this.i][this.j];
              this.queue.decreasePriority(`${this.r} ${this.c}`, this.alt);
            }

            return;
          }
          visited[`${this.r} ${this.c}`] = 1;
        }

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length &&
          this.alt < m[this.r][this.c].d
        ) {
          m[this.r][this.c].d = this.alt;
          m[this.r][this.c].p = m[this.i][this.j];
          this.queue.decreasePriority(`${this.r} ${this.c}`, this.alt);
        }
      }
    }
  }

  async runAlgorithm(m, visited, start, target, sleepTime) {
    this.clean();

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        if (`${i} ${j}` === start.join(' ')) {
          visited[`${i} ${j}`] = 1;
          m[i][j].d = 0;
        } else {
          m[i][j].d = Infinity;
        }
        m[i][j].p = null;
        this.queue.enqueue(m[i][j].d, `${i} ${j}`);
      }
    }

    while (!this.queue.empty()) {
      this.key = this.queue.dequeue();

      [this.i, this.j] = this.key.split(' ');

      this.i = +this.i;
      this.j = +this.j;

      for (let dir of this.directions) {
        this.r = this.i + dir[0];
        this.c = this.j + dir[1];

        let weight = 1;

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length
        ) {
          weight = m[this.r][this.c].weight ? m[this.r][this.c].weight : weight;
        }

        this.alt = m[this.i][this.j].d + weight;

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length &&
          !(`${this.r} ${this.c}` in visited)
        ) {
          if (`${this.r} ${this.c}` === `${target[0]} ${target[1]}`) {
            visited[`${this.r} ${this.c}`] = 1;
            if (this.alt < m[this.r][this.c].d) {
              m[this.r][this.c].d = this.alt;
              m[this.r][this.c].p = m[this.i][this.j];
              this.queue.decreasePriority(`${this.r} ${this.c}`, this.alt);
            }

            return;
          }
          visited[`${this.r} ${this.c}`] = 1;
          await sleep(sleepTime);
        }

        if (
          this.r >= 0 &&
          this.c >= 0 &&
          this.r < m.length &&
          this.c < m[0].length &&
          this.alt < m[this.r][this.c].d
        ) {
          m[this.r][this.c].d = this.alt;
          m[this.r][this.c].p = m[this.i][this.j];
          this.queue.decreasePriority(`${this.r} ${this.c}`, this.alt);
        }
      }
    }
  }
}

export const findShortestPath = async (target, m, path) => {
  let node = m[target[0]][target[1]];

  const fspRec = async node => {
    if (!node) return;

    await fspRec(node.p);
    path[node.pos] = true;
    await sleep(10);
  };

  await fspRec(node);
};

export const findShortestPathSync = (target, m, path) => {
  let node = m[target[0]][target[1]];

  const fspRec = async node => {
    if (!node) return;

    fspRec(node.p);
    path[node.pos] = true;
  };

  fspRec(node);
};
