import * as Keychain from 'react-native-keychain';

class SecureStorage {
  static async save(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value);
      return true;
    } catch (error) {
      console.log('Error saving data to Keychain:', error);
      return false;
    }
  }

  static async get(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.username === key) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error reading data from Keychain:', error);
      return null;
    }
  }

  static async delete(key: string): Promise<boolean> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.username === key) {
        await Keychain.resetGenericPassword();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting data from Keychain:', error);
      return false;
    }
  }
}

export default SecureStorage;
