import Dexie from 'dexie';

export const db = new Dexie('TodoApp');
db.version(1).stores({
  todos: '++id, title, completed',
});
