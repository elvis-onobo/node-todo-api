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

        // db.collection('Todos').findOneAndUpdate({
        //     _id: new ObjectID('5e7b852ae2bf822224b14068')
        // }, {
        //     $set:{
        //         completed:true
        //     }
        // }, {
        //     returnOriginal:false
        // }).then((result)=>{
        //         console.log(result);
        // });

        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5e7b68006e4ef81c2c7c4084')
        }, {
            $set:{
                name : 'Faith Onobo'
            },
            $inc:{
                age: 1
            }
        }, {
            returnOriginal:false
        }).then((result)=>{
                console.log(result);
        })

    });
