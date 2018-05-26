import React from 'react';

import { Root } from 'native-base';

import './config/ReactotronConfig';

import PlateRecognizerScreen from './screens/PlateRecognizerScreen';

export default () => (
  <Root>
    <PlateRecognizerScreen />
  </Root>
);
