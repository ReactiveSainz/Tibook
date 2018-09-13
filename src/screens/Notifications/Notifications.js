import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Notifications</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Notifications;
