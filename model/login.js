const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema ({
  email : {
  type: String,
  required: 'Email cannot be empty'
},
  name : {
  type: String,
  required:'Name cannot be empty'
},
  empid :{
  type: String,
  required: 'Employee Id cannot be empty',
  unique : true
},
  role :{
  type: String,
  required: 'Role must be selected'
},
  password : {
  type: String,
  required: 'password cannot be empty',
  minlength : [4,'Password must be atleast 4 character long']
},
  saltSecret : {
  type: String
},
});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail address found.');

userSchema.pre('save', function(next) {
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        this.saltSecret = salt;
        next();
      });
   });
});

userSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

var Login = mongoose.model('userLogin', userSchema);
module.exports = { Login };
