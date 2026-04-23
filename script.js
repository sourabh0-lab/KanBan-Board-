document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const taskLists = document.querySelectorAll('.task-list');

    // 1. Function to create a new task element
    function createTask(taskText) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task');
        taskCard.setAttribute('draggable', 'true');

        taskCard.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn" title="Delete Task">&times;</button>
        `;

        // Handle deleting the task
        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskCard.remove();
        });

        // Add Drag and Drop event listeners to the new task
        addDragEventsToTask(taskCard);

        // Append to the "To Do" column by default
        todoList.appendChild(taskCard);
    }

    // 2. Handle Add Task Button Click
    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            createTask(text);
            taskInput.value = ''; // Clear input field
        }
    });

    // Handle pressing "Enter" key in the input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // 3. Drag and Drop Logic for Tasks
    function addDragEventsToTask(task) {
        task.addEventListener('dragstart', () => {
            // Add a class to identify which element is being dragged
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', () => {
            // Remove the class when dropping is finished
            task.classList.remove('dragging');
        });
    }

    // 4. Setup Drop Zones for the Columns
    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            // Prevent default to allow dropping
            e.preventDefault();
            list.classList.add('drag-over');
            
            // Find the element currently being dragged
            const draggedTask = document.querySelector('.dragging');
            
            // Append it to the list we are hovering over
            if (draggedTask) {
                list.appendChild(draggedTask);
            }
        });

        list.addEventListener('dragleave', () => {
            // Remove visual feedback when leaving the column
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', () => {
            // Remove visual feedback when item is dropped
            list.classList.remove('drag-over');
        });
    });
});
