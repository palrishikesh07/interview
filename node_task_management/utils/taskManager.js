const { readTasks, writeTasks } = require("./fileHandler");

//  Get all tasks
async function getAllTasks() {
    return await readTasks();
}

//Get task by ID
async function getTaskById(id){
    const tasks = await readTasks();
    return tasks.find(task => task.id == parent(id))
}

// Add new task

async function  addTask(title) {
    const tasks = await readTasks();
    const newTask = {
        id:tasks.length>0 ? tasks[tasks.length-1].id+1 : 1,
        title,
        description,
        completed:false,
        createdAt:new Date().toISOString()
    }

    tasks.push(newTask);
    await writeTasks(tasks);
    return newTask;
}

// Update task

async function updateTask(id,updates){
    const tasks = await readTasks();
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if(index === -1){
        return null;
    }

    tasks[index] ={...tasks[index],...updateTask};
    await writeTasks(tasks);
    return tasks[index];
}

// Delete

async function delteTask(id) {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter(task=>task.id!==parseInt(id))
    if(tasks.length == filteredTasks.length){
        return false;
    }
    await writeTasks(filteredTasks);
    return true;
}

module.exports={
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    delteTask
}