const mysql = require('mysql2');
const config = require('./config/db_config'); // файл с конфигурацией подключения

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

// Подключение к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }
  console.log('Подключение к базе данных успешно');
});

// Пример выполнения SQL запроса (выборка данных из таблицы)
connection.query('SELECT * FROM folders', (err, results) => {
  if (err) {
    console.error('Ошибка выполнения запроса: ', err);
    return;
  }
  console.log('Результаты запроса: ', results);
});

// Закрытие соединения с базой данных при завершении работы
connection.end((err) => {
  if (err) {
    console.error('Ошибка закрытия соединения: ', err);
    return;
  }
  console.log('Соединение с базой данных закрыто');
});
