import { State } from './state.js';
import { Graphic } from './graphic.js';

const runApp = (State, Graphic) => {
  const items = document.getElementById('itemsRange').value;
  const sortingSpeed = document.getElementById('speedRange').value;
  const algorithm = document.getElementById('algorithms').value;
  const state = new State(items, algorithm);
  const graphic = new Graphic(null, sortingSpeed);
  state.randomValues();
  graphic.init(state);
  graphic.update(16, state);
};

runApp(State, Graphic);
