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

        // db.collection('Todos').deleteMany({text:"something to do"}).then((result)=>{
        //     console.log(result);
        // });

        // db.collection('Todos').deleteOne({text:"Something to do"}).then((result)=>{
        //     console.log(result);
        // });

        db.collection('Todos').findOneAndDelete({completed : false}).then((result)=>{
            console.log(result);
        });
    });
