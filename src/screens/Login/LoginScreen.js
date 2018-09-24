import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { gql } from 'apollo-boost';
import { Mutation, graphql } from 'react-apollo';

import { statusBarHeight, COLORS } from '../../constants';
import { getError } from '../../utilities';

import { TextInput, Button } from '../../components';

const SIGN_IN = gql`
  mutation($mainField: String!, $password: String!) {
    signIn(mainField: $mainField, password: $password) {
      token
    }
  }
`;

const SAVE_TOKEN = gql`
  mutation($token: String) {
    logIn(token: $token) @client
  }
`;

class LoginScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Inicio se sesion'
        }
      }
    };
  }

  state = {
    mainField: 'sainz1@gmail.com',
    password: '123'
  };

  onChangeMainField = mainField => this.setState({ mainField });
  onChangePassword = password => this.setState({ password });

  login = signIn => {
    signIn({ variables: { ...this.state } });
  };

  onCompleted = data => {
    console.log('data data', data);
    const token = data.signIn.token;
    this.props.mutate({ variables: { token } });
  };

  render() {
    const { mainField, password } = this.state;
    return (
      <Mutation mutation={SIGN_IN} onCompleted={this.onCompleted}>
        {(signIn, { loading, error }) => {
          const errorMsg =
            error && error.graphQLErrors && error.graphQLErrors.length >= 1
              ? error.graphQLErrors[0].message
              : '';
          return (
            <View style={styles.container}>
              <TextInput
                value={mainField}
                label={'email'}
                keyboardType="email-address"
                onChange={this.onChangeMainField}
              />
              <TextInput
                value={password}
                label={'password'}
                style={{ marginTop: 16 }}
                onChange={this.onChangePassword}
              />
              {error &&
                errorMsg && (
                  <Text style={{ color: COLORS.red, textAlign: 'center', marginTop: 8 }}>
                    {errorMsg}
                  </Text>
                )}
              <Button
                loading={loading}
                title="Inicio"
                onPress={() => this.login(signIn)}
                style={{ marginTop: 16 }}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'stretch',
    marginHorizontal: 24
  }
};

export default graphql(SAVE_TOKEN)(LoginScreen);
