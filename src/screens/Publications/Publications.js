import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

class PublicationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>PublicationsScreen</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default PublicationsScreen;
