import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../../../assets';
import {formatCurrency} from '../../../../utils/CurrencyUtil';

interface DashboardCardParams {
  cryptoBalance: number | null;
}

const DashboardCard: React.FC<DashboardCardParams> = ({cryptoBalance}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.title}>
            {cryptoBalance ? formatCurrency(cryptoBalance) : ''}
          </Text>
          <Text style={styles.subtitle}>Your balance is equivalent</Text>
        </View>
        <Image source={Images.icons.bitcoin} />
      </View>
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#b3ffffff',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    height: 176,
    borderRadius: 12,
    padding: 20,
    marginBottom: 84,
    backgroundColor: '#4A7DDF',
  },
});
