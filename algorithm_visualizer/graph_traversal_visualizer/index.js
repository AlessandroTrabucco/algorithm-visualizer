import { State } from './state.js';
import { Graphic } from './graphic.js';

const runApp = (State, Graphic) => {
  const animationSpeed = document.getElementById('speedRange').value;
  const state = new State(30, 70);
  const graphic = new Graphic(state, animationSpeed);
  graphic.init(state);
  graphic.update(1, state);
};

runApp(State, Graphic);
