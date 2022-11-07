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

var trips = require("./public/db/movieList.json");


app.get("/getList", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(trips));
});

app.post("/setRating", function (req, res) {
  //  trips[req.body.idx].rating = req.body.rating;

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].title === req.body.name) {
      trips[i].rating = req.body.rating;

      break;
    }
  }

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(trips));
});

var addresses = require("./public/db/locations.json");

app.get("/getAddress", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(addresses));
});

app.post("/setAddress", function (req, res) {
  //  trips[req.body.idx].rating = req.body.rating;

  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].username === req.body.username) {
      addresses[i].address = req.body.address;
      addresses[i].line2 = req.body.line2;
      addresses[i].city = req.body.city;
      addresses[i].state = req.body.state;
      addresses[i].zip = req.body.zip;

      break;
    }
  }

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(addresses));
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
