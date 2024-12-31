import {Text, View} from 'react-native';
import React from 'react';

interface InfoComponentParams {
  title: string;
  subtitle: string;
}

const InfoComponent: React.FC<InfoComponentParams> = ({title, subtitle}) => {
  return (
    <View
      style={{
        marginTop: 16,
        marginBottom: 8,
        alignSelf: 'flex-start',
      }}>
      <Text
        style={{
          fontWeight: '400',
          color: '#B9C1D9',
          fontSize: 14,
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontWeight: '400',
          color: '#8D8B8B',
          fontSize: 16,
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoComponent;
