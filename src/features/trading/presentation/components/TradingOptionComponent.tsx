import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TradingOption from '../../domain/model/TradingOption';

interface TradingOptionComponentParams {
  label: string;
  tradingOption: TradingOption;
  selectedTradingOption: TradingOption;
  onClick: () => void;
}

const TradingOptionComponent: React.FC<TradingOptionComponentParams> = ({
  label,
  tradingOption,
  selectedTradingOption,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '50%',
        backgroundColor:
          tradingOption === selectedTradingOption ? '#4AD6DF' : '#fff',
        height: 34,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => onClick()}>
      <Text
        style={{
          color: tradingOption === selectedTradingOption ? '#fff' : '#000',
          fontWeight: '500',
          fontSize: 14,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TradingOptionComponent;
