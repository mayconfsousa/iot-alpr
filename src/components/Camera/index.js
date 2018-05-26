import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NativeModules, requireNativeComponent, View } from 'react-native';

const CameraManager = NativeModules.ALPRCameraManager;

export default class Camera extends Component {
  static constants = {
    Aspect: CameraManager.Aspect,
    CaptureQuality: CameraManager.CaptureQuality,
    TorchMode: CameraManager.TorchMode,
  };

  static propTypes = {
    ...View.propTypes,
    aspect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    captureQuality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    country: PropTypes.string,
    plateOutlineColor: PropTypes.string,
    showPlateOutline: PropTypes.bool,
    torchMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    touchToFocus: PropTypes.bool,
  };

  static defaultProps = {
    aspect: CameraManager.Aspect.fill,
    captureQuality: CameraManager.CaptureQuality.medium,
    country: 'us',
    plateOutlineColor: '#0028ff',
    showPlateOutline: true,
    torchMode: CameraManager.TorchMode.off,
    touchToFocus: true,
  };

  onPlateRecognized = (event) => {
    if (this.props.onPlateRecognized) {
      this.props.onPlateRecognized(event.nativeEvent);
    }
  };

  setNativeProps = (props) => {
    this.camera.setNativeProps(props);
  };

  setCamera = (camera) => {
    this.camera = camera;
  };

  convertNativeProps = (props) => {
    const newProps = { ...props };
    if (typeof props.aspect === 'string') {
      newProps.aspect = Camera.constants.Aspect[props.aspect];
    }

    if (typeof props.torchMode === 'string') {
      newProps.torchMode = Camera.constants.TorchMode[props.torchMode];
    }

    if (typeof props.captureQuality === 'string') {
      newProps.captureQuality = Camera.constants.CaptureQuality[props.captureQuality];
    }

    // delete this prop because we are going to replace it with our own
    delete newProps.onPlateRecognized;
    return newProps;
  };

  render() {
    const nativeProps = this.convertNativeProps(this.props);

    return (
      <ALPRCamera
        ref={this.setCamera}
        onPlateRecognized={this.onPlateRecognized}
        {...nativeProps}
      />
    );
  }
}

const ALPRCamera = requireNativeComponent('ALPRCamera', Camera, {
  nativeOnly: {
    rotateMode: true,
    mounted: true,
  },
});
