const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// create dummy data to use for GET route tests
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
        _id: userOneId,
        email: "rapknowlogy@gmail.com",
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, '123abc').toString()
        }]
    },{
        _id: userTwoId,
        email: "rapper@gmail.com",
        password: 'userTwoPass',
    }];

const todos = [{
    _id: new ObjectID(),
    text: 'First todo'
},{
    _id: new ObjectID(),
    text: 'second todo',
    completed: true,
    completedAt: 3256
}];

const populateTodos = (done)=>{
    // passing an empty object makes it delete everything from DB
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done)=>{
    User.deleteMany({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        // Promise.all() make sure all the promises it takes resolve
        return Promise.all([userOne, userTwo])
    }).then(()=>done());
};

module.exports = {todos, populateTodos, users, populateUsers};