const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Подключаемся к базе данных
const app = express();

// Позволяет приложению читать данные из тела запроса
app.use(bodyParser.json());

// Получение списка всех папок
app.get('/folders', (req, res) => {
    pool.query('SELECT * FROM folders', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса: ', err);
            res.status(500).json({ error: 'Ошибка выполнения запроса' });
            return;
        }
        res.json(result.rows); // Отправляем список папок клиенту в формате JSON
    });
});

// Добавление новой папки
app.post('/folders', (req, res) => {
    const { name } = req.body;
    pool.query('INSERT INTO folders (name) VALUES ($1) RETURNING *', [name], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса: ', err);
            res.status(500).json({ error: 'Ошибка выполнения запроса' });
            return;
        }
        res.status(201).json(result.rows[0]); // Возвращаем созданную папку в формате JSON
    });
});

// Удаление папки по ID
app.delete('/folders/:id', (req, res) => {
    const folderId = req.params.id;
    pool.query('DELETE FROM folders WHERE id = $1', [folderId], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса: ', err);
            res.status(500).json({ error: 'Ошибка выполнения запроса' });
            return;
        }
        res.sendStatus(204); // Отправляем статус "No Content", чтобы указать, что запрос выполнен успешно
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
