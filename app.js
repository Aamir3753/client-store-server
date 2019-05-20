var createError = require("http-errors");
var express = require("express");
var config = require("./config");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mailSender = require("./mailSender");
var appRouter = require("./routes/appsRouter");
var {pushNotificationRouter,sendNotification} = require("./routes/pushNotificationRouter")


// Db connection
mongoose.connect(config.dbUrl, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);
  console.log("DB connected");
});


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/apps",appRouter);
app.use("/subscribe",pushNotificationRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err)
});

module.exports = app;
