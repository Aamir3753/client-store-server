var express = require("express");
var router = express.Router();
var students = require("../models/students");
var Users = require("../models/user");
var authenticate = require("../authenticate");
var students = require("../models/students");

router.route("/").post((req, res, next) => {
  const { firstName, lastName, password, email, cnic, enrollNo } = req.body;
  students.create({ firstName, lastName, cnic, enrollNo }, (err, student) => {
    if (err) return next(err);
    Users.register(
      new Users({ username: email, role: "student", cnic }),
      password,
      (err, user) => {
        if (err) return next(err);
        user.save(err => {
          if (err) return next(err);
          res.setHeader("content-type", "application/json");
          res.statusCode = 200;
          res.json({
            success: true,
            message: "Student Created Successfully",
            student
          });
        });
      }
    );
  });
});

router.route("/attendance").post(authenticate.verifyUser, (req, res, next) => {
  students.findOne({ cnic: req.user.cnic }, (err, std) => {
    if (err) return next(err);
    if (!std) {
      res.setHeader("content-type", "application/json");
      res.statusCode = 404;
      res.json({ success: false, messages: "Student Not Found" });
      return;
    }
    std.attendance.push({atdString:req.body});
    std
      .save()
      .then(sd => {
        res.setHeader("content-type", "application/json");
        res.statusCode = 200;
        res.json({ success: true, messages: "Attendance Marked", student: sd });
      })
      .catch(err => next(err));
  });
});

module.exports = router;
