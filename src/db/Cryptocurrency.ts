import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {WalletCryptocurrency} from '../features/dashboard/domain/model/WalletCryptocurrency';

export const getWalletCryptos = async (
  db: SQLiteDatabase,
  tableName: string,
): Promise<WalletCryptocurrency[]> => {
  try {
    const walletCryptos: WalletCryptocurrency[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        walletCryptos.push(result.rows.item(index));
      }
    });
    return walletCryptos;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get walletCryptos !!!');
  }
};

export const saveTodoItems = async (
  db: SQLiteDatabase,
  todoItems: ToDoItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
