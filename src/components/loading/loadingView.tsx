import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useTheme} from '../../theme/ThemeProvider';

const LoadingView = () => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default LoadingView;
