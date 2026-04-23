document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const taskLists = document.querySelectorAll('.task-list');

    // Update the numbers in the column headers
    function updateCounts() {
        document.getElementById('todo-count').innerText = document.getElementById('todo-list').children.length;
        document.getElementById('progress-count').innerText = document.getElementById('progress-list').children.length;
        document.getElementById('done-count').innerText = document.getElementById('done-list').children.length;
    }

    function createTask(taskText) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task');
        taskCard.setAttribute('draggable', 'true');

        taskCard.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn" title="Delete Task">&times;</button>
        `;

        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskCard.style.opacity = '0';
            setTimeout(() => {
                taskCard.remove();
                updateCounts();
            }, 200); // Wait for fade out
        });

        addDragEventsToTask(taskCard);
        todoList.appendChild(taskCard);
        updateCounts();
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            createTask(text);
            taskInput.value = ''; 
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    function addDragEventsToTask(task) {
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
            updateCounts(); // Update counts when drop finishes
        });
    }

    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            list.classList.add('drag-over');
            const draggedTask = document.querySelector('.dragging');
            if (draggedTask) {
                list.appendChild(draggedTask);
            }
        });

        list.addEventListener('dragleave', () => {
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', () => {
            list.classList.remove('drag-over');
        });
    });
});
