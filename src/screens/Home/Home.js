import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import { NAV } from '../../utilities';
import { SCREENS } from '../../constants';
import { Card } from '../../components';

const GET_ME = gql`
  query getME {
    me {
      name
      nickname
      email
      role
      gender
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  logOut = async client => {
    await client.cache.reset();
    AsyncStorage.clear();
    NAV.default.goAuth();
  };

  goToSettings = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.SETTINGS
      }
    });
  };

  goToCreditCards = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.CARDS_SCREEN
      }
    });
  };

  goToAddAdress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.ADD_ADDRESS_MODAL
      }
    });
  };

  goToCamera = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.CAMERA
      }
    });
  };

  render() {
    return (
      <Query
        query={GET_ME}
        onError={error => console.log('errorHome', error)}
        onCompleted={complete => console.log('complete', complete)}
      >
        {({ loading, error, data, client }) => {
          console.log('client', client);

          if (error) return null;

          if (loading || !data) return null;

          const { me } = data,
            { name, email, nickname, role } = me;

          return (
            <View style={{ flex: 1, display: 'flex' }}>
              <View
                style={{
                  backgroundColor: COLORS.blue,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  paddingTop: 24
                }}
              >
                <Text style={{ color: COLORS.white }}>{nickname}</Text>
                <TouchableOpacity onPress={this.goToSettings}>
                  <Icon name="ios-settings" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.logOut(client)}>
                  <Text style={{ color: COLORS.white }}>Cerrar sesion</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.container}>
                <Card style={{ marginHorizontal: 12 }} onPress={this.goToCamera}>
                  <Text>camera</Text>
                </Card>
                <Card style={{ marginHorizontal: 12 }} onPress={this.goToCreditCards}>
                  <Text>lista de tarjetas</Text>
                </Card>
                <Card style={{ marginHorizontal: 12 }} onPress={this.goToAddAdress}>
                  <Text>añadir direccion</Text>
                </Card>
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column'
  }
});

export default Home;
