import {UserRepositoryImpl} from '../data/repository/UserRepositoryImpl';
import {UserService} from '../data/service/UserService';
import {UserRepository} from '../domain/repository/UserRepository';
import {AddToBalanceUseCase} from '../domain/usecase/AddToBalanceUseCase';
import {FetchCurrentUserUseCase} from '../domain/usecase/FetchCurrentUserUseCase';
import {FetchUsersCardBalanceUseCase} from '../domain/usecase/FetchUsersCardBalanceUseCase';

class UserDependencyContainer {
  private userService: UserService;
  private userRepository: UserRepository;
  private fetchUsersCardBalanceUseCase: FetchUsersCardBalanceUseCase;
  private fetchCurrentUserUseCase: FetchCurrentUserUseCase;
  private addToBalanceUseCase: AddToBalanceUseCase;

  constructor() {
    this.userService = new UserService();
    this.userRepository = new UserRepositoryImpl(this.userService);
    this.fetchUsersCardBalanceUseCase = new FetchUsersCardBalanceUseCase(
      this.userRepository,
    );
    this.fetchCurrentUserUseCase = new FetchCurrentUserUseCase(
      this.userRepository,
    );
    this.addToBalanceUseCase = new AddToBalanceUseCase(this.userRepository);
  }

  getUserService(): UserService {
    return this.userService;
  }

  getUserRepository(): UserRepository {
    return this.userRepository;
  }

  getFetchUsersCardBalanceUseCase(): FetchUsersCardBalanceUseCase {
    return this.fetchUsersCardBalanceUseCase;
  }

  getFetchCurrentUserUseCase(): FetchCurrentUserUseCase {
    return this.fetchCurrentUserUseCase;
  }

  getAddToBalanceUseCase(): AddToBalanceUseCase {
    return this.addToBalanceUseCase;
  }
}

export const userContainer = new UserDependencyContainer();
