export class Graphic {
  constructor(state, sortingSpeed) {
    this.app = document.getElementById('app');
    this.interval = null;
    this.state = state;
    this.sortingSpeed = sortingSpeed;
    this.color = null;
    this.colorPicker = document.getElementById('colorPicker');
    this.speed = document.querySelector('.speed');
    this.items = document.querySelector('.items');
    this.chooseAlgorithm = document.querySelector('#chooseAlgorithm');
    this.sortBtn = document.querySelector('#sort');
    this.loadingEl = document.querySelector('#loading');
    this.randomizeArrays = document.querySelector('#create');
  }

  init(state) {
    const algorithmsEl = document.getElementById('algorithms');
    const itemsRangeEl = document.getElementById('itemsRange');
    const speedRangeEl = document.getElementById('speedRange');
    const colorPickerContainer = document.querySelector('.colorPicker');

    algorithmsEl.addEventListener('change', () => {
      state.setAlgorithm(algorithmsEl.value);
    });

    this.colorPicker.addEventListener('input', () => {
      this.color = this.colorPicker.value;
    });

    itemsRangeEl.addEventListener('input', () =>
      state.setLength(itemsRangeEl.value)
    );

    speedRangeEl.addEventListener('input', () =>
      this.changeSortingSpeed(speedRangeEl.value)
    );

    this.randomizeArrays.addEventListener('click', () => {
      this.state.randomValues(this.state.length);
    });

    this.sortBtn.addEventListener('click', async e => {
      this.items.style.display = 'none';
      this.speed.style.display = 'none';
      this.chooseAlgorithm.style.display = 'none';
      colorPickerContainer.style.display = 'none';
      this.randomizeArrays.style.display = 'none';
      this.sortBtn.style.display = 'none';
      this.loadingEl.style.display = 'flex';

      this.state.changeSleepTime(400 - this.sortingSpeed);

      await state.sortValues();

      this.items.style.display = 'block';
      this.speed.style.display = 'block';
      this.chooseAlgorithm.style.display = 'block';
      colorPickerContainer.style.display = 'flex';
      this.sortBtn.style.display = 'inline-block';
      this.randomizeArrays.style.display = 'inline-block';
      this.loadingEl.style.display = 'none';
    });

    this.app.innerHTML += state.array
      .map(
        (val, index) =>
          `<div class='arrayElement' id='${index}' style='height:${val}px'></div>`
      )
      .join('');
  }
  render(state) {
    this.app.innerHTML = state.array
      .map(
        (val, index) =>
          `<div class='arrayElement' id='${index}' style='height:${val}px; background:${
            state.isSort ? 'green' : this.comparison(state.comparison, val)
          }; '></div>`
      )
      .join('');
  }

  comparison(comparison, val) {
    if (comparison.includes(val)) return 'red';
    return this.color;
  }

  changeSortingSpeed(speed) {
    this.sortingSpeed = speed;
  }

  update(interval, state) {
    this.state = state;
    this.interval = setInterval(() => this.render(state), interval);
  }
}
