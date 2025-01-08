import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import TradingOption from '../model/TradingOption';

export abstract class TradingRepository {
  abstract fetch(id: string): Promise<Cryptocurrency>;

  abstract trade(
    cryptoId: string,
    tradeValue: number,
    tradingOption: TradingOption,
  ): Promise<void>;
}
