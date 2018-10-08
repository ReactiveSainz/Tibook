import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import { SCREENS } from '../../constants';
import { COLORS } from '../../constants';

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

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.goToAddCreditCard}>Agregar tarjeta</TouchableOpacity>
        <Text>sfsfsfds</Text>
      </View>
    );
  }
}

export default CreditCardsSceen;
