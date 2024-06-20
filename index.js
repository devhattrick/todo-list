const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3300;
const app = express();

app.use(bodyParser.json());

//Storage
let todos = [];
let numberID = 1;

// Add todo list
app.post('/todos', (req, res) => {
    console.log("Req", req.body)
    const todo = {
        id: numberID++,
        data: req.body,
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// Get all todo list
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// Get todo list by id
app.get('/todos/:id', (req, res) => {
    const todo = todos.at(parseInt(req.params.id));
    if (!todo) return res.status(404).json({
        message: 'Todo not found'
    });
    res.status(200).json(todo.data);
});

// Edit todo list by id
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    console.log('Todo Before', todo);
    if (!todo) return res.status(404).json({
        message: 'Todo not found'
    });
    todo.data.text = req.body.text !== undefined ? req.body.text : todo.text;
    console.log('Todo After:', todo);
    res.status(200).json(todo);
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
    //const index = todos.at(parseInt(req.params.id));
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({
        message: 'Todo not found'
    });

    todos.splice(index, 1);
    res.json({
        message: `Todo ID ${req.params.id} is deleted`,
        ...todos
    });
})

app.listen(port, () => {
    console.log(`=====> Service Start <=====`);
    console.log(`API URL : http://localhost:${port}/todos`);
});