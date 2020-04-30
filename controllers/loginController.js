const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { Login } = require('../model/login');
var { Data } = require('../model/mongo');
const secret = 'mysecretsshhh';

module.exports.register = (req,res,next) => {
var userIn = new Login();
userIn.empid = req.body.empid;
userIn.email = req.body.email;
userIn.name = req.body.name;
userIn.role = req.body.role;
userIn.password = req.body.password;
  userIn.save((err, docs) => {
    if (!err) {
      var compData = new Data();
      compData.Emp_Id = req.body.empid;
      compData.Emp_Name = req.body.name;
      compData.Role = req.body.role;
      compData.Email = req.body.email;

      compData.save((err, docs) => {
        if (err) {

               res.status(422).send(err.errmsg);
             }

      });
      res.send(docs);
    } else {
       if(err.code == 11000) {
         if(err.message.includes('empid')) {
           res.status(422).send(['Duplicate Employee Id found']);
         }
         else {
           res.status(422).send(err.errmsg);
         }
       }
       else {
          return next(err);
       }
    }
  });


}


module.exports.validate = (req, res) => {
  const { empid, password } = req.body;
  Login.findOne({ empid }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect employee id or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect employee id or password'
          });
        } else {
          // Issue token
          const payload = { empid };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
}
