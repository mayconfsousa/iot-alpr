import { AppRegistry } from 'react-native';
import App from './App';

// import type { RemoteMessage } from 'react-native-firebase';

const bgMessaging = async message => {
  console.log('message.data', message.data);
  return Promise.resolve();
};

AppRegistry.registerComponent('IotAlpr', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
