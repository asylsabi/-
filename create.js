
// Функция для отправки данных формы на сервер и перенаправления на главную страницу
function createFolder(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const folderName = document.getElementById('folder-name').value;
    const pdfFile = document.getElementById('pdf-file').files[0];
    const notes = document.getElementById('notes').value;

    // Создаем объект FormData для отправки данных на сервер
    const formData = new FormData();
    formData.append('folderName', folderName);
    formData.append('pdfFile', pdfFile);
    formData.append('notes', notes);

    // Отправляем запрос на сервер
    fetch('/api/create-folder', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Папка успешно создана');
            // Перенаправляем пользователя на главную страницу
            window.location.href = '1.html';
        } else {
            console.error('Ошибка при создании папки:', response.statusText);
        }
    })
    .catch(error => console.error('Ошибка при создании папки:', error));
}

// Назначаем обработчик события отправки формы
document.getElementById('create-folder-form').addEventListener('submit', createFolder);
