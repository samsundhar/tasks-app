const express = require('express');
const app = express(),
    bodyParser = require("body-parser");
port = 3080;

const tasks = [];

app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
    res.status(200).send(
        {
            data: tasks
        }
    );
});

app.post('/api/task', (req, res) => {
    console.log(req.body);
    const task = req.body.task;
    console.log(task)
    tasks.push(task);
    // console.log(tasks)
    res.status(200).send(
        {
            message: "task added",
            data: tasks
        }
    );
});

app.get('/api', (req, res) => {
    res.status(200).send({ res: 'App Works !!!!' });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});