import {User} from '../model/User';

export abstract class CreateAccountRepository {
  abstract createAccount(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User>;
}
