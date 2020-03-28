const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// will delete all todos in the collection
/*Todo.deleteMany({}).then((result)=>{
    console.log(result);
});*/

 Todo.findByIdAndRemove('5e7ee52069af5e194478abae').then((doc)=>{
    console.log(doc);
});

/* Todo.findOneAndDelete(id).the((doc)=>{
    console.log(doc);
});*/