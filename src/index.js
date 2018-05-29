import React from 'react';

import { Root } from 'native-base';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import store from './store';

import PlateRecognizerScreen from './screens/PlateRecognizerScreen';

export default () => (
  <Root>
    <Provider store={store}>
      <PlateRecognizerScreen />
    </Provider>
  </Root>
);
