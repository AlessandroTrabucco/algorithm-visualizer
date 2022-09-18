import { sleep } from '../utils/utils.js';

export const bfs = async (m, visited, queue, start, sleepTime) => {
  queue.push(start);
  await sleep(100);
  visited[`${start[0]} ${start[1]}`] = 1;

  let u,
    r,
    c,
    rows = m.length,
    columns = m[0].length;

  while (queue.length !== 0) {
    u = queue.shift();
    let directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    for (let dir of directions) {
      r = u[0] + dir[0];
      c = u[1] + dir[1];
      if (
        r >= 0 &&
        c >= 0 &&
        r < rows &&
        c < columns &&
        !(`${r} ${c}` in visited)
      ) {
        queue.push([r, c]);

        visited[`${r} ${c}`] = 1;
        await sleep(sleepTime);
      }
    }
  }
};

export const dfs = async (m, visited, start, sleepTime) => {
  const [r, c] = start;
  const rows = m.length;
  const columns = m[0].length;

  const traversal = async (r, c) => {
    visited[`${r} ${c}`] = true;
    await sleep(sleepTime);

    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    let i, j;
    for (let dir of directions) {
      i = r + dir[0];
      j = c + dir[1];
      if (
        !(i < 0 || j < 0 || i >= rows || j >= columns || `${i} ${j}` in visited)
      ) {
        await traversal(i, j);
      }
    }
  };

  await traversal(r, c);
};
