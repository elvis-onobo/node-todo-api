// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }, (err, client)=>{
        if (err) {
         return console.log(`${err.message} connection error`);
        }
        console.log('DB Connected!');
        const db = client.db('TodoApp');

        // db.collection('Todos')
        //     .find({_id: new ObjectID('5e6f367fabc46a1df0abd29c')})
        //     .toArray()
        //     .then((docs)=>{
        //         console.log('Todos:');
        //         console.log(JSON.stringify(docs), undefined, 2);
        // }, (err)=> {
        //     console.log('unable to fetch todos', err);
        // });

        db.collection('Todos')
            .find()
            .count()
            .then((count)=>{
                console.log(`Todos: ${count}`);
        }, (err)=> {
            console.log('unable to fetch todos', err);
        });
    });
