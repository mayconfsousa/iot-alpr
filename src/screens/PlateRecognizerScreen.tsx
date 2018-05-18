import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Camera from '@components/Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    left: 50
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

interface Props {}
interface State {
  camera: {
    aspect: string;
  };
  plate: string;
}

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/
];

export default class PlateRecognizer extends React.Component<Props, State> {
  camera;

  constructor(props) {
    super(props);

    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill
      },
      plate: 'Scan a plate'
    };
  }

  plateIsValid = (plate: string, confidence: number): boolean => {
    return confidence > 90 && CALIFORNIA_FORMATS.some(regex => regex.test(plate));
  };

  onPlateRecognized = ({ plate, confidence }) => {
    var confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
      console.log(plate, confidenceValue);
      this.setState({ plate });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureQuality={Camera.constants.CaptureQuality.high}
          country="us"
          onPlateRecognized={this.onPlateRecognized}
          plateOutlineColor="#ff0000"
          showPlateOutline
          torchMode={Camera.constants.TorchMode.off}
          touchToFocus
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.plate}</Text>
        </View>
      </View>
    );
  }
}
