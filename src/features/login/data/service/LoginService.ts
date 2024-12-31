import {apiClient} from '../../../../api/ApiClient';
import {AuthToken} from '../../domain/model/AuthToken';

class LoginService {
  async login(email: string, password: string): Promise<AuthToken> {
    try {
      const response = await apiClient.post<
        {email: string; password: string},
        {jwtToken: string}
      >('/api/v1/users/login', {email, password});

      return {token: response.jwtToken};
    } catch (e) {
      throw Error();
    }
  }
}

export const loginService = new LoginService();
