import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default ({
  value = '',
  keyboardType = 'default',
  containerStyle = {},
  inputStyle = {},
  onChange,
  spellCheck = false,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        onChange={onChange}
        style={[styles.input, inputStyle]}
        value={value}
        spellCheck={spellCheck}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = {
  container: {
    minHeight: 32,
    minWidth: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: COLORS.disabled,
    borderWidth: StyleSheet.hairlineWidth
  },
  input: {
    fontSize: 16
  }
};
