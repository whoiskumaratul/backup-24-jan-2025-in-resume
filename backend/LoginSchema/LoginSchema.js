const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    
    userType: {
        type:String,
       // default:"user"//this is a select menu too
       default: 'user'
    },
    //role: { type: String, default: 'user' },

    email: {
        type: String,
        trim: true
    },
    pasword: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Users', LoginSchema)