var express = require("express");
var app = express();
const path = require("path");
var bodyParser = require("body-parser");
var router = express.Router();
var { Data } = require("./model/mongo");
const cors = require('cors');
var ObjectId = require('mongodb').ObjectId
//var evalidator  = require("express-validator")
const cookieParser = require('cookie-parser');
const {
    valid
} = require('./middleware');
const rtsIndex = require('./routes/index.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));
app.use(cors());
app.use(cookieParser());
app.use('/api', rtsIndex);

app.use(express.static(path.join(__dirname, "/client/build")));

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.get("/", function(req, res) {
    res.json({
        "error": false,
        "message": "Enter correct URL"
    });
});


router.route('/addU').post((req, res) => {
  var compData = new Data();
  compData.Emp_Id = req.body.empid;
  compData.Emp_Name = req.body.name;
  compData.Role = req.body.role;
  compData.Email = req.body.email;


  compData.save()
  .then(() => res.json('User C added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



app.get('/Employee', function(req, res, next){
    //.get(function(req, res) {
        response = {};
        Data.find({}, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else
            {
                response = {
                    "error": false,
                   "message": data
                };
            }
            res.json(response);
        });
    });

//Get count for developer role
    app.get("/Detail/dev",function(req, res){
    Data.aggregate([{
            $match: {
                Role: "Developer"
            }
        },
        {
            $unwind: "$Competency"
        },
        {
            $project: {
                Role: 1,
                E0: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E0"]
                    }, 1, 0]
                },
                E1: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E1"]
                    }, 1, 0]
                },
                E2: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E2"]
                    }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: "$Role",
                E0: {
                    $sum: "$E0"
                },
                E1: {
                    $sum: "$E1"
                },
                E2: {
                    $sum: "$E2"
                }
            }
        }, {
            $project: {
                E0: {
                    $toString: "$E0"
                },
                E1: {
                    $toString: "$E1"
                },
                E2: {
                    $toString: "$E2"
                }
            }
        }

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});


    //Get count for Techlead role
    app.get("/Detail/techlead",function(req, res){
    Data.aggregate([{
            $match: {
                Role: "TechLead"
            }
        },
        {
            $unwind: "$Competency"
        },
        {
            $project: {
                Role: 1,
                E0: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E0"]
                    }, 1, 0]
                },
                E1: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E1"]
                    }, 1, 0]
                },
                E2: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E2"]
                    }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: "$Role",
                E0: {
                    $sum: "$E0"
                },
                E1: {
                    $sum: "$E1"
                },
                E2: {
                    $sum: "$E2"
                }
            }
        }, {
            $project: {
                E0: {
                    $toString: "$E0"
                },
                E1: {
                    $toString: "$E1"
                },
                E2: {
                    $toString: "$E2"
                }
            }
        }

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});


app.get("/Count/:id",function(req, res){
  Empid = req.params.id;
Data.aggregate([{
        $match: {
            Emp_Id: Empid
        }
    },
    {
        $unwind: "$Competency"
    },
    {
        $project: {
            Role: 1,
            E0: {
                $cond: [{
                    $eq: ["$Competency.Level", "E0"]
                }, 1, 0]
            },
            E1: {
                $cond: [{
                    $eq: ["$Competency.Level", "E1"]
                }, 1, 0]
            },
            E2: {
                $cond: [{
                    $eq: ["$Competency.Level", "E2"]
                }, 1, 0]
            }
        }
    },
    {
        $group: {
            _id: "$Role",
            E0: {
                $sum: "$E0"
            },
            E1: {
                $sum: "$E1"
            },
            E2: {
                $sum: "$E2"
            }
        }
    }, {
        $project: {
            E0: {
                $toString: "$E0"
            },
            E1: {
                $toString: "$E1"
            },
            E2: {
                $toString: "$E2"
            }
        }
    }

], function(err, result) {

    if (err) {
        res.send(err)
    } else {
        res.json(result)
    }

})


});

//Adding data for Pie Chart
app.get("/Detail/DevE0",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E0'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E0'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

app.get("/Detail/DevE1",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E1'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E1'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

app.get("/Detail/DevE2",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E2'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E2'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

app.get("/Detail/TechLeadE0",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E0'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E0'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});


app.get("/Detail/TechLeadE1",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E1'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E1'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

app.get("/Detail/TechLeadE2",function(req, res) {
    Data.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E2'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E2'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }


    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

app.post('/Add/:id', function(req, res, next){
    //var tech = req.params.id;
    var Eid = req.params.id;
    //var o_id = new ObjectId(Eid);

        //users.update({ "_id": o_id },
        Data.update({ Emp_Id: Eid },
            {      $push: { Competency: { "Tech" : req.body.Tech, "Level" : req.body.Level } } } ,{upsert : true}
          , function(err, result) {
            if (err) {
                res.json(err);
            } else {

                res.json(result);

            }
          });

    })


    //EDIT Working
        app.post('/update/:id', function(req, res, next){
            var Empid = req.params.id;
            //var Tech = "DS00011";
            //var o_id = new ObjectId(id);

                Data.update(    { Emp_Id:Empid, "Competency.Tech":req.body.Tech },
                    {      $set: {  "Competency.$.Level": req.body.Level } }

                  , function(err, result) {
                    if (err) {
                        res.json(err);
                    } else {

                        res.json(result);

                    }
                  });

            })

//Get data
//app.get('/fetchdataById/?id', function(req, res, next) {
     // var Empid = req.query.id;
     //app.get('/fetchdataById/:id', function(req, res, next) {
    router.route('/fetchdataById/:id').get(function(req, res){
    var Empid = req.params.id;
       Data.findOne({Emp_Id: Empid},function(err, data){
        if(err){
            res.send(err);
        }
        else{
        res.send(data);
        }
    })
})

//app.get(/fetchdataById/:id', function(req, res, next) {
    //var Empid = req.params.id;

/*
//Once Fetched edit it
app.post('/edit', function(req, res, next){
    MongoClient.connect(dburl, function(err, db) {

      var Tech = req.body.Tech;
      var Level = req.body.Level;

      Data.update({'Tech':new mongodb.ObjectID(req.body.id)},
      { $set: {'product_name': product_name, 'price': price, 'category': category } }, function(err, result) {
        if(err) { throw err; }

        db.close();

        res.redirect('/');
      });
    });
  });
*/

app.use('/', router);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(8080);
console.log("Listening to PORT 8080");
