import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import sagas from './sagas';

import deviceReducer from './devices';

const reducers = combineReducers({ deviceReducer });

// const rootReducer = persistCombineReducers(
//   {
//     key: 'root',
//     storage,
//   },
//   reducers,
// );

// eslint-disable-next-line
const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleware = [sagaMiddleware];

// eslint-disable-next-line
const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
// eslint-disable-next-line
export const store = createAppropriateStore(reducers, compose(applyMiddleware(...middleware)));
// export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
