const form = document.querySelector('#ToDo');
const taskinput = document.querySelector('#taskinput');
const taskslist = document.querySelector('#taskslist');
const emptylist = document.querySelector('#emptylist');
let tasks = [];

document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
  updateEmptyListState();
});

form.addEventListener('submit', addTask);

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskslist.innerHTML = '';
  
  if (tasks.length === 0) {
    taskslist.innerHTML = '<li id="emptylist"><div class="empty-list">Нет задач</div></li>';
    return;
  }
  
  tasks.forEach(task => {
    const cssClass = task.done ? 'task-text done' : 'task-text';
    const taskHTML = `
    <li id="${task.id}" class="listitem">
        <span class="${cssClass}">${task.text}</span> 
        <button class="done-btn">${task.done ? 'Не выполнено' : 'Выполнено'}</button>
        <button class="delete">Удалить</button>
        <button class="edit">Редактировать</button>
    </li>
    `;
    taskslist.insertAdjacentHTML('beforeend', taskHTML);
  });
}

function updateEmptyListState() {
  if (tasks.length === 0) {
    emptylist.classList.remove('none');
  } else {
    emptylist.classList.add('none');
  }
}

function addTask(event) {
  event.preventDefault();
  const taskText = taskinput.value.trim();
  
  if (!taskText) return;
  
  const newtask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  
  tasks.push(newtask);
  saveTasks();
  renderTasks();
  
  taskinput.value = '';
  taskinput.focus();
  updateEmptyListState();
}

taskslist.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete')) {
    deleteTask(event);
  } else if (event.target.classList.contains('done-btn')) {
    doneTask(event);
  } else if (event.target.classList.contains('edit')) {
    editTask(event);
  }
});

function deleteTask(event) {
  const taskId = parseInt(event.target.closest('.listitem').id);
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
  updateEmptyListState();
}

function doneTask(event) {
  const taskId = parseInt(event.target.closest('.listitem').id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    saveTasks();
    renderTasks();
  }
}

function editTask(event) {
  const listItem = event.target.closest('.listitem');
  const taskId = parseInt(listItem.id);
  const task = tasks.find(task => task.id === taskId);
  const taskSpan = listItem.querySelector('.task-text');

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = task.text;
  editInput.className = 'edit-input';

  taskSpan.replaceWith(editInput);
  editInput.focus();

  function saveEdit() {
    const newText = editInput.value.trim();
    if (newText && newText !== task.text) {
      task.text = newText;
      saveTasks();
    }
    renderTasks();
  }
  
  editInput.addEventListener('blur', saveEdit);
  editInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });
}