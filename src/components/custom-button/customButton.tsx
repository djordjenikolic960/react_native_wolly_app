import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeProvider';
import {createStyles} from './styles';

interface ButtonParams {
  label: string;
  containerStyles?: string;
  textStyles?: string;
  onClick: () => void;
}

const CustomButton: React.FC<ButtonParams> = ({
  label,
  containerStyles,
  textStyles,
  onClick,
}) => {
  const {theme} = useTheme();
  const style = createStyles(theme);
  return (
    <TouchableOpacity
      style={style.container}
      onPress={onClick}
      activeOpacity={0.8}>
      <View style={style.button}>
        <Text style={style.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
