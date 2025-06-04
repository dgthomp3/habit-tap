import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('habits.db');

export default db;
