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

export const createHabitTable = async () => {
  const db = getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL
    );
  `);
};

export const insertHabit = async (habit) => {
  const db = getDB();
  await db.runAsync(
    `INSERT INTO habits (id, title, completed) VALUES (?, ?, ?);`,
    [habit.id, habit.title, habit.completed ? 1 : 0]
  );
};

export const getAllHabits = async () => {
  const db = getDB();
  const result = await db.getAllAsync(`SELECT * FROM habits;`);
  return result.map((row) => ({
    ...row,
    completed: row.completed === 1,
  }));
};

export const toggleHabit = async (id, newStatus) => {
  const db = getDB();
  await db.runAsync(
    `UPDATE habits SET completed = ? WHERE id = ?;`,
    [newStatus ? 1 : 0, id]
  );
};