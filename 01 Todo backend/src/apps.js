const express = require('express');
const taskRouter = require('./routers/task.router');


const app = express();
app.use(express.json());
app.use('/api/tasks', taskRouter);

module.exports = app;   