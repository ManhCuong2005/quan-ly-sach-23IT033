const path = require('node:path');
const express = require('express');
const { engine } = require('express-handlebars');
const student = require('./config/student');
const { prepareBook } = require('./book');
function createApp(books) {
  const app = express();
  app.disable('x-powered-by');
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({ extended: false, limit: '16kb' }));
  app.use(express.static(path.join(__dirname, 'public')));
  async function show(res, status = 200, error = '', values = {}) {
    const rows = await books.list();
    const format = (value) => new Intl.NumberFormat('vi-VN').format(value);
    res.status(status).render('home', { student, error, values, books: rows.map(book => ({
      code: book.code, title: book.title, price: format(book.price), priceAfterTax: format(book.priceAfterTax),
    })) });
  }
  app.get('/', async (req, res) => show(res));
  app.post('/books', async (req, res) => {
    let book;
    try { book = prepareBook(req.body); }
    catch (error) { return show(res, 400, error.message, req.body); }
    await books.add(book);
    res.redirect(303, '/');
  });
  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use((error, req, res, next) => {
    console.error('Yêu cầu thất bại; mã lỗi:', error.code || error.name);
    res.status(500).send('Không thể xử lý yêu cầu. Vui lòng thử lại sau.');
  });
  return app;
}
module.exports = { createApp };
