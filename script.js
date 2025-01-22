document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create task list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        listItem.classList.add("task-item");

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        
        // Remove task when button is clicked
        removeButton.addEventListener("click", function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        });

        // Append button to list item, then list item to list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Event listeners
    addButton.addEventListener("click", () => addTask(taskInput.value));
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks on page load
    loadTasks();
});
