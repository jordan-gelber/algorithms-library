var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ALGORITHMS_COLLECTION = "algorithms";

const path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/algorithms-library'));

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.DB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/algorithms"
 *    GET: get all algorithms
 *    POST: creates a new algorithm
 */

 app.get("/api/algorithms", function(req, res) {
   var query = {};
   if (req.query.group) {
     query.group = req.query.group;
   }
   if (req.query.title) {
     query.title = {
       $regex: req.query.title,
       $options: 'i',
     };
   }
   db.collection(ALGORITHMS_COLLECTION).find(query).toArray(function(err, docs) {
     if (err) {
       handleError(res, err.message, "Failed to get algorithms.");
     } else {
       res.status(200).json(docs);
     }
   });
 });

app.post("/api/algorithms", function(req, res) {
 var newAlgorithm = req.body;
 newAlgorithm.createDate = new Date();

 if (!req.body.name) {
   handleError(res, "Invalid user input", "Must provide a name.", 400);
 } else {
   db.collection(ALGORITHMS_COLLECTION).insertOne(newAlgorithm, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to create new algorithm.");
     } else {
       res.status(201).json(doc.ops[0]);
     }
   });
 }
});

/*  "/api/algorithms/:id"
*    GET: find algorithm by name
*/

app.get("/api/algorithms/:name", function(req, res) {
  db.collection(ALGORITHMS_COLLECTION).findOne({ name: req.params.name }, function(err, doc) {
    if (err) { handleError(res, err.message, "Failed to get algorithm");
    } else { res.status(200).json(doc); }
  });
});

/*  "/api/algorithms/:id"
 *    GET: find algorithm by id
 *    PUT: update algorithm by id
 *    DELETE: deletes algorithm by id
 */

app.get("/api/algorithms/:id", function(req, res) {
 db.collection(ALGORITHMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
   if (err) { handleError(res, err.message, "Failed to get algorithm");
   } else { res.status(200).json(doc); }
 });
});

app.put("/api/algorithms/:id", function(req, res) {
 var updateDoc = req.body;
 delete updateDoc._id;

 db.collection(ALGORITHMS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
   if (err) { handleError(res, err.message, "Failed to update algorithm");
   } else {
     updateDoc._id = req.params.id;
     res.status(200).json(updateDoc);
   }
 });
});

app.delete("/api/algorithms/:id", function(req, res) {
 db.collection(ALGORITHMS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
   if (err) {
     handleError(res, err.message, "Failed to delete algorithm");
   } else {
     res.status(200).json(req.params.id);
   }
 });
});

app.get('*', function(req,res) {
 res.sendFile(path.join(__dirname + '/dist/algorithms-library/index.html'));
});
