// JavaScript source code
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

    // Create a task list item
    const createTaskElement = (text, completed = false) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", completed);
        
        const taskText = document.createElement("span");
        taskText.textContent = text;
        taskText.addEventListener("click", () => toggleTaskCompletion(li, text));
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => deleteTask(li, text));

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add new task
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText);
            saveTask(taskText);
            taskInput.value = "";
        }
    });

    // Toggle task completion
    const toggleTaskCompletion = (taskElement, text) => {
        taskElement.classList.toggle("completed");
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.findIndex(task => task.text === text);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Delete task
    const deleteTask = (taskElement, text) => {
        taskElement.remove();
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = tasks.filter(task => task.text !== text);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    };

    // Save task to localStorage
    const saveTask = (text) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: text, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Initial load of tasks
    loadTasks();
});
