var express = require("express");
var router = express.Router();
var students = require("../models/students");
var teachers = require("../models/teachers");
var authenticate = require("../authenticate");

router.route("/").get(authenticate.verifyUser, (req, res, next) => {
  if (req.user.role === "student") {
    students.findOne({ cnic: req.user.cnic }, (err, student) => {
      if (err) return next(err);
      if (!student) {
        res.setHeader("content-type", "application/json");
        res.statusCode = 404;
        res.json({ sucess: false, message: "Student Record Not found" });
        return;
      }
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.json({ sucess: true, student });
      return;
    });
    return ;
  } else if (req.user.role === "teacher") {
    teachers.findOne({ cnic: req.user.cnic }, (err, teacher) => {
      if (err) return next(err);
      if (!teacher) {
        res.setHeader("content-type", "application/json");
        res.statusCode = 404;
        res.json({ sucess: false, message: "Teacher Record Not found" });
        return;
      }
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.json({ sucess: true, teacher });
    });
    return ; 
  } else if (req.user.role === "admin") {
    return;
  }
  res.statusCode = 404;
  res.setHeader("content-type", "application/json");
  res.json({ sucess: false, message: "Student Record Not found" });
});
module.exports = router;
