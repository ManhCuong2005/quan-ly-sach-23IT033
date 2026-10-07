const path = require('node:path');
const express = require('express');
const { engine } = require('express-handlebars');
const student = require('./config/student');

const app = express();
app.disable('x-powered-by');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('home', { student }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
module.exports = app;
