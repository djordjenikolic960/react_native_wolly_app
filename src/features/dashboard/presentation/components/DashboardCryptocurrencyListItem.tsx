import {Image, Text, View} from 'react-native';
import React from 'react';
import {WalletCryptocurrency} from '../../domain/model/WalletCryptocurrency';
import {styles} from '../screens/styles';
import {formatCurrency} from '../../../../utils/CurrencyUtil';

const DashboardCryptocurrencyListItem: React.FC<WalletCryptocurrency> = ({
  abbreviation,
  cryptocurrencyId,
  icon,
  name,
  sum,
  valueOfOne,
}) => {
  const value = sum * valueOfOne;
  return (
    <View
      style={{
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}>
      <Image source={{uri: icon}} style={{height: 56, width: 56}} />
      <View style={{width: 12}}></View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{abbreviation.toUpperCase()}</Text>
          <Text style={styles.title}>{formatCurrency(value)}</Text>
        </View>
        <View style={{height: 4}}></View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.subtitle}>{formatCurrency(valueOfOne)}</Text>
          <Text style={styles.subtitle}>{`${sum} ${
            abbreviation ? abbreviation : ''
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardCryptocurrencyListItem;
