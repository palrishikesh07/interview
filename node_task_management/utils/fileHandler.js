const fs = require("fs").promises;
const path =require("path");

const DATA_FILE = path.join(__dirname,'..','data','tasks.json');

console.log("DATA_FILE: ",DATA_FILE)
// Ensure data directory exists

async function ensureDataDir() {
    const dataDir = path.join(__dirname,'..','data');
    console.log("dataDir: ",dataDir)
    try {
        await fs.access(dataDir);
    } catch (error) {
        await fs.mkdir(dataDir);
    }
}

// Read task from file
async function readTasks() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE,'utf-8');
        return JSON.parse(data)
    } catch (error) {
        console.log(error);
    }
}

async function writeTasks(tasks) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE,JSON.stringify(tasks,null,2));
}

module.exports={
    readTasks,
    writeTasks
}