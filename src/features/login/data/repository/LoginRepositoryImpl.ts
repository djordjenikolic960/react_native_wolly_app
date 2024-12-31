import {AuthToken} from '../../domain/model/AuthToken';
import {LoginRepository} from '../../domain/repository/LoginRepository';
import {loginService} from '../service/LoginService';

export class LoginRepositoryImpl implements LoginRepository {
  async login(email: string, password: string): Promise<AuthToken> {
    return await loginService.login(email, password);
  }
}
