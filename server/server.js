var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

// body-parser takes the json we send and converts it to an object
app.use(bodyParser.json());

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

app.listen(3000, ()=>{
    console.log('Server started');
});