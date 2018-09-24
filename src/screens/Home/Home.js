import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import { NAV } from '../../utilities';
import { SCREENS } from '../../constants';
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

const LOG_OUT = gql`
  mutation logOut {
    logOut @client
  }
`;
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  logOut = async client => {
    // this.props.mutate({ variables: {} });
  };

  goToSettings = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.SETTINGS
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

          if (!data.me) {
            NAV.default.goAuth();
            return null;
          }

          const { me } = data,
            { name, email, nickname, role } = me;

          return (
            <View>
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
                <TouchableOpacity onPress={this.logOut}>
                  <Text style={{ color: COLORS.white }}>Cerrar sesion</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.container}>
                <Text>Principal Screen</Text>
                <Text>{name}</Text>
                <Text>{nickname}</Text>
                <Text>{email}</Text>
                <Text>{role}</Text>
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
    marginHorizontal: 16,
    marginVertical: 8
  }
});

export default graphql(LOG_OUT)(Home);
