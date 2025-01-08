import {DatabaseService} from '../../../../../db/DatabaseService';
import {Cryptocurrency} from '../../../domain/model/Cryptocurrency';

export class CryptoDatabaseService {
  private dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this.dbService = dbService;
    this.init();
  }

  async init(): Promise<void> {
    // Initialize the database and create the `cryptos` table
    await this.dbService.initDatabase();
    await this.dbService.createTable(
      'cryptos',
      `id TEXT PRIMARY KEY,
       name TEXT,
       icon TEXT,
       valueOfOne REAL,
       abbreviation TEXT`,
    );
  }

  async saveCryptos(cryptos: Cryptocurrency[]): Promise<void> {
    try {
      // Clear existing data
      await this.dbService.executeQuery('DELETE FROM cryptos');

      // Insert new data
      for (const crypto of cryptos) {
        await this.dbService.insert('cryptos', '?, ?, ?, ?, ?', [
          crypto.id,
          crypto.name,
          crypto.icon,
          crypto.valueOfOne,
          crypto.abbreviation,
        ]);
      }
    } catch (error) {
      console.error('Error saving cryptos:', error);
      throw new Error('Database error');
    }
  }

  async getCryptos(): Promise<Cryptocurrency[]> {
    try {
      const results = await this.dbService.read<Cryptocurrency>('cryptos');
      return results;
    } catch (error) {
      console.error('Error fetching cryptos:', error);
      throw new Error('Database error');
    }
  }
}
