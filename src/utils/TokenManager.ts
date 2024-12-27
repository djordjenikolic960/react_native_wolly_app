import SecureStorage from './SecureStorage';

class TokenManager {
  private static instance: TokenManager;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

 async getToken(): Promise<string | null> {
    return await SecureStorage.get('authToken');
  }

 async saveToken(token: string): Promise<boolean> {
    try {
      const success = await SecureStorage.save('authToken', token);
      if (success) {
        return true;
      } else {
        throw new Error("failed to save token");
      }
    } catch (error) {
      console.log("error saving token: ", error);
      return false;
    }
   
  }

 async deleteToken(): Promise<boolean> {
    return await SecureStorage.delete('authToken');
  }
}

export default TokenManager.getInstance();
