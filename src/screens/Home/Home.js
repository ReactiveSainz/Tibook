import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Home</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
