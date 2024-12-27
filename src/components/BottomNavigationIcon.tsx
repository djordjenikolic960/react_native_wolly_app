import {StyleSheet, Text, View, ImageSourcePropType, Image} from 'react-native';
import React from 'react';

interface BottomTabIconProps {
  icon: ImageSourcePropType;
  color?: string;
  size?: number;
}

const BottomNavigationIcon: React.FC<BottomTabIconProps> = ({
  icon,
  color,
  size = 24,
}) => {
  return (
    <View>
      <Image
        source={icon}
        style={{
          tintColor: color,
          height: size,
          width: size,
        }}
      />
    </View>
  );
};

export default BottomNavigationIcon;
