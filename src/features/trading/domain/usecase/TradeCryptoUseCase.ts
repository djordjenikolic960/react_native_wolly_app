import {BaseError} from '../../../../errors/BaseError';
import {isBaseError} from '../../../../utils/ErrorUtils';
import {FetchUsersCardBalanceUseCase} from '../../../user/domain/usecase/FetchUsersCardBalanceUseCase';
import TradingOption from '../model/TradingOption';
import {TradingRepository} from '../repository/TradingRepository';

export class TradeCryptoUseCase {
  private tradingRepository: TradingRepository;
  private fetchUsersCardBalanceUseCase: FetchUsersCardBalanceUseCase;

  constructor(
    tradingRepository: TradingRepository,
    fetchUsersCardBalanceUseCase: FetchUsersCardBalanceUseCase,
  ) {
    this.tradingRepository = tradingRepository;
    this.fetchUsersCardBalanceUseCase = fetchUsersCardBalanceUseCase;
  }

  async execute(
    cryptoId: string,
    tradingValue: number,
    tradingOption: TradingOption,
  ): Promise<void> {
    try {
      if (tradingOption === TradingOption.Buy) {
        const usersCardBalance =
          await this.fetchUsersCardBalanceUseCase.execute();
        if (usersCardBalance < tradingValue) {
          const error: BaseError = {
            type: 'TradingError',
            error: 'INSUFFICIENT_FUNDS',
          };
          throw error;
        }
        await this.tradingRepository.trade(
          cryptoId,
          tradingValue,
          tradingOption,
        );
      }
      await this.tradingRepository.trade(cryptoId, tradingValue, tradingOption);
    } catch (error) {
      if (isBaseError(error)) {
        throw error; // Rethrow BaseError
      } else {
        throw {
          type: 'NetworkError',
          error: 'UNKNOWN',
        } as BaseError; // Wrap other errors
      }
    }
  }
}
