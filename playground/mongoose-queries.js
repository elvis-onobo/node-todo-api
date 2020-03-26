const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5e7c8a08a0fbd20114f0b027';
var user_id = '5e7c9533860389100c0faf0d';

if (!ObjectID.isValid(id)) {
    console.log('Invalid ID');
}

User.findById(user_id).then((user)=>{
    if (!user) {
        return console.log('User does not exist');
    }
    console.log('User found:', user);
}).catch( e => console.log(e));

// returns all items in the collection matching the query
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// returns the first item matching the query
// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo:', todo);
// });


// Todo.findById(id).then((todo)=>{
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e)=>{
//     console.log(e);
// });
