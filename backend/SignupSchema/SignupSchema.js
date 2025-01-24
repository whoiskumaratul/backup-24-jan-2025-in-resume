const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // For signup
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Optional: Additional user details
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', SignupSchema); // Single model for both signup and login
// const SignupSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//     },
//     email: {
//         type: String,
//         trim: true,
//     },

//     password: {
//         type:String,
//         trim:true
//     }
// })


// module.exports = mongoose.model('Users', SignupSchema )