import { dragStartHandler, sleep } from './utils/utils.js';

export class Graphic {
  constructor() {
    this.tb = document.getElementById('tb');
    this.isDragging = '';
    this.drag = false;
  }

  changeAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }

  init(state) {
    const speedRangeEl = document.getElementById('speedRange');

    speedRangeEl.addEventListener('input', () => {
      console.log(speedRangeEl.value);
      this.changeAnimationSpeed(speedRangeEl.value);
    });

    document.getElementById('speedBtn').addEventListener('click', () => {
      if (!state.isLoading) {
        document.getElementById('speedBtn').style.display = 'none';
        document.querySelector('.speed').style.display = 'block';
        document.getElementById('speedBtnSec').style.display = 'block';
      }
    });

    document.getElementById('speedBtnSec').addEventListener('click', () => {
      document.getElementById('speedBtnSec').style.display = 'none';
      document.querySelector('.speed').style.display = 'none';
      document.getElementById('speedBtn').style.display = 'block';
    });

    document.getElementById('addWeight').addEventListener('click', () => {
      if (!state.isLoading) {
        this.canAddWall = false;
        document.getElementById('addWall').classList.remove('btn-warning');
        document.getElementById('addWeight').classList.toggle('btn-warning');
        this.canAddWeight = !this.canAddWeight;
      }
    });

    document.getElementById('addWall').addEventListener('click', () => {
      if (!state.isLoading) {
        this.canAddWeight = false;
        document.getElementById('addWeight').classList.remove('btn-warning');
        document.getElementById('addWall').classList.toggle('btn-warning');
        this.canAddWall = !this.canAddWall;
      }
    });

    document.getElementById('dijkstra').addEventListener('click', async () => {
      if (!state.isLoading) {
        state.reset();
        this.canAddWall = false;
        this.canAddWeight = false;
        this.addWall = false;
        this.addWeight = false;
        document.querySelector('.startingPoint').style.cursor = 'default';
        document.querySelector('.target').style.cursor = 'default';
        document.getElementById('addWeight').classList.remove('btn-warning');
        document.getElementById('addWall').classList.remove('btn-warning');
        document.getElementById('dijkstra').classList.add('btn-warning');
        document.querySelector('.speed').style.display = 'none';
        document.getElementById('speedBtn').style.display = 'block';

        await state.pathfinding(true, 80 - this.animationSpeed);

        document.querySelector('.startingPoint').style.cursor = 'pointer';
        document.getElementById('dijkstra').classList.remove('btn-warning');
        document.querySelector('.target').style.cursor = 'pointer';
      }
    });
    this.tb.innerHTML = state.matrix
      .map(
        (row, r) =>
          `<tr>${row
            .map((cell, c) => `<td class="unvisited" id="${r} ${c}"></td>`)
            .join('')}</tr>`
      )
      .join('');

    const cellArray = document.querySelectorAll('.unvisited');

    cellArray.forEach(cell => {
      cell.addEventListener('mouseup', e => {
        if (this.canAddWeight) {
          this.addWeight = false;
        }
        if (this.canAddWall) {
          this.addWall = false;
        }
      });
      cell.addEventListener('mouseover', () => {
        if (this.addWeight) {
          if (
            !cell.classList.contains('startingPoint') &&
            !cell.classList.contains('target')
          ) {
            state.setWeight(cell.id);
            cell.classList.add('weight');
          }
        }
        if (this.addWall) {
          if (
            !cell.classList.contains('startingPoint') &&
            !cell.classList.contains('target')
          ) {
            state.setWall(cell.id);
            cell.classList.add('wall');
          }
        }
      });
      cell.addEventListener('mousedown', e => {
        if (this.canAddWeight) {
          if (!this.addWeight) {
            if (
              !cell.classList.contains('startingPoint') &&
              !cell.classList.contains('target')
            ) {
              this.addWeight = true;
              state.setWeight(cell.id);
              cell.classList.add('weight');
            }
          }
        }

        if (this.canAddWall) {
          if (!this.addWall) {
            if (
              !cell.classList.contains('startingPoint') &&
              !cell.classList.contains('target')
            ) {
              this.addWall = true;
              state.setWall(cell.id);
              cell.classList.add('wall');
            }
          }
        }
      });
      cell.addEventListener('dragover', async () => {
        if (!state.isLoading) {
          this.drag = true;
          if (this.isDragging === 'start') {
            const oldStart = document.getElementById(state.start.join(' '));
            oldStart.draggable = false;
            oldStart.classList.remove('startingPoint');

            this.setStart(cell, state);
          } else if (this.isDragging === 'target') {
            const oldTarget = document.getElementById(state.target.join(' '));
            oldTarget.draggable = false;
            oldTarget.classList.remove('target');
            this.setTarget(cell, state);
          }
        }
      });

      cell.addEventListener('dragend', async () => {
        this.drag = false;
      });
    });
    const startElement = document.getElementById(state.start.join(' '));
    const targetElement = document.getElementById(state.target.join(' '));
    this.setStart(startElement, state);
    this.setTarget(targetElement, state);
  }

  async setStart(startElement, state, init) {
    state.removeWeight(startElement.id);
    startElement.classList.remove('weight');
    state.removeWall(startElement.id);
    startElement.classList.remove('wall');
    startElement.classList.add('startingPoint');
    startElement.draggable = true;
    startElement.addEventListener('dragstart', e => {
      this.isDragging = 'start';
      dragStartHandler(e);
    });
    const startPosition = startElement.id.split(' ').map(coord => +coord);

    if (startPosition.join(' ') !== state.start.join(' ')) {
      console.log(startPosition);
      state.start = [...startPosition];
      // state.setStop(true);

      if (state.isDone && !state.isLoading) {
        state.reset();
        let start = Date.now();
        state.pathfinding(false);
        let end = Date.now();
        console.log(end - start);
      }
    }
  }

  async setTarget(targetElement, state) {
    state.removeWeight(targetElement.id);
    targetElement.classList.remove('weight');
    state.removeWall(targetElement.id);
    targetElement.classList.remove('wall');
    targetElement.classList.add('target');
    targetElement.draggable = true;
    targetElement.addEventListener('dragstart', e => {
      this.isDragging = 'target';
      dragStartHandler(e);
    });
    const targetPosition = targetElement.id.split(' ').map(coord => +coord);

    if (targetPosition.join(' ') !== state.target.join(' ')) {
      console.log(targetPosition);
      state.target = [...targetPosition];

      if (state.isDone && !state.isLoading) {
        state.reset();
        let start = Date.now();
        state.pathfinding(false);
        let end = Date.now();
        console.log(end - start);
      }
    }
  }

  render(state) {
    if (this.canAddWall || this.canAddWeight) {
      let editCSS = document.getElementById('editCSS');
      if (editCSS) {
        editCSS.remove();
      }
      editCSS = document.createElement('style');
      editCSS.id = 'editCSS';
      editCSS.innerHTML = `td{cursor:pointer !important;}`;
      document.body.appendChild(editCSS);
    } else {
      let editCSS = document.getElementById('editCSS');
      if (editCSS) {
        editCSS.remove();
      }
      editCSS = document.createElement('style');
      editCSS.id = 'editCSS';
      editCSS.innerHTML = `td{cursor:default;}`;
      document.body.appendChild(editCSS);
    }

    const cells = document.querySelectorAll('.visited', '.path');

    cells.forEach(cell => {
      if (!(cell.id in state.visited)) {
        cell.classList.remove('visited');
      }
      if (!(cell.id in state.path)) {
        cell.classList.remove('path');
      }
    });

    let el;
    for (let key in state.visited) {
      el = document.getElementById(`${key}`);
      if (!el.classList.contains('visited')) el.classList.add('visited');
    }
    for (let key in state.path) {
      el = document.getElementById(`${key}`);
      if (!el.classList.contains('path')) el.classList.add('path');
    }
  }

  update(interval, state) {
    setInterval(() => this.render(state), interval);
  }
}
