import {
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
} from './algorithms/algorithms.js';
import { randomBetween } from './utils/utils.js';

export class State {
  constructor(length, algorithm) {
    this.array = [];
    this.comparison = [];
    this.length = length;
    this.algorithms = {
      'Merge sort': mergeSort,
      Quicksort: quickSort,
      'Insertion sort': insertionSort,
      'Selection sort': selectionSort,
    };
    this.algorithm = algorithm;
    this.sleepTime = null;
    this.isSort = false;
  }

  changeSleepTime(sleepTime) {
    this.isSort = false;
    this.sleepTime = sleepTime;
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }

  setLength(length) {
    this.isSort = false;
    this.length = length;
    this.randomValues(length);
  }

  randomValues(length) {
    this.isSort = false;
    if (length) {
      this.array = [];
      for (let i = 0; i < this.length; i++)
        this.array.push(randomBetween(10, 700));
    } else {
      for (let i = 0; i < this.length; i++)
        this.array.push(randomBetween(10, 700));
    }
  }

  async sortValues() {
    await this.algorithms[this.algorithm](
      this.array,
      0,
      this.array.length - 1,
      this.comparison,
      this.sleepTime
    );
    this.isSort = true;
  }
}
