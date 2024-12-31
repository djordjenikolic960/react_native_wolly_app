import {apiClient} from '../../../../api/ApiClient';
import {User} from '../../domain/model/User';

class CreateAccountService {
  async createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    try {
      const response = await apiClient.post<
        {email: string; password: string; firstName: string; lastName: string},
        User
      >('api/v1/users/register', {
        email,
        password,
        firstName,
        lastName,
      });

      return {
        email: response.email,
        password: response.password,
        firstName: response.firstName,
        lastName: response.lastName,
        id: response.id,
        currentCardBalanse: response.currentCardBalanse,
        role: response.role,
      };
    } catch (e) {
      throw Error();
    }
  }
}

export const createAccountse = new CreateAccountService();
