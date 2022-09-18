import { dragStartHandler } from './utils/utils.js';

export class Graphic {
  constructor(state, animationSpeed) {
    this.animationSpeed = animationSpeed;
    this.state = state;
    this.tb = document.getElementById('tb');
    this.interval = null;
    this.colorPicker = document.getElementById('colorPicker');
    this.chooseAlgorithm = document.querySelector('#chooseAlgorithm');
    this.speed = document.querySelector('.speed');
    this.isDragging = '';
    this.color = null;
    this.loadingEl = document.querySelector('#loading');
    this.resetBtn = document.getElementById('reset');
    this.startBtn = document.getElementById('start');
    this.canDrag = true;
  }

  changeAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }

  init(state) {
    const speedRangeEl = document.getElementById('speedRange');
    const traversalEl = document.getElementById('algorithms');
    const colorPickerContainer = document.querySelector('.colorPicker');
    const hintEl = document.getElementById('hint');
    const showHintBtn = document.getElementById('showHint');
    hintEl.style.display = 'none';

    showHintBtn.addEventListener('click', () => {
      if (hintEl.style.display === 'none') {
        hintEl.style.display = 'block';
      } else if (hintEl.style.display === 'block') {
        hintEl.style.display = 'none';
      }
    });

    this.traversal = traversalEl.value;

    speedRangeEl.addEventListener('input', () =>
      this.changeAnimationSpeed(speedRangeEl.value)
    );

    this.colorPicker.addEventListener('input', () => {
      this.color = this.colorPicker.value;
      let editCSS = document.getElementById('editCSS');
      if (editCSS) {
        editCSS.remove();
      }
      editCSS = document.createElement('style');
      editCSS.id = 'editCSS';
      editCSS.innerHTML = `.visited {  background-color: ${this.color};  border: 1px solid white;}`;
      document.body.appendChild(editCSS);
    });

    document.getElementById('reset').addEventListener('click', () => {
      this.reset(state);
    });

    document.getElementById('start').addEventListener('click', async () => {
      this.reset(state);
      this.traversal = traversalEl.value;
      this.state.changeSleepTime(200 - this.animationSpeed);
      this.loadingEl.style.display = 'flex';

      this.speed.style.display = 'none';
      this.chooseAlgorithm.style.display = 'none';
      colorPickerContainer.style.display = 'none';
      this.resetBtn.style.display = 'none';
      this.startBtn.style.display = 'none';
      hintEl.style.display = 'none';
      showHintBtn.style.display = 'none';
      document.querySelector('.startingPoint').style =
        'cursor:default !important;';
      this.canDrag = false;

      await state.traversal(this.traversal);

      document.querySelector('.startingPoint').style =
        'cursor:pointer !important;';
      this.canDrag = true;

      document
        .querySelectorAll('.visited')
        .forEach(el => el.classList.add('finished'));

      this.speed.style.display = 'block';

      showHintBtn.style.display = 'inline-block';
      this.chooseAlgorithm.style.display = 'block';
      colorPickerContainer.style.display = 'flex';
      this.startBtn.style.display = 'inline-block';
      this.resetBtn.style.display = 'inline-block';
      this.loadingEl.style.display = 'none';
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
      cell.addEventListener('dragover', () => {
        if (this.canDrag && this.isDragging === 'start') {
          const oldStart = document.getElementById(state.start.join(' '));
          oldStart.draggable = false;
          oldStart.classList.remove('startingPoint');
          this.setStart(cell, state);
        }
      });
    });
    const startElement = document.getElementById(state.start.join(' '));

    this.setStart(startElement, state);
  }

  setStart(startElement, state) {
    startElement.classList.add('startingPoint');
    startElement.draggable = true;
    startElement.addEventListener('dragstart', e => {
      this.isDragging = 'start';
      dragStartHandler(e);
    });
    const startPosition = startElement.id.split(' ').map(coord => +coord);
    state.start = [...startPosition];
  }

  reset(state) {
    state.reset();
    const cells = document.querySelectorAll('.unvisited');
    cells.forEach(cell => {
      cell.classList.remove('visited', 'finished');
    });
  }

  render(state) {
    if (this.traversal === 'dfs') {
      for (let key in state.visited) {
        document.getElementById(`${key}`).classList.add('visited');
      }
    }

    if (this.traversal === 'bfs') {
      for (let el of state.queue) {
        document.getElementById(`${el[0]} ${el[1]}`).classList.add('visited');
      }
    }
  }

  update(interval, state) {
    this.interval = setInterval(() => this.render(state), interval);
  }
}
