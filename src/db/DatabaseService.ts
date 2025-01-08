import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export class DatabaseService {
  private database: SQLiteDatabase | null = null;

  constructor(private dbName: string = 'wolly.db') {}

  async initDatabase(): Promise<void> {
    if (!this.database) {
      this.database = await openDatabase({
        name: this.dbName,
        location: 'default',
      });
    }
  }

  async executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    if (!this.database) {
      throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return new Promise((resolve, reject) => {
      this.database?.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => {
            const rows: T[] = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              rows.push(resultSet.rows.item(i));
            }
            resolve(rows);
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  async createTable(tableName: string, columns: string): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
    await this.executeQuery(query);
  }

  async insert(
    tableName: string,
    values: string,
    params: any[],
  ): Promise<void> {
    const query = `INSERT INTO ${tableName} VALUES (${values});`;
    await this.executeQuery(query, params);
  }

  async update(
    tableName: string,
    updates: string,
    condition: string,
    params: any[],
  ): Promise<void> {
    const query = `UPDATE ${tableName} SET ${updates} WHERE ${condition};`;
    await this.executeQuery(query, params);
  }

  async delete(
    tableName: string,
    condition: string,
    params: any[],
  ): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE ${condition};`;
    await this.executeQuery(query, params);
  }

  async read<T>(
    tableName: string,
    condition?: string,
    params: any[] = [],
  ): Promise<T[]> {
    const query = condition
      ? `SELECT * FROM ${tableName} WHERE ${condition};`
      : `SELECT * FROM ${tableName};`;
    return this.executeQuery<T>(query, params);
  }

  async closeDatabase(): Promise<void> {
    if (this.database) {
      await this.database.close();
      this.database = null;
    }
  }
}
