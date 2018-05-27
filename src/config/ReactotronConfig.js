import Reactotron from 'reactotron-react-native';

// eslint-disable-next-line no-undef
if (__DEV__) {
  // eslint-disable-next-line no-console
  console.tron = Reactotron.configure({ host: '192.168.100.105' })
    .useReactNative()
    .connect();
} else {
  // eslint-disable-next-line no-console
  console.tron = {
    log: () => {},
    error: () => {},
    display: () => {},
  };
}
