let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">"${task.text}"</label>
        <img src="assets/delete.png" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for(let i=0; i<tasks.length ; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter((task) => task.id == taskId);

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled sucessfully');
        return;
    }

    showNotification('Could not toggle task');
}

function deleteTask (taskId) {
    const newTask = tasks.filter((task) => task.id !== taskId)

    tasks = newTask;
    renderList();
    showNotification('Task deleted sucessfully');
}

function addTask (task) {
    if(task) {
        tasks.push(task);
        renderList();
        showNotification('Task added sucessfully');
        return;
    }

    showNotification('Task cannnot be added');
}

function showNotification (text) {
    alert(text);
}

function handleInputKeyPress (e) {
    if(e.key == 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }
        // console.log(text);

        const task = {
            text,
            id: Date.now().toString(),
            done: false,
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickEvent(e){
    const target = e.target;

    if(target.className == 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className == 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


function intializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickEvent);
}

intializeApp();