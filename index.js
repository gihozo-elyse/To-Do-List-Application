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