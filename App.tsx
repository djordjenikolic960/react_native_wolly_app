/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locales/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

export default App;
