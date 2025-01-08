/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locales/i18n';
import {DatabaseService} from './src/db/DatabaseService';

function App() {
  const databaseService = new DatabaseService();

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await databaseService.initDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    initDatabase();
  }, []);

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
