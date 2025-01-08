import {CurrentUser} from '../model/CurrentUser';
import {UserRepository} from '../repository/UserRepository';

export class FetchCurrentUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<CurrentUser> {
    try {
      return await this.userRepository.getUser();
    } catch (error) {
      throw error;
    }
  }
}
