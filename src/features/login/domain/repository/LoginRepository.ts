import {AuthToken} from '../model/AuthToken';

export abstract class LoginRepository {
  abstract login(username: string, password: string): Promise<AuthToken>;
}
