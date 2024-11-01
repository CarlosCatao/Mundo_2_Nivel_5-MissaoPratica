const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

const app = express();

const PORT = 3030;

// Configura o CORS
app.use(cors());

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Roteador
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const livroRouter = require('./routes/livros');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livros', livroRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Testa a conecção com o mongodb
const banco = require('./modelo/conexao');

banco.connection.on('connected', () => {
    console.log('Mongoose conectado ao MongoDB.');
});

banco.connection.on('error', (err) => {
    console.error('Erro de conexão com o MongoDB:', err);
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
