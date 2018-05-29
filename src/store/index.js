import { init } from '@rematch/core';
import * as models from './models';

const store = init({
  redux: {
    createStore: console.tron.createStore,
  },
  models,
});

export default store;
