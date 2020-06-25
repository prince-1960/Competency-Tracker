const mongoose    =   require("mongoose");
//c.connect('mongodb://localhost:27017/testqwe');
//const mongo = require('mongodb').MongoClient
//var MongoClient = require('mongodb').MongoClient;

// MongoDB Databse url
//var mongoDatabase = 'mongodb://localhost:27017/tt';

//Use below URL while connecting to local mongodb shell
var mongoDatabase = 'mongodb+srv://ninjateam3:Tcs2020@clusters-32czz.gcp.mongodb.net/ninjateam3db?retryWrites=true&w=majority';

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected to : ' + mongoDatabase) },
    err => { console.log('There is problem while connecting database ' + err) }
    );

    // create schema
var mongoSchema =   mongoose.Schema;
    var SchemaS  = new mongoSchema({
        Emp_Id: String,
        Email: String,
        Emp_Name: String,
        Role: String,
        Competency:[{"Tech": String,"Level": String}]
    });

    // create model if not exists.

    var Data = mongoose.model('users',SchemaS);
    module.exports = { Data }
