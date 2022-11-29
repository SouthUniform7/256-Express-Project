var createError = require("http-errors");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var app = express();

var port = 3001;

// view engine setup

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "jade");

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/build/",
  express.static(path.join(__dirname, "node_modules/three/build"))
);

app.use(
  "/jsm/",
  express.static(path.join(__dirname, "node_modules/three/examples/jsm"))
);

var movies = require("./public/db/movieList.json");

app.get("/getList", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(movies));
});

app.post("/setRating", function (req, res) {
  //  trips[req.body.idx].rating = req.body.rating;

  for (let i = 0; i < trips.length; i++) {
    if (movies[i].title === req.body.name) {
      movies[i].rating = req.body.rating;

      break;
    }
  }

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(movies));
});

//var addresses = require("./public/db/locations.json");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//ADDRESSES SECTION

app.get("/getAddress", function (req, res) {
  res.setHeader("Content-Type", "application/json");


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("locationsDB");
    dbo.collection("locations").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
      db.close();
    });
  });

  //res.end(JSON.stringify(addresses));
});

app.post("/setAddress", function (req, res) {
  //  trips[req.body.idx].rating = req.body.rating;

  res.setHeader("Content-Type", "application/json");

  var myobj = { username: req.body.username, address: req.body.address, line2: req.body.line2, city: req.body.city, state: req.body.state, zip: req.body.zip };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("locationsDB");
    
    dbo.collection("locations").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted", req.body.username, ",", req.body.address);
      db.close();
    });
  }); 


  //res.end(JSON.stringify(addresses));
});


//COLOR PICKER SECTION

app.get("/getColors", function (req, res) {
  res.setHeader("Content-Type", "application/json");


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("locationsDB");
    dbo.collection("colors").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
      db.close();
    });
  });

  //res.end(JSON.stringify(addresses));
});

app.post("/setColors", function (req, res) {
  //  trips[req.body.idx].rating = req.body.rating;

  res.setHeader("Content-Type", "application/json");

  var myobj = { username: req.body.username, color: req.body.color };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("locationsDB");
    
    dbo.collection("colors").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted", req.body.username, ",", req.body.color);
      db.close();
    });
  }); 


  //res.end(JSON.stringify(addresses));
});


//RESULTS SECTION

app.get("/getResults", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection('locations').aggregate([
      { $lookup:
         {
           from: 'colors',
           localField: 'color',
           foreignField: 'username',
           as: 'colorname'
         }
       }
      ]).toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      db.close();
    });
  });
  
});

app.use("/", indexRouter);

app.use("/users", usersRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.status(err.status || 500);

  res.render("error");
});

module.exports = app;
