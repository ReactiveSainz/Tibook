import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform
} from 'react-native';

import { COLORS } from '../../constants';

const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export default ({
  title = '',
  style = {},
  loading = false,
  onPress,
  disabled = false,
  ...props
}) => {
  const Press = disabled ? null : onPress;
  return (
    <Wrapper onPress={Press}>
      <View style={[styles, style, disabled && disabledStyles]}>
        {loading ? (
          <ActivityIndicator color={COLORS.white} size="small" animating={loading} />
        ) : (
          <Text style={{ textAlign: 'center', color: COLORS.white }}>{title}</Text>
        )}
      </View>
    </Wrapper>
  );
};

const styles = {
  backgroundColor: COLORS.blue,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 4,
  minWidth: 100
};

const disabledStyles = {
  backgroundColor: COLORS.disabled
};
