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

export const createHabitLogTable = async () => {
  const db = getDB();

  // TEMPORARY: Drop the table if it exists (only during dev)
  await db.execAsync(`DROP TABLE IF EXISTS habit_logs;`);

  // Recreate with the UNIQUE constraint
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      date TEXT NOT NULL,
      completed INTEGER NOT NULL,
      UNIQUE(habit_id, date),
      FOREIGN KEY (habit_id) REFERENCES habits(id)
    );
  `);
};

export const logHabitCompletion = async (habitId, completed) => {
  const db = getDB();
  const today = new Date().toISOString().split('T')[0];

  await db.runAsync(`
    INSERT INTO habit_logs (habit_id, date, completed)
    VALUES (?, ?, ?)
    ON CONFLICT(habit_id, date) DO UPDATE SET completed = ?;
  `, [habitId, today, completed ? 1 : 0, completed ? 1 : 0]);
};

export const getHabitLogsForMonth = async (habitId, month, year) => {
  const db = getDB();
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const end = `${year}-${String(month).padStart(2, '0')}-31`;

  const logs = await db.getAllAsync(
    `SELECT date, completed FROM habit_logs WHERE habit_id = ? AND date BETWEEN ? AND ?;`,
    [habitId, start, end]
  );

  return logs.reduce((acc, log) => {
    acc[log.date] = log.completed === 1;
    return acc;
  }, {});
};

export const createDailyCompletionTable = async () => {
  const db = getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_completion (
      date TEXT PRIMARY KEY,
      completed INTEGER NOT NULL
    );
  `);
};

export const logDailyCompletion = async (date) => {
  const db = getDB();
  await db.runAsync(`
    INSERT INTO daily_completion (date, completed)
    VALUES (?, 1)
    ON CONFLICT(date) DO UPDATE SET completed = 1;
  `, [date]);
};

export const getCompletedDaysForMonth = async (month, year) => {
  const db = getDB();
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const end = `${year}-${String(month).padStart(2, '0')}-31`;

  const rows = await db.getAllAsync(
    `SELECT date FROM daily_completion WHERE date BETWEEN ? AND ? AND completed = 1`,
    [start, end]
  );

  return rows.map((row) => row.date);
};