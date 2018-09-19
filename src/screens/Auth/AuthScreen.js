import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SCREENS, COLORS } from '../../constants/';
import { Button } from '../../components';
class AuthScreen extends Component {
  goToLogin = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.LOGIN
      }
    });
  };
  goToRegister = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.REGISTER
      }
    });
  };
  render() {
    return (
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ color: COLORS.blue, fontSize: 24 }}>Bienvenido</Text>
        <Button title="Login" onPress={this.goToLogin} style={{ width: 200, marginTop: 36 }} />
        <Button
          title="Registro"
          onPress={this.goToRegister}
          style={{ width: 200, marginTop: 16 }}
        />
      </View>
    );
  }
}

export default AuthScreen;
