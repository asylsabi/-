// Функция для загрузки файла
function uploadFile() {
    document.getElementById('fileInput').click();
}

// Функция для отображения списка папок и загруженного PDF-файла
function displayFoldersAndFiles() {
    // Очистим список папок перед загрузкой новых данных
    const foldersList = document.getElementById('folders-list');
    foldersList.innerHTML = '';

    // Здесь вы можете отправить запрос на сервер для получения списка папок и файлов,
    // а затем добавить каждый элемент списка на страницу
    // Примерно так:
    fetch('/api/folders')
        .then(response => response.json())
        .then(data => {
            data.forEach(folder => {
                const folderRow = document.createElement('tr');
                folderRow.innerHTML = `
                    <td>${folder.name}</td>
                    <td><a href="${folder.pdf_url}" target="_blank">${folder.pdf_name}</a></td>
                    <td>${folder.notes}</td>
                `;
                foldersList.appendChild(folderRow);
            });
        })
        .catch(error => console.error('Ошибка при получении списка папок:', error));
}



// Обработчик события изменения выбранного файла
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const fileContainer = document.getElementById('file-container');
        const pdfViewer = document.createElement('embed');
        pdfViewer.src = e.target.result;
        pdfViewer.type = 'application/pdf';
        pdfViewer.width = '500';
        pdfViewer.height = '600';
        fileContainer.innerHTML = ''; // Очищаем контейнер перед добавлением нового файла
        fileContainer.appendChild(pdfViewer);
    };

    reader.readAsDataURL(file);
});

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', displayFoldersAndFiles);
