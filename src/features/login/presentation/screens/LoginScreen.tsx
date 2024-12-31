import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/Types';
import {useTheme} from '../../../../theme/ThemeProvider';
import useLoginStore from '../store/LoginStore';
import FormField from '../../../../components/form_field/FormField';
import {Images} from '../../../../assets';
import CustomButton from '../../../../components/custom_button/CustomButton';
import LoadingView from '../../../../components/loading/LoadingView';
import {styles} from '../styles';

// types the useNavigation hook so that navigate('Tabs') works without errors.
type LoginNavigationProps = NavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<LoginNavigationProps>();
  const {
    email,
    password,
    loading,
    error,
    emailError,
    passwordError,
    setPassword,
    setEmail,
    login,
  } = useLoginStore();

  const handleLogin = async () => {
    await login();

    if (!emailError && !passwordError && !loading) {
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
          Welcome Back!
        </Text>
        <Image source={Images.icons.login} resizeMode="contain" />
      </View>
      <View style={styles.bottomSheet}>
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
          <CustomButton label="Login" onClick={handleLogin} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'CreateAccount'}],
                });
              }}>
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading ? <LoadingView /> : <></>}
    </View>
  );
};

export default LoginScreen;
