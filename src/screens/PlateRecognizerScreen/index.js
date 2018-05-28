import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { View, ActionSheet, Toast } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as DeviceCreators } from '../../redux/devices';

import styles from './styles';
import Header from '../../components/Header';
import Camera from '../../components/Camera';

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/,
];

class PlateRecognizerScreen extends Component {
  componentWillMount() {
    this.props.deviceListRequest();
  }

  onPlateRecognized = ({ plate, confidence }) => {
    const confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
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
        options: this.props.devices.map(device => device.name),
        title: 'Select a device',
      },
      (buttonIndex) => {
        if (buttonIndex >= 0) this.props.changeDeviceSelection(buttonIndex);
      },
    );

  render() {
    const { selectedDevice } = this.props;
    const deviceName = selectedDevice ? selectedDevice.name : 'No device';
    const title = this.props.loading ? 'Loading...' : deviceName;

    return (
      <View style={styles.container}>
        <Header
          title={title}
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

PlateRecognizerScreen.defaultProps = {
  selectedDevice: null,
};

PlateRecognizerScreen.propTypes = {
  devices: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedDevice: PropTypes.object,
  deviceListRequest: PropTypes.func.isRequired,
  changeDeviceSelection: PropTypes.func.isRequired,
};

const mapStateToProps = ({ deviceReducer }) => ({ ...deviceReducer });
const mapDispatchToProps = dispatch => bindActionCreators(DeviceCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlateRecognizerScreen);
