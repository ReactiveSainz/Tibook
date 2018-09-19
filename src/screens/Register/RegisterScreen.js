import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation, graphql } from 'react-apollo';
import { COLORS } from '../../constants';
import { TextInput, Button } from '../../components';

const SIGN_IN = gql`
  mutation(
    $name: String!
    $lastname: String!
    $email: String!
    $password: String!
    $gender: String!
    $nickname: String!
  ) {
    signUp(
      name: $name
      lastname: $lastname
      email: $email
      password: $password
      gender: $gender
      nickname: $nickname
    ) {
      token
    }
  }
`;

const SAVE_TOKEN = gql`
  mutation($token: String) {
    logIn(token: $token) @client
  }
`;

class RegisterScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Registar cuenta'
        }
      }
    };
  }

  state = {
    name: 'sainz',
    lastname: 'sainz',
    email: 'sainz2@gmail.com',
    password: '123',
    gender: 'male',
    nickname: 'sainz2'
  };

  signUp = signUp => {
    signUp({ variables: { ...this.state } });
  };

  onCompleted = data => {
    console.log('data data', data);
    const token = data.signUp.token;
    this.props.mutate({ variables: { token } });
  };

  onChangeEmail = email => this.setState({ email });
  onChangeName = name => this.setState({ name });
  onChangeLastname = lastname => this.setState({ lastname });
  onChangeNickname = nickname => this.setState({ nickname });
  onChangePassword = password => this.setState({ password });
  onChangeGender = gender => this.setState({ gender });

  render() {
    const { name, lastname, email, gender, nickname, password } = this.state;
    const disabled = !name || !lastname || !email || !gender || !nickname || !password;
    return (
      <Mutation mutation={SIGN_IN} onCompleted={this.onCompleted}>
        {(signUp, { data, loading, error }) => {
          let errorMsg = null;
          if (error) {
            errorMsg =
              error.graphQLErrors && error.graphQLErrors.length >= 1 ? error.graphQLErrors[0] : '';
          }
          return (
            <View style={styles.container}>
              <TextInput
                value={email}
                containerStyle={{}}
                keyboardType="email-address"
                onChange={this.onChangeEmail}
              />
              <TextInput
                value={name}
                containerStyle={{ marginTop: 16 }}
                onChange={this.onChangeName}
              />
              <TextInput
                value={lastname}
                containerStyle={{ marginTop: 16 }}
                onChange={this.onChangeLastname}
              />
              <TextInput
                value={password}
                containerStyle={{ marginTop: 16 }}
                onChange={this.onChangePassword}
              />
              <TextInput
                value={nickname}
                containerStyle={{ marginTop: 16 }}
                onChange={this.onChangeNickname}
              />
              <TextInput
                value={gender}
                containerStyle={{ marginTop: 16 }}
                onChange={this.onChangeGender}
              />
              {error &&
                errorMsg &&
                errorMsg.extensions &&
                errorMsg.extensions.exception &&
                errorMsg.extensions.exception.errors &&
                errorMsg.extensions.exception.errors.email && (
                  <Text style={{ color: COLORS.red, textAlign: 'center', marginTop: 8 }}>
                    el email ya se encuentra registrado
                  </Text>
                )}
              {error &&
                errorMsg &&
                errorMsg.extensions &&
                errorMsg.extensions.exception &&
                errorMsg.extensions.exception.errors &&
                errorMsg.extensions.exception.errors.email && (
                  <Text style={{ color: COLORS.red, textAlign: 'center', marginTop: 8 }}>
                    el nickname ya se encuentra registrado
                  </Text>
                )}
              <Button
                disabled={disabled}
                loading={loading}
                title="Registrar cuenta"
                onPress={() => this.signUp(signUp)}
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
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 16
  }
};

export default graphql(SAVE_TOKEN)(RegisterScreen);
