import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
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
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  goToSettings = () => {
    console.log('this.props', this.props);
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.SETTINGS
      }
    });
  };

  render() {
    return (
      <Query
        fetchPolicy="network-only"
        query={GET_ME}
        onError={error => console.log('errorHome', error)}
        onCompleted={complete => console.log('complete', complete)}
      >
        {({ loading, error, data }) => {
          if (error) return null;
          if (loading || !data) return null;

          if (!data.me) {
            NAV.default.goAuth();
            return null;
          }

          const { me } = data,
            { name, email, nickname } = me;

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
                <Text style={{ color: COLORS.white }}>{name}</Text>
                <TouchableOpacity onPress={this.goToSettings}>
                  <Icon name="ios-settings" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.container}>
                <Text>dsfsf </Text>
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
    flex: 1
  }
});

export default Home;
