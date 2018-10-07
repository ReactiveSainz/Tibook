import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import stripe from 'tipsi-stripe';
import Spoiler from './Spoiler';
import { Button } from '../../components';

import { gql } from 'apollo-boost';
import { Mutation, graphql } from 'react-apollo';

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
  static title = 'Custom Card';

  state = {
    loading: false,
    token: null,
    error: null,
    params: {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 24,
      cvc: '223',
      name: 'Test User',
      currency: 'usd',
      addressLine1: '123 Test Street',
      addressLine2: 'Apt. 5',
      addressCity: 'Test City',
      addressState: 'Test State',
      addressCountry: 'Test Country',
      addressZip: '55555'
    }
  };

  handleCustomPayPress = async createCreditCard => {
    try {
      this.setState({ loading: true, token: null, error: null });

      const token = await stripe.createTokenWithCard(this.state.params);
      console.log('token', token);
      if (token && token.tokenId) createCreditCard({ variables: { token: token.tokenId } });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  onCompleted = result => {
    console.log('result', result);
  };

  render() {
    const { loading, token, error, params } = this.state;
    console.log('token', token, error, params);
    return (
      <Mutation mutation={CREATE_CARD} onCompleted={this.onCompleted}>
        {(createCreditCard, { data, loading, error }) => {
          return (
            <View style={styles.container}>
              <Text style={styles.header}>Custom Card Params Example</Text>
              <Spoiler title="Mandatory Fields">
                <View style={styles.params}>
                  <Text style={styles.param}>Number: {params.number}</Text>
                  <Text style={styles.param}>Month: {params.expMonth}</Text>
                  <Text style={styles.param}>Year: {params.expYear}</Text>
                </View>
              </Spoiler>
              <Spoiler title="Optional Fields" defaultOpen={false}>
                <View style={styles.params}>
                  <Text style={styles.param}>CVC: {params.cvc}</Text>
                  <Text style={styles.param}>Name: {params.name}</Text>
                  <Text style={styles.param}>Currency: {params.currency}</Text>
                  <Text style={styles.param}>Address Line 1: {params.addressLine1}</Text>
                  <Text style={styles.param}>Address Line 2: {params.addressLine2}</Text>
                  <Text style={styles.param}>Address City: {params.addressCity}</Text>
                  <Text style={styles.param}>Address State: {params.addressState}</Text>
                  <Text style={styles.param}>Address Country: {params.addressCountry}</Text>
                  <Text style={styles.param}>Address Zip: {params.addressZip}</Text>
                </View>
              </Spoiler>
              <Text style={styles.instruction}>Click button to get token based on params.</Text>
              <Button
                title="Pay with custom params"
                loading={loading}
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
  header: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10
  },
  params: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    margin: 5
  },
  param: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  token: {
    height: 20
  }
});
