import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useUserStore from '../store/UserStore';
import {styles} from '../styles';
import FormField from '../../../../components/form_field/FormField';
import {formatCurrency} from '../../../../utils/CurrencyUtil';
import Divider from '../../../../components/divider/Divider';
import CustomButton from '../../../../components/custom_button/CustomButton';
import createAlertDialog from '../../../../components/dialog/AlertDialog';
import {useTranslation} from 'react-i18next';
import LoadingView from '../../../../components/loading/LoadingView';

const UserInfoScreen = () => {
  const {t} = useTranslation();
  const {
    loading,
    user,
    error,
    amountToAdd,
    addToCreditCard,
    fetchCurrentUser,
    reset,
    setAmount,
  } = useUserStore();

  useEffect(() => {
    reset();
    fetchCurrentUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FormField
          label=""
          placeholder={
            user ? user.firstName + ' ' + user.lastName : 'FirstName LastName'
          }
          error={null}
          onChangeText={() => {}}
          value={''}
          textAlign="center"
        />

        <FormField
          label=""
          placeholder={user ? user.email : 'E-mail'}
          error={null}
          onChangeText={() => {}}
          value={''}
          textAlign="center"
        />

        <FormField
          label=""
          placeholder={
            user ? formatCurrency(user.currentCardBalance) : 'E-mail'
          }
          error={null}
          onChangeText={() => {}}
          value={''}
          textAlign="center"
        />

        <Divider />

        <View style={{marginTop: 28}}></View>

        <FormField
          label=""
          placeholder={'Add to credit card'}
          error={null}
          onChangeText={value => {
            setAmount(value);
          }}
          value={amountToAdd}
          textAlign="center"
        />

        <View
          style={{
            alignItems: 'center',
            marginTop: 'auto',
          }}>
          <CustomButton
            label={t('submit')}
            onClick={() => {
              createAlertDialog({
                title: t('add_to_credit_card_title', {
                  value: formatCurrency(Number(amountToAdd)),
                }),
                subtitle: '',
                positiveButtonText: t('positive_button'),
                negativeButtonText: t('negative_button'),
                onPositiveButtonPressed: () => {
                  addToCreditCard(Number(amountToAdd));
                  setAmount('');
                  fetchCurrentUser();
                },
                onNegativeButtonPressed: () => {},
              });
            }}
          />
        </View>
        {loading ? <LoadingView /> : <></>}
      </View>
    </SafeAreaView>
  );
};

export default UserInfoScreen;
