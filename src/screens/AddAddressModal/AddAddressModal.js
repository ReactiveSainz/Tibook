import React from 'react';

import { View } from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import { Button, TextInput } from '../../components';

// import { Address, validate } from 'address-validator';

const ADD_ADDRESS = gql`
  mutation(
    $state: String!
    $city: String!
    $neighborhood: String!
    $cp: String!
    $street: String!
    $number: String!
    $intNumber: String
  ) {
    addAdress(
      state: $state
      city: $city
      neighborhood: $neighborhood
      cp: $cp
      street: $street
      number: $number
      intNumber: $intNumber
    ) {
      street
    }
  }
`;

class AddCreditCardModal extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Agregar dirección'
        }
      }
    };
  }

  state = {
    state: '',
    city: '',
    neighborhood: '',
    cp: '',
    street: '',
    number: '',
    intNumber: ''
  };

  addAdress = addAdress => {
    console.log('add Address', this.state);
    addAddres({ variables: { ...this.state } });
  };
  onCompleted = result => {
    console.log('onClompleted', result);
  };

  onChangeState = state => this.setState({ state });
  onChangeCity = city => this.setState({ city });
  onChangeNeighborhood = neighborhood => this.setState({ neighborhood });
  onChangeCp = cp => this.setState({ cp });
  onChangeStreet = street => this.setState({ street });
  onchangeNumber = number => this.setState({ number });
  onchangeIntNumber = intNumber => this.setState({ intNumber });

  render() {
    const { state, street, city, neighborhood, cp, number, intNumber } = this.state;
    return (
      <Mutation mutation={ADD_ADDRESS} onCompleted={this.onCompleted}>
        {(addAdress, { data, loading, error }) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingHorizontal: 32,
                paddingVertical: 32
              }}
            >
              <TextInput value={state} label={'Estado'} onChange={this.onChangeState} />
              <TextInput value={city} label={'Ciudad'} onChange={this.onChangeCity} />
              <TextInput
                value={neighborhood}
                label={'Colonia'}
                onChange={this.onChangeNeighborhood}
              />
              <TextInput value={cp} label={'C.P.'} onChange={this.onChangeCp} />
              <TextInput value={street} label={'Calle'} onChange={this.onChangeStreet} />
              <TextInput value={number} label={'numero'} onChange={this.onchangeNumber} />
              <TextInput
                value={intNumber}
                label={'numero int.'}
                onChange={this.onchangeIntNumber}
              />
              <Button
                title="Añadir"
                onPress={() => this.addAdress(addAdress)}
                style={{ marginTop: 32 }}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default AddCreditCardModal;
