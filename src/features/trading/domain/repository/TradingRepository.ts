import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';

export abstract class TradingRepository {
  abstract fetch(id: string): Promise<Cryptocurrency>;
}
