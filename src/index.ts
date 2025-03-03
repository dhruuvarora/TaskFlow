// import {v4 as uuidV4} from 'uuid';

// console.log(uuidV4());

// type Task = {
//     id:string, 
//     title:string,
//     completed:boolean, 
//     createdAt:Date
//   }

// const list = document.querySelector<HTMLUListElement>("#list")
// const form = document.querySelector<HTMLFormElement>("#new-task-form")
// const input = document.querySelector<HTMLInputElement>("#new-task-title")

// form?.addEventListener("submit", e=>{
//   e.preventDefault()

//   if(input?.value == "" || input?.value == null) return

//   const newTask : Task = {
//     id:uuidV4(),
//     title:input.value,
//     completed:true,
//     createdAt: new Date()
//   }
//   addListItem(newTask)
//   input.value = ""
// })

// function addListItem(task : Task): boolean{
//   const item = document.createElement("li")
//   const label = document.createElement("label")
//   const checkbox = document.createElement("input")
//   checkbox.type = "checkbox"
//   checkbox.checked = task.completed
//   label.append(checkbox, task.title)
//   item.append(label)
//   list?.append(item)
//   return true
// }


// import { v4 as uuidV4 } from "uuid";

// type Task = {
//   id: string;
//   title: string;
//   completed: boolean;
//   createdAt: Date;
// };

// const list = document.querySelector<HTMLUListElement>("#list");
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
// const input = document.querySelector<HTMLInputElement>("#new-task-title");

// const tasks:Task[] = [] 
// // Log elements to ensure they're being selected correctly
// console.log("Form:", form);
// console.log("Input:", input);
// console.log("List:", list);

// form?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("Form submitted, page refresh prevented");

//   if (!input || input.value.trim() === "") return;

//   const newTask: Task = {
//     id: uuidV4(),
//     title: input.value.trim(),
//     completed: false, // Default to false
//     createdAt: new Date(),
//   };
//   tasks.push(newTask)

//   addListItem(newTask);
//   input.value = ""; // Clear input field
// });

// function addListItem(task: Task): void {
//   const item = document.createElement("li");
//   const label = document.createElement("label");
//   const checkbox = document.createElement("input");
//   checkbox.addEventListener("change", ()=>{
//     task.completed = checkbox.checked
//     saveTasks();
//   })
//   checkbox.type = "checkbox";
//   checkbox.checked = task.completed;
//   label.append(checkbox, task.title);
//   item.append(label);

//   list?.appendChild(item);
//   console.log("Task added:", task);
// }


// function saveTasks(){
//   localStorage.setItem("TASKS", JSON.stringify(tasks))
// }

// function loadTasks(){
//   return(localStorage.getItem("TASKS"))
// }

// import { v4 as uuidV4 } from "uuid";

// type Task = {
//   id: string;
//   title: string;
//   completed: boolean;
//   createdAt: string; // Store as string to avoid serialization issues
// };

// const list = document.querySelector<HTMLUListElement>("#list");
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
// const input = document.querySelector<HTMLInputElement>("#new-task-title");

// // Load tasks and render them on page load
// const tasks: Task[] = loadTasks();
// tasks.forEach(addListItem);

// form?.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (!input || input.value.trim() === "") return;

//   const newTask: Task = {
//     id: uuidV4(),
//     title: input.value.trim(),
//     completed: false,
//     createdAt: new Date().toISOString(), // Store as ISO string
//   };

//   tasks.push(newTask);
//   saveTasks();

//   addListItem(newTask);
//   input.value = ""; // Clear input field
// });

// function addListItem(task: Task): void {
//   const item = document.createElement("li");
//   item.classList.add("task-item"); // Add a class for styling

//   const label = document.createElement("label");
//   label.classList.add("task-label"); // Add class for styling

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.checked = task.completed;
//   checkbox.classList.add("task-checkbox"); // Add class for styling

//   checkbox.addEventListener("change", () => {
//     task.completed = checkbox.checked;
//     saveTasks();
//   });

//   label.append(checkbox, task.title);
//   item.append(label);
//   list?.appendChild(item);
// }

// // Save tasks to localStorage
// function saveTasks(): void {
//   localStorage.setItem("TASKS", JSON.stringify(tasks));
// }

// // Load tasks from localStorage
// function loadTasks(): Task[] {
//   const storedTasks = localStorage.getItem("TASKS");
//   return storedTasks ? JSON.parse(storedTasks) : [];
// }








import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  important: boolean;
};

// Ensure correct element types
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const todayFilter = document.querySelector<HTMLButtonElement>("#filter-today");
const importantFilter = document.querySelector<HTMLButtonElement>("#filter-important");

// Load tasks and render them on page load
let tasks: Task[] = loadTasks();
renderTasks(tasks);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input || input.value.trim() === "") return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    important: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks(tasks);
  input.value = ""; // Clear input field after submission
});

// Function to render all tasks
function renderTasks(filteredTasks: Task[]) {
  if (!list) return;
  list.innerHTML = ""; // Clear the list before rendering

  filteredTasks.forEach(addListItem);
}

// Function to add a task to the DOM
function addListItem(task: Task): void {
  const item = document.createElement("li");
  item.classList.add("task-item");

  const label = document.createElement("label");
  label.classList.add("task-label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.classList.add("task-checkbox");

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  // Star (Important) Button
  const starButton = document.createElement("button");
  starButton.innerHTML = task.important ? "⭐" : "☆";
  starButton.classList.add("star-button");

  starButton.addEventListener("click", () => {
    task.important = !task.important;
    saveTasks();
    renderTasks(tasks);
  });

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasks();
    renderTasks(tasks);
  });

  label.append(checkbox, document.createTextNode(task.title));
  item.append(label, starButton, deleteButton);
  list?.appendChild(item);
}

// Save tasks to localStorage
function saveTasks(): void {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("TASKS");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Filter by Today
todayFilter?.addEventListener("click", () => {
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt).toDateString();
    return taskDate === new Date().toDateString();
  });
  renderTasks(todayTasks);
});

// Filter by Important
importantFilter?.addEventListener("click", () => {
  const importantTasks = tasks.filter((task) => task.important);
  renderTasks(importantTasks);
});
