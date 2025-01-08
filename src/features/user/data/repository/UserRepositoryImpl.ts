import {CurrentUser} from '../../domain/model/CurrentUser';
import {UserRepository} from '../../domain/repository/UserRepository';
import {UserService} from '../service/UserService';

export class UserRepositoryImpl implements UserRepository {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async addToBalance(value: number): Promise<void> {
    try {
      await this.userService.addToBalance(value);
    } catch (error) {
      throw new Error('Error adding to balance');
    }
  }

  async getUser(): Promise<CurrentUser> {
    try {
      return await this.userService.fetchUser();
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }
}
