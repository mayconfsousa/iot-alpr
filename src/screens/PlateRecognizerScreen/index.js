import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { View, ActionSheet, Toast } from 'native-base';
import moment from 'moment';

import { connect } from 'react-redux';

import { Header, Camera } from '@components';
import styles from './styles';

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/,
];

class PlateRecognizerScreen extends Component {
  componentWillMount() {
    this.props.getAllDevices();
  }

  componentDidUpdate() {
    const { deviceState, activityState } = this.props;

    if (deviceState.error || activityState.error) {
      Toast.show({
        text: `ERROR: ${deviceState.error || activityState.error}`,
        buttonText: 'OK',
        duration: 3000,
      });
    }
  }

  onPlateRecognized = ({ plate, confidence }) => {
    const confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
      const { selectedDevice } = this.props.deviceState;

      const activity = {
        uuid_dispositivo: selectedDevice.uuid_dispositivo,
        placa: plate,
        timestamp: moment().toJSON(),
      };

      if (this.enableSendActivity(activity)) {
        this.props.saveActivity(activity);

        Toast.show({
          text: `Plate: ${plate}`,
          buttonText: 'OK',
          duration: 3000,
        });
      }
    }
  };

  getTitle = () => {
    const { selectedDevice, loading } = this.props.deviceState;
    const deviceName = selectedDevice ? selectedDevice.name : 'No device';
    return loading ? 'Loading...' : deviceName;
  };

  plateIsValid = (plate, confidence) =>
    confidence > 85 && CALIFORNIA_FORMATS.some(regex => regex.test(plate));

  showActionSheet = () => {
    const {
      deviceState: { devices },
      changeDeviceSelection,
    } = this.props;

    ActionSheet.show(
      {
        options: devices.map(device => device.name),
        title: 'Select a device',
      },
      (buttonIndex) => {
        if (buttonIndex >= 0) changeDeviceSelection(buttonIndex);
      },
    );
  };

  enableSendActivity = (activity) => {
    const { activities } = this.props.activityState;

    return !activities.some(a =>
      a.uuid_dispositivo === activity.uuid_dispositivo &&
        a.placa === activity.placa &&
        moment.duration(moment(activity.timestamp).diff(moment(a.timestamp))).asSeconds() <= 10);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.getTitle()}
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

PlateRecognizerScreen.propTypes = {
  deviceState: PropTypes.object.isRequired,
  activityState: PropTypes.object.isRequired,
  getAllDevices: PropTypes.func.isRequired,
  changeDeviceSelection: PropTypes.func.isRequired,
  saveActivity: PropTypes.func.isRequired,
};

const mapState = state => ({ deviceState: state.devices, activityState: state.activities });

const mapDispatch = ({ devices, activities }) => ({
  getAllDevices: devices.getAll,
  changeDeviceSelection: devices.changeSelection,
  saveActivity: activities.saveActivity,
});

export default connect(mapState, mapDispatch)(PlateRecognizerScreen);
