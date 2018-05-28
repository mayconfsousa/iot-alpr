import React from 'react';

import { Root } from 'native-base';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react';

import './config/ReactotronConfig';

import { store } from './redux/store';

import PlateRecognizerScreen from './screens/PlateRecognizerScreen';

export default () => (
  <Root>
    <Provider store={store}>
      <PlateRecognizerScreen />
    </Provider>
  </Root>
);
