import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '@styles';

const styles = StyleSheet.create({
  navBar: {
    height: metrics.navBarHeight,
    backgroundColor: colors.white,
    paddingHorizontal: metrics.doubleBaseMargin,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: fonts.large,
    color: colors.text,
  },
});

export default styles;
