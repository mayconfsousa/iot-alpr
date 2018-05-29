import { init } from '@rematch/core';
import * as models from './models';

const config = { models };

if (__DEV__) {
  config.redux = { createStore: console.tron.createStore };
}

const store = init(config);

export default store;
