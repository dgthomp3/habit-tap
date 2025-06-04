import db from '../database';

export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );`
    );
  });
};

export const insertUser = (email, password, onSuccess, onError) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (email, password) VALUES (?, ?);',
      [email, password],
      (_, result) => onSuccess(result),
      (_, error) => {
        onError(error);
        return false;
      }
    );
  });
};

export const getUser = (email, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, password],
      (_, { rows }) => callback(rows._array)
    );
  });
};
