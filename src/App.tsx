import * as React from 'react';
import { Root } from 'native-base';

import PlateRecognizerScreen from '@screens/PlateRecognizerScreen';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Root>
        <PlateRecognizerScreen />
      </Root>
    );
  }
}
