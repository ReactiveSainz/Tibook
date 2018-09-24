import React from 'react';
import { COLORS } from '../../constants';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CTextInput = ({ label, style, value = '', onChange, ...props }) => {
  this.inputRef = React.createRef();
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          this.inputRef && this.inputRef.current.focus();
        }}
      >
        <Text style={{ color: COLORS.blue }}>{label}</Text>
      </TouchableOpacity>
      <TextInput
        {...props}
        ref={this.inputRef}
        value={value}
        onChangeText={onChange}
        style={{
          marginTop: 4,
          borderBottomColor: COLORS.blue,
          borderBottomWidth: 1,
          paddingBottom: 5
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default CTextInput;
