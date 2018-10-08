import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import stripe from 'tipsi-stripe';
import { PaymentCardTextField } from 'tipsi-stripe';
import Spoiler from './Spoiler';
import { Button } from '../../components';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { COLORS } from '../../constants';

stripe.setOptions({
  publishableKey: 'pk_test_1tpMb5DqgwwaC4B0jP9vPgDm'
});

const CREATE_CARD = gql`
  mutation($token: String!) {
    createCreditCard(cardToken: $token) {
      stripeCardId
    }
  }
`;

export default class CustomCardScreen extends PureComponent {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Agregar tarjeta'
        }
      }
    };
  }

  state = {
    loadingToken: false,
    token: null,
    errorToken: null,
    valid: false,
    params: {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 24,
      cvc: '223'
    }
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState(prevState => ({ ...prevState, valid, params }));
  };

  handleCustomPayPress = async createCreditCard => {
    try {
      this.setState({ token: null, errorToken: null, loadingToken: true });
      const token = await stripe.createTokenWithCard(this.state.params);
      console.log('token', token);
      this.setState({ loadingToken: false });
      if (token && token.tokenId) createCreditCard({ variables: { token: token.tokenId } });
    } catch (error) {
      this.setState({ errorToken: error, loadingToken: false });
    }
  };

  onCompleted = result => {
    console.log('result', result);
  };

  render() {
    const { valid, errorToken, loadingToken } = this.state;
    return (
      <Mutation mutation={CREATE_CARD} onCompleted={this.onCompleted}>
        {(createCreditCard, { data, loading, error }) => {
          return (
            <View style={styles.container}>
              <PaymentCardTextField
                style={styles.field}
                cursorColor={COLORS.blue}
                textErrorColor={COLORS.red}
                placeholderColor={COLORS.disabled}
                numberPlaceholder="XXXX XXXX XXXX XXXX"
                expirationPlaceholder="mm/yy"
                cvcPlaceholder="xxx"
                disabled={false}
                onParamsChange={this.handleFieldParamsChange}
              />
              <Button
                disabled={!valid}
                title="Añadir tarjeta"
                loading={loading || loadingToken}
                onPress={() => this.handleCustomPayPress(createCreditCard)}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    width: 300,
    color: COLORS.blue,
    borderBottomColor: COLORS.blue,
    borderBottomWidth: 2
  }
});
