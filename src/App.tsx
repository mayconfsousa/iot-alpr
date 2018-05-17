import * as React from 'react';
import firebase from 'react-native-firebase';

import HomeScreen from '@screens/HomeScreen';

export default class App extends React.Component<{}, {}> {
  messageListener;

  async componentDidMount() {
    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required
      console.log('message.data', message.data);
    });

    const token = await firebase.messaging().getToken();
    if (token) console.log('Token', token);
    else console.log('Error - Token');

    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log('User has rejected permissions');
    }
  }

  componentWillUnmount() {
    this.messageListener();
  }

  render() {
    return <HomeScreen title="Hi" />;
  }
}
