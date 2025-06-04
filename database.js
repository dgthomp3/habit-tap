import * as SQLite from 'expo-sqlite';

let db = null;

export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('habits.db');
    console.log('Database initialized');
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('DB not initialized. Call initDB() first.');
  }
  return db;
};