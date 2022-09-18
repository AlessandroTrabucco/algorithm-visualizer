import { State } from './state.js';
import { Graphic } from './graphic.js';

const runApp = (State, Graphic) => {
  const state = new State(30, 70);
  const graphic = new Graphic(state);
  graphic.init(state);
  graphic.update(0, state);
};

runApp(State, Graphic);
