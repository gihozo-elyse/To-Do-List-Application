const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const filterCategory = document.getElementById("filterCategory");

let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];




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

      // ✅ Left side: text + labels
      const left = document.createElement("div");
      left.className = "flex items-center gap-3";

      const span = document.createElement("span");
      span.textContent = task.text;
      span.className =
        "font-medium " +
        (task.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100");

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

      left.appendChild(span);
      left.appendChild(labels);

      
      const actions = document.createElement("div");
      actions.className = "flex gap-2";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.className =
        "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className =
        "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded";

      completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      
      li.appendChild(left);
      li.appendChild(actions);

      taskList.appendChild(li);
    });
}


addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text,
    completed: false,
    category: categoryInput.value,
    priority: priorityInput.value,
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
});


searchInput.addEventListener("input", renderTasks);
filterCategory.addEventListener("change", renderTasks);


renderTasks();

