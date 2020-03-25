var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',  {
        useUnifiedTopology : true,
        useNewUrlParser : true
    });

var Todo = mongoose.model('Todo', {
    text:{
        type: String
    },
    completed:{
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook Dinner'
});

newTodo.save().then((doc)=>{
    console.log('Todo Saved', doc);
}, (e)=>{
    console.log('Failed saving todo', e);
});