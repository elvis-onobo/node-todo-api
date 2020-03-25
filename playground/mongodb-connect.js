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

        // insert to DB
        db.collection('Todos').insertOne({
            text : 'Something to do',
            completed : false
        }, (err, result)=>{
            if(err){
                return console.log('Unable to insert Todo', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        });

        // client.close prevents insertions???
        // client.close();

        db.collection('Users').insertOne({
            name: 'Elvis Onobo',
            age: 30,
            location: 'Lagos'
        }, (err, result)=>{
            if (err) {
                return console.log('Unable to insert User', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        })
    });



    // .then(()=> console.log('DB Connected!'),
    //     db.collection('Todos').insertOne({

    //     });
    //     )
    // .catch(err => {
    //     console.log(`${err.message} connection error`)
    // });

    // close connection to mongoDB
    // db.close();