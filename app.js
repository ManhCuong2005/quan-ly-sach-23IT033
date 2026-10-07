require('dotenv').config({ quiet: true });
const express = require('express');
const { createApp } = require('./src/app');
const { connectDatabase } = require('./src/database');
const { createSession } = require('./src/session');
const app = express();
let initialized;
async function initialize() {
  const sessions = await createSession();
  try {
    const books = await connectDatabase();
    return createApp(books, sessions.middleware);
  } catch (error) { await sessions.close(); throw error; }
}
app.use(async (req, res, next) => {
  try {
    initialized ||= initialize().catch(error => { initialized = undefined; throw error; });
    const handler = await initialized;
    handler(req, res, next);
  } catch (error) {
    console.error('Không thể kết nối Atlas:', error.code || error.name);
    res.status(503).send('Dịch vụ tạm thời chưa kết nối được cơ sở dữ liệu. Vui lòng thử lại.');
  }
});
module.exports = app;
