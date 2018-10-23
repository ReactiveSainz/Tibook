import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import { SCREENS } from '../../constants';
import { COLORS } from '../../constants';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';

export const GET_CARDS = gql`
  query GETCARDS {
    creditCards {
      last4
      exp_month
      exp_year
      brand
      country
      funding
    }
  }
`;
class CreditCardsSceen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Tarjetas'
        },
        rightButtons: [
          {
            id: 'AddCard',
            text: 'Agregar Tarjeta'
          }
        ]
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'AddCard') this.goToAddCreditCard();
  }

  goToAddCreditCard = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.ADD_CREDIT_CARD_MODAL
      }
    });
  };

  renderCard = ({ item, index }) => {
    return (
      <View key={index} style={{ borderRadius: 8, backgroundColor: 'red', padding: 20 }}>
        <Text>{item.brand}</Text>
        <Text>{item.last4}</Text>
        <Text>{item.country}</Text>
        <Text>{`${item.exp_month}/${item.exp_year}`}</Text>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={{ marginVertical: 8 }} />;
  };

  render() {
    return (
      <View style={{ flex: 1, display: 'flex' }}>
        <TouchableOpacity onPress={this.goToAddCreditCard}>Agregar tarjeta</TouchableOpacity>
        <Query query={GET_CARDS} fetchPolicy="network-only">
          {({ loading, error, data, client }) => {
            if (loading)
              return (
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PacmanIndicator color={COLORS.blue} />
                </View>
              );

            console.log('err', error);
            if (error) return <Text>error</Text>;

            if (data) console.log('data', data);
            return (
              <FlatList
                contentContainerStyle={{ marginHorizontal: 16, marginVertical: 16 }}
                data={data.creditCards}
                renderItem={this.renderCard}
                ItemSeparatorComponent={this.renderSeparator}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

export default CreditCardsSceen;
