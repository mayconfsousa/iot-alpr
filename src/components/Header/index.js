import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { colors, fonts } from '../../styles';

const Header = ({
  title, leftIcon, rightIcon, onPressLeft, onPressRight,
}) => (
  <View style={styles.navBar}>
    <StatusBar backgroundColor={colors.statusBar} />
    <TouchableOpacity onPress={onPressLeft}>
      <Icon name={leftIcon} size={fonts.iconHeader} color={colors.text} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onPressRight}>
      <Icon name={rightIcon} size={fonts.iconHeader} color={colors.text} />
    </TouchableOpacity>
  </View>
);

Header.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  onPressLeft: () => {},
  onPressRight: () => {},
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

export default Header;
