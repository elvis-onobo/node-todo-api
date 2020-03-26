var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then((doc)=>{
//     console.log('Todo Saved', doc);
// }, (e)=>{
//     console.log('Failed saving todo', e);
// });

module.exports = {Todo};