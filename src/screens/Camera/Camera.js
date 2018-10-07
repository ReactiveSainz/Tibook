import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import { RNCamera } from 'react-native-camera';
class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onBarCodeRead = barCode => {
    console.log('barCode', barCode);
  };
  render() {
    return (
      <View>
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]}
          onBarCodeRead={this.onBarCodeRead}
        />
      </View>
    );
  }
}

export default CameraScreen;
