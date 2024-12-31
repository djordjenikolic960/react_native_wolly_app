import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/Types';
import {useTheme} from '../../../../theme/ThemeProvider';
import {styles} from '../styles';
import {Images} from '../../../../assets';
import FormField from '../../../../components/form_field/FormField';
import CustomButton from '../../../../components/custom_button/CustomButton';
import LoadingView from '../../../../components/loading/LoadingView';
import useCreateAccountStore from '../store/CreateAccountStore';

// types the useNavigation hook so that navigate('Tabs') works without errors.
type CreateAccountNavigationProps = NavigationProp<
  RootStackParamList,
  'CreateAccount'
>;

const CreateAccountScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<CreateAccountNavigationProps>();
  const {
    email,
    password,
    firstName,
    lastName,
    loading,
    error,
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    setPassword,
    setEmail,
    setFirstName,
    setLastName,
    createAccount,
  } = useCreateAccountStore();

  const handleCreateAccount = async () => {
    await createAccount();

    if (
      !emailError &&
      !passwordError &&
      !firstNameError &&
      !lastNameError &&
      !loading &&
      !error
    ) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text
          style={[
            styles.welcomeText,
            {fontSize: theme.fonts.sizes.extraLarge},
          ]}>
          Create Account
        </Text>
        <Image source={Images.icons.createAccount} resizeMode="contain" />
      </View>
      <View style={styles.bottomSheet}>
        <FormField
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          error={firstNameError}
          onChangeText={setFirstName}
        />

        <FormField
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          error={lastNameError}
          onChangeText={setLastName}
        />

        <FormField
          label="Email"
          placeholder="Enter your email"
          value={email}
          error={emailError}
          onChangeText={setEmail}
        />

        <FormField
          label="Password"
          placeholder="Enter your password"
          value={password}
          error={passwordError}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View
          style={{
            alignItems: 'center',
            marginTop: 'auto',
          }}>
          <CustomButton label="Create Account" onClick={handleCreateAccount} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              }}>
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading ? <LoadingView /> : <></>}
    </View>
  );
};

export default CreateAccountScreen;
