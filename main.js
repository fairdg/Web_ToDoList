const form = document.querySelector('#ToDo');
const taskinput = document.querySelector('#taskinput');
const taskslist = document.querySelector('#taskslist');
const emptylist = document.querySelector('#emptylist');
let tasks = [];
form.addEventListener('submit', addTask);

function addTask(event){
  taskslist.addEventListener('click', deleteTask);
  taskslist.addEventListener('click', doneTask);
  taskslist.addEventListener('click', editTask);
  event.preventDefault();
  const taskText = taskinput.value;
  newtask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newtask);
  const cssClass = newtask.done ? 'done' : '';
  const taskHTML = `
  <li id="${newtask.id}" class="listitem">
      <span class="${cssClass}">${newtask.text}</span> 
      <button class="done">Выполнено</button>
      <button class="delete">Удалить</button>
      <button class="edit">Редактировать</button>
  </li>
`
  
  taskslist.insertAdjacentHTML('beforeend', taskHTML);
  taskinput.value = '';
  taskinput.focus();
  if(taskslist.children.length > 1){
      emptylist.classList.add('none');
  }
  

  function deleteTask(event){
    if(event.target.classList.contains('delete')){
      event.target.parentElement.remove();
      if(taskslist.children.length === 1){
        emptylist.classList.remove('none');
      }
    }
  }
  function doneTask(event){
    if(event.target.classList.contains('done')){
      event.target.parentElement.classList.toggle('done');
    }
  }
  function editTask(event){
    if(event.target.classList.contains('edit')){
      console.log('edit');
    }
  }
}