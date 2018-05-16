import * as React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

interface Props {
  title: string;
}
interface State {
  message: string;
}

export default class HomeScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
      </View>
    );
  }
}
