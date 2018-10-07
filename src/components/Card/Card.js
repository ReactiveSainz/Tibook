import React from 'React';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

class Card extends React.PureComponent {
  render() {
    const { style = {} } = this.props;
    const onPress = this.props.onPress ? this.props.onPress : () => console.log('onPress');
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: COLORS.blue,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 4
  }
};
export default Card;
