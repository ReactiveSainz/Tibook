import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});

export default SettingsScreen;
