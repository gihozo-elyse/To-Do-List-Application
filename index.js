const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const filterCategory = document.getElementById("filterCategory");

let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;



function applyDarkMode() {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.documentElement.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("darkMode", darkMode);
}
themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  applyDarkMode();
});
applyDarkMode();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = filterCategory.value;

  taskList.innerHTML = "";

  tasks
    .filter(
      (task) =>
        task.text.toLowerCase().includes(searchText) &&
        (selectedCategory === "All" || task.category === selectedCategory)
    )
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg";

      
      const span = document.createElement("span");
      span.textContent = task.text;
      span.className =
        "flex-grow cursor-pointer " +
        (task.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100");

      span.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.text;
        input.className = "flex-grow px-2 py-1 rounded";
        li.replaceChild(input, span);

        input.addEventListener("blur", () => {
          task.text = input.value.trim();
          saveTasks();
          renderTasks();
        });
        input.focus();
      });

      
      const labels = document.createElement("div");
      labels.className = "flex gap-2 text-xs";
      labels.innerHTML = `
        <span class="px-2 py-1 rounded bg-blue-200 dark:bg-blue-400">${task.category}</span>
        <span class="px-2 py-1 rounded ${
          task.priority === "High"
            ? "bg-red-300 dark:bg-red-500"
            : task.priority === "Medium"
            ? "bg-yellow-300 dark:bg-yellow-500"
            : "bg-green-300 dark:bg-green-500"
        }">${task.priority}</span>
      `;

    
      const actions = document.createElement("div");
      actions.className = "flex gap-2 ml-2";
      actions.innerHTML = `
        <button class="text-purple-600">✔</button>
        <button class="text-red-500">✖</button>
      `;

      
      actions.children[0].addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });


      actions.children[1].addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(span);
      li.appendChild(labels);
      li.appendChild(actions);

      taskList.appendChild(li);
    });
}
