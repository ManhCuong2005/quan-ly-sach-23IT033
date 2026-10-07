const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const { createClient } = require('./database');
const student = require('./config/student');
async function createSession() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET phải có ít nhất 32 ký tự.');
  const client = createClient('SESSION');
  try {
    await client.connect();
    const store = MongoStore.create({ clientPromise: Promise.resolve(client),
      dbName: student.databaseName, collectionName: 'sessions',
      autoRemove: process.env.VERCEL ? 'disabled' : 'interval', autoRemoveInterval: 10, ttl: 86400 });
    store.on('error', error => console.error('Lỗi session store:', error.code || error.name));
    return { store, middleware: session({ name: 'books.sid', secret, store,
      resave: false, saveUninitialized: false,
      cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 86400000 },
    }), close: () => store.close() };
  } catch (error) { await client.close(); throw error; }
}
module.exports = { createSession };
