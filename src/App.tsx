import * as React from 'react';
import firebase from 'react-native-firebase';

import HomeScreen from '@screens/HomeScreen';

export default class App extends React.Component<{}, {}> {
  async componentDidMount() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('SUCCESS', fcmToken);
    } else {
      console.log('ERROR', fcmToken);
    }

    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('user has permissions');
    } else {
      console.log('user doesnt have permission');
    }

    try {
      await firebase.messaging().requestPermission();
      console.log('User has authorised');
    } catch (error) {
      console.log('User has rejected permissions');
    }
  }

  render() {
    return <HomeScreen title="Hi" />;
  }
}
