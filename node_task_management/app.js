const http = require("http");

const url = require("url");

const taskManger = require("./utils/taskManager");

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.path;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // handle preflight
    if (method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }



    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        // GET /api/tasks - Get all tasks
        if (method === 'GET' && pathname === '/api/tasks') {
            const tasks = await taskManager.getAllTasks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks));
        }

        // GET /api/tasks/:id - Get single task
        else if (method === 'GET' && pathname.startsWith('/api/tasks/')) {
            const id = pathname.split('/')[3];
            const task = await taskManager.getTaskById(id);

            if (task) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(task));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Task not found' }));
            }
        }

        // POST /api/tasks - Create new task
        else if (method === 'POST' && pathname === '/api/tasks') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { title, description } = JSON.parse(body);

                if (!title) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Title is required' }));
                    return;
                }

                const newTask = await taskManager.addTask(title, description || '');
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newTask));
            });
        }

        // PUT /api/tasks/:id - Update task
        else if (method === 'PUT' && pathname.startsWith('/api/tasks/')) {
            const id = pathname.split('/')[3];
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const updates = JSON.parse(body);
                const updatedTask = await taskManager.updateTask(id, updates);

                if (updatedTask) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedTask));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Task not found' }));
                }
            });
        }

        // DELETE /api/tasks/:id - Delete task
        else if (method === 'DELETE' && pathname.startsWith('/api/tasks/')) {
            const id = pathname.split('/')[3];
            const deleted = await taskManager.deleteTask(id);

            if (deleted) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Task deleted successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Task not found' }));
            }
        }

        // Home route
        else if (method === 'GET' && pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Task Manager API</h1><p>Use /api/tasks to manage tasks</p>');
        }

        // 404
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }

    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ Task Manager API running at http://localhost:${PORT}`);
    console.log(`📝 API Endpoints:`);
    console.log(`   GET    /api/tasks       - Get all tasks`);
    console.log(`   GET    /api/tasks/:id   - Get single task`);
    console.log(`   POST   /api/tasks       - Create new task`);
    console.log(`   PUT    /api/tasks/:id   - Update task`);
    console.log(`   DELETE /api/tasks/:id   - Delete task`);
});
