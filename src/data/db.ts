import Dexie from 'dexie';

export const db = new Dexie('WishmintDB');

// Version 3: Forcing a secure upgrade covering both stores
db.version(3).stores({
  expenses: '++id, title, amount, category, date, type, storyNote',
  settings: 'key'
});

// Explicit error catching layer
db.open().catch(err => {
  console.error("Dexie Open Failed Layer:", err);
});
