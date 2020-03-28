const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// create dummy data to use for GET route tests
const todos = [{
    _id: new ObjectID(),
    text: 'First todo'
},{
    _id: new ObjectID(),
    text: 'second todo'
}];

// delete all items in the DB before running our test
beforeEach((done)=>{
    // passing an empty object makes it delete everything from DB
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(() => done());
});

//describe method groups tests with similar routes/purposes
describe('POST /todos', ()=>{
    it('should create new todo', (done)=>{
        var text = "test todos";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                 // get all the todos from DB and test to assert the right todo was saved
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( e => done(e));
            });
    });

    it('should not create todo with invalid data body', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });
});

describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', ()=>{
    it('should get a todo based on its ID', (done)=>{
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[1].text)
            })
            .end(done)
    });

    it('shoudl return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should retutn 404 for non object IDs', (done)=>{
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);;
    });
});