import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

// eslint-disable-next-line
if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.1.192' })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  tron.clear();

  // eslint-disable-next-line
  console.tron = tron;
}
