import {CurrentUser} from '../model/CurrentUser';

export abstract class UserRepository {
  abstract getUser(): Promise<CurrentUser>;

  abstract addToBalance(value: number): Promise<void>;
}
