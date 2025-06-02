// Инициализация при загрузке DOM

document.addEventListener('DOMContentLoaded', function() {

//Получение элементов DOM

    //Поле ввода новой задачи
    const taskInput = document.getElementById('taskInput');

    // Кнопку добавления задачи    
    const addTaskBtn = document.getElementById('addTaskBtn');

    //Список задач    
    const taskList = document.getElementById('taskList');

    //Обработчики событий

    //Добавляем обработчик клика по кнопке добавления
    addTaskBtn.addEventListener('click', addTask);

    //Добавляем обработчик нажатия Enter в поле ввода
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });


    //Функция добавления задачи
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        //контейнер для задачи
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        //текст задачи
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;


        //кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        //Удаление задачи при клике на кнопку
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });

        //Переключение состояния выполнения при клике на текст задачи
        taskSpan.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
            saveTasks();
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        
        taskInput.value = '';
        saveTasks();
    }

    //Сохраняет все задачи в localStorage в JSON, включая их текст и состояние выполнения.
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const text = taskItem.querySelector('.task-text').textContent;
            const completed = taskItem.querySelector('.task-text').classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';

                const taskSpan = document.createElement('span');
                taskSpan.className = 'task-text';
                taskSpan.textContent = task.text;
                if (task.completed) {
                    taskSpan.classList.add('completed');
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                });

                taskSpan.addEventListener('click', function() {
                    taskSpan.classList.toggle('completed');
                    saveTasks();
                });

                taskItem.appendChild(taskSpan);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            });
        }
    }

    loadTasks();
});