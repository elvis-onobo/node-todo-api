var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email:{
        type: String,
        required:true,
        trim:true,
        minlength: 1
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