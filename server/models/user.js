const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    email:{
        type: String,
        required:true,
        trim:true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        },
        password:{
            type:String,
            required: true,
            minlength: 6
        },
        tokens:[{
            access:{
                type:String,
                required:true
            },
            token:{
                type:String,
                required:true
            }
        }]
    }
});

// var newUser = new User({
//     email: 'el@email.com'
// });

// newUser.save().then((doc)=>{
//     console.log('User saved:', doc);
// }, (e)=>{
//     console.log('Failed to save user:', e);
// });

module.exports = {User};