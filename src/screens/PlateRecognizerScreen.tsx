import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Title, Left, Right, Button, Icon, Body, ActionSheet, Toast } from 'native-base';

import Camera from '@components/Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionIcon: {
    fontSize: 25
  }
});

interface Props {}
interface State {
  camera: {
    aspect: string;
  };
  plate: string;
  device: string;
}

const CALIFORNIA_FORMATS = [
  /^\d{1}[A-Z]{3}\d{3}$/,
  /^\d{1}[A-Z]{1}\d{5}$/,
  /^\d{5}[A-Z]{1}\d{1}$/,
  /^\d{3}[A-Z]{3}$/
];

const DEVICES = ['Device 1', 'Device 2', 'Device 3'];

export default class PlateRecognizer extends React.Component<Props, State> {
  camera;

  constructor(props: Props) {
    super(props);

    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill
      },
      plate: null,
      device: DEVICES[0]
    };
  }

  plateIsValid = (plate: string, confidence: number): boolean => {
    return confidence > 90 && CALIFORNIA_FORMATS.some(regex => regex.test(plate));
  };

  onPlateRecognized = ({ plate, confidence }) => {
    var confidenceValue = parseFloat(confidence.replace(',', '.'));
    if (this.plateIsValid(plate, confidenceValue)) {
      this.setState({ plate });
      Toast.show({
        text: `Plate: ${plate}`,
        buttonText: 'OK',
        duration: 3000
      });
    }
  };

  showActionSheet = () =>
    ActionSheet.show(
      {
        options: DEVICES,
        title: 'Select a device'
      },
      buttonIndex => {
        this.setState({ device: DEVICES[buttonIndex] });
      }
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
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.camera}
          aspect={this.state.camera.aspect}
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
