const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// delete all items in the DB before running our test
beforeEach((done)=>{
    // passing an empty object makes it delete everything from DB
    Todo.deleteMany({}).then(()=>done());
});

// describe method groups tests with similar routes/purposes
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
                Todo.find().then((todos)=>{
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});