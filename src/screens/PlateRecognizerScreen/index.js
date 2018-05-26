import React, { Component } from 'react';

import { View, ActionSheet, Toast } from 'native-base';

import styles from './styles';
import api from '../../api';
import Header from '../../components/Header';
import Camera from '../../components/Camera';

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/,
];

export default class PlateRecognizer extends Component {
  state = {
    // plate: null,
    devices: [],
    selectedDevice: null,
  };

  async componentWillMount() {
    const response = await api.get('/devices');
    if (response.ok) {
      const devices = response.data.map(device => device.name);
      this.setState({
        devices,
        selectedDevice: devices[0],
      });
    }
  }

  onPlateRecognized = ({ plate, confidence }) => {
    const confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
      // this.setState({ plate });
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
        options: this.state.devices,
        title: 'Select a device',
      },
      (buttonIndex) => {
        if (buttonIndex >= 0) this.setState({ selectedDevice: this.state.devices[buttonIndex] });
      },
    );

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.selectedDevice || 'Loading...'}
          leftIcon="react"
          rightIcon="camera-party-mode"
          onPressRight={this.showActionSheet}
        />
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
