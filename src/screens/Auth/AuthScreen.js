import React, { Component } from 'react';

import { View, Text, Button } from 'react-native';

class AuthScreen extends Component {
  goToLogin = () => {
    console.log('goToLogin');
  };
  goToRegister = () => {
    console.log('goToRegister');
  };
  render() {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24
        }}
      >
        <Text>Bienvenido</Text>
        <View
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button title="Login" onPress={this.goToLogin} />
          <Button title="Registro" onPress={this.goToRegister} />
        </View>
      </View>
    );
  }
}

export default AuthScreen;
