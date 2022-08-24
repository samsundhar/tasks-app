const express = require('express');
const cors = require('cors');
const app = express(),
    bodyParser = require("body-parser");
port = 3080;
var tasks = [];

app.use(bodyParser.json());
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
// app.use(cors());

app.get('/api/tasks', (req, res) => {
    res.status(200).send(
        {
            data: tasks
        }
    );
});

app.post('/api/task', (req, res) => {
    console.log(req.body);
    var task = req.body.task;
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
app.delete('/api/task/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    tasks = tasks.filter(x => x.id != id);
    res.status(200).send(
        {
            message: "task deleted",
            data: tasks
        }
    );
});
app.put('/api/task/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    var task = req.body.task;
    let obj = tasks[tasks.findIndex(x => x.id == id)]
    let index = tasks.indexOf(obj);
    console.log(index)
    tasks[index] = task;
    console.log(tasks)
    res.status(200).send(
        {
            message: "task updated",
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