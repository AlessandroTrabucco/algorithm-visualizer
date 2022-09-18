import { sleep } from '../utils/utils.js';

const partition = async (arr, i, j, comparison, sleepTime) => {
  const pivot = arr[j];
  let k = i - 1;
  let tmp;
  while (i <= j) {
    if (arr[i] <= pivot) {
      k++;
      tmp = arr[i];
      comparison[0] = arr[i];
      comparison[1] = arr[k];
      await sleep(sleepTime);
      arr[i] = arr[k];
      arr[k] = tmp;
    }
    i++;
  }
  comparison[0] = null;
  comparison[1] = null;
  return k;
};

export const quickSort = async (nums, i, j, comparison, sleepTime) => {
  if (i < j) {
    const pivot = await partition(nums, i, j, comparison, sleepTime);
    await quickSort(nums, i, pivot - 1, comparison, sleepTime);
    await quickSort(nums, pivot + 1, j, comparison, sleepTime);
  }
};

const merge = async (arr, i, mid, j, comparison, sleepTime) => {
  let leftPart = [];
  for (let k = i; k <= mid; k++) leftPart.push(arr[k]);

  let rightPart = [];
  for (let k = mid + 1; k <= j; k++) rightPart.push(arr[k]);

  let a = 0,
    b = 0;
  let lastK;

  for (let k = i; k <= j && leftPart[a] && rightPart[b]; k++) {
    if (leftPart[a] < rightPart[b]) {
      comparison[0] = leftPart[a];
      comparison[1] = rightPart[b];
      await sleep(sleepTime);
      arr[k] = leftPart[a];
      a++;
    } else if (leftPart[a] > rightPart[b]) {
      comparison[0] = leftPart[a];
      comparison[1] = rightPart[b];
      await sleep(sleepTime);
      arr[k] = rightPart[b];
      b++;
    } else {
      comparison[0] = leftPart[a];
      comparison[1] = rightPart[b];
      await sleep(sleepTime);
      arr[k] = leftPart[a];
      a++;
    }
    lastK = k + 1;
  }

  for (let k = lastK; k <= j && leftPart[a]; k++) {
    comparison[0] = leftPart[a];
    comparison[1] = null;
    await sleep(sleepTime);
    arr[k] = leftPart[a];
    a++;
  }

  for (let k = lastK; k <= j && rightPart[b]; k++) {
    comparison[0] = rightPart[b];
    comparison[1] = null;
    await sleep(sleepTime);
    arr[k] = rightPart[b];
    b++;
  }
  comparison[0] = null;
  comparison[1] = null;
};

export const mergeSort = async (arr, i, j, comparison, sleepTime) => {
  if (i < j) {
    let mid = Math.floor((i + j) / 2);
    await mergeSort(arr, i, mid, comparison, sleepTime);
    await mergeSort(arr, mid + 1, j, comparison, sleepTime);
    await merge(arr, i, mid, j, comparison, sleepTime);
  }
};

export const insertionSort = async (A, fI, sI, comparison, sleepTime) => {
  var n = A.length;

  for (var j = 1; j < n; j++) {
    var k = A[j];
    var i = j - 1;
    comparison[0] = k;
    await sleep(sleepTime);
    while (i >= 0 && k < A[i]) {
      comparison[0] = A[i];
      comparison[1] = A[i + 1];
      await sleep(sleepTime);
      A[i + 1] = A[i];
      i--;
    }

    A[i + 1] = k;
    n - 1;
  }
  comparison[0] = null;
  comparison[1] = null;
};

export const selectionSort = async (A, fI, sI, comparison, sleepTime) => {
  const n = A.length;
  let tmp;

  for (var i = 0; i < n; i++) {
    var min = i;
    for (var j = i + 1; j < n; j++) {
      comparison[0] = A[j];
      await sleep(sleepTime);
      if (A[j] < A[min]) min = j;
    }
    comparison[0] = A[i];
    comparison[1] = A[min];
    await sleep(sleepTime);
    tmp = A[i];
    A[i] = A[min];
    A[min] = tmp;
  }
  comparison[0] = null;
  comparison[1] = null;
};
