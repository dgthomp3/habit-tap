import { getDB } from '../database.js';

export const createUserTable = async () => {
  const db = getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);
};

export const insertUser = async (email, password, onSuccess, onError) => {
  try {
    const db = getDB();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    await db.execAsync(`
      INSERT INTO users (email, password) 
      VALUES ('${email.replace(/'/g, "''")}', '${password.replace(/'/g, "''")}')
    `);

    const users = await db.getAllAsync('SELECT * FROM users;');
    console.log('✔️ All users after insert:', users);

    onSuccess();
  } catch (err) {
    console.error('Insert failed:', err);
    onError(err);
  }
};


export const getUser = async (email, password, callback) => {
  try {
    const db = getDB();
    const users = await db.getAllAsync(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, password]
    );

    console.log('Matching users:', users);
    callback(users);
  } catch (err) {
    console.error('Failed to get user:', err);
    callback([]);
  }
};