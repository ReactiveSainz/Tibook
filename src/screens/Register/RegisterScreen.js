import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class RegisterScreen extends Component {
  render() {
    return (
      <View>
        <Text>dssdfds</Text>
        {/* <Mutation mutation={SIGN_IN} onCompleted={data => console.log('data', data)}>
          {(signIn, { data }) => {
            {
             this.login(signIn);
            }
            return null;
          }}
        </Mutation> */}
      </View>
    );
  }
}

export default RegisterScreen;
