var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const post = process.env.PORT || 3000;
// body-parser takes the json we send and converts it to an object
app.use(bodyParser.json());

// post a todo
app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});

// get all todos
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

module.exports = {app};