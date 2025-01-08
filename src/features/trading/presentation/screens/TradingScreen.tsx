import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/Types';
import useTradingStore from '../store/TradingStore';
import {styles} from '../../../crypto_market_list/presentation/styles';
import Divider from '../../../../components/divider/Divider';
import FormField from '../../../../components/form_field/FormField';
import CustomButton from '../../../../components/custom_button/CustomButton';
import TradingOptionComponent from '../components/TradingOptionComponent';
import InfoComponent from '../components/InfoComponent';
import TradingOption from '../../domain/model/TradingOption';
import {formatCurrency} from '../../../../utils/CurrencyUtil';
import createAlertDialog from '../../../../components/dialog/AlertDialog';
import {useTranslation} from 'react-i18next';
import Snackbar from 'react-native-snackbar';

type TradingScreenRouteProp = RouteProp<RootStackParamList, 'Trading'>;

const TradingScreen = ({route}: {route: TradingScreenRouteProp}) => {
  const {id} = route.params;
  const {t} = useTranslation();

  const {
    selectedCrypto,
    loading,
    currentUserValue,
    tradeValue,
    error,
    enteredTradeValue,
    tradingOption,
    fetchCryptoCurrencie,
    setTradingOption,
    setEnteredTradeValue,
    reset,
    trade,
  } = useTradingStore();

  useEffect(() => {
    reset();
    fetchCryptoCurrencie(id);
  }, []);

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: `Error: ${error.type} - ${error.error}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: selectedCrypto?.icon}}
            style={{height: 110, width: 110}}
          />
          <Text style={styles.header}>
            {selectedCrypto?.valueOfOne
              ? formatCurrency(selectedCrypto!.valueOfOne)
              : ''}
          </Text>
          <Text
            style={
              styles.subtitle
            }>{`1.00 ${selectedCrypto?.abbreviation}`}</Text>
          <View
            style={{
              width: '100%',
              borderColor: '#000',
              borderWidth: 1,
              height: 36,
              flexDirection: 'row',
            }}>
            <TradingOptionComponent
              label="Bye"
              tradingOption={TradingOption.Buy}
              selectedTradingOption={tradingOption}
              onClick={() => setTradingOption(TradingOption.Buy)}
            />

            <TradingOptionComponent
              label="Sell"
              tradingOption={TradingOption.Sell}
              selectedTradingOption={tradingOption}
              onClick={() => setTradingOption(TradingOption.Sell)}
            />
          </View>
          <Divider />
          <InfoComponent
            title="Current user value"
            subtitle={currentUserValue.toString()}
          />
          <Divider />
          <InfoComponent
            title="Trade value"
            subtitle={tradeValue.toString() + ' ' + 'USD'}
          />
          <Divider />
          <View
            style={{
              marginTop: 16,
            }}
          />
          <FormField
            placeholder={'0.0'}
            value={enteredTradeValue}
            onChangeText={text => {
              setEnteredTradeValue(text);
            }}
            error={null}
          />

          <View
            style={{
              alignItems: 'center',
              marginTop: 'auto',
            }}>
            <CustomButton
              label="Submit"
              onClick={() => {
                createAlertDialog({
                  title: t('trading_dialog_title', {
                    tradingOption:
                      tradingOption === TradingOption.Buy
                        ? t('buy')
                        : t('sell'),
                    value: tradeValue + ' USD',
                  }),
                  subtitle: '',
                  positiveButtonText: t('positive_button'),
                  negativeButtonText: t('negative_button'),
                  onPositiveButtonPressed: () => {
                    trade(
                      selectedCrypto?.id!,
                      Number(enteredTradeValue) * selectedCrypto!.valueOfOne,
                      tradingOption,
                    );
                  },
                  onNegativeButtonPressed: () => {},
                });
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TradingScreen;
