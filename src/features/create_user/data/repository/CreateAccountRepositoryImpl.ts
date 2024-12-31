import {User} from '../../domain/model/User';
import {CreateAccountRepository} from '../../domain/repository/CreateAccountRepository';
import {createAccountService} from '../service/CreateAccountService';

export class CreateAccountRepositoryImpl implements CreateAccountRepository {
  async createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    return await createAccountService.createAccount(
      email,
      password,
      firstName,
      lastName,
    );
  }
}
