import React, { Component } from 'react';

import {
  View,
  Header,
  Title,
  Left,
  Right,
  Button,
  Icon,
  Body,
  ActionSheet,
  Toast,
} from 'native-base';

import styles from './styles';

import Camera from '../../components/Camera';

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/,
];

const DEVICES = ['Device 1', 'Device 2', 'Device 3'];

export default class PlateRecognizer extends Component {
  state = {
    // plate: null,
    device: DEVICES[0],
  };

  onPlateRecognized = ({ plate, confidence }) => {
    const confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
      // this.setState({ plate });
      console.tron.log(plate);
      Toast.show({
        text: `Plate: ${plate}`,
        buttonText: 'OK',
        duration: 3000,
      });
    }
  };

  plateIsValid = (plate, confidence) =>
    confidence > 85 && CALIFORNIA_FORMATS.some(regex => regex.test(plate));

  showActionSheet = () =>
    ActionSheet.show(
      {
        options: DEVICES,
        title: 'Select a device',
      },
      (buttonIndex) => {
        if (buttonIndex > 0) this.setState({ device: DEVICES[buttonIndex] });
      },
    );

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>{this.state.device}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.showActionSheet}>
              <Icon type="FontAwesome" name="mobile-phone" style={styles.actionIcon} />
            </Button>
          </Right>
        </Header>
        <Camera
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.high}
          country="us"
          onPlateRecognized={this.onPlateRecognized}
          plateOutlineColor="#ff0000"
          showPlateOutline
          torchMode={Camera.constants.TorchMode.off}
          touchToFocus
        />
      </View>
    );
  }
}
