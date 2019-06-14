var express = require("express");
var router = express.Router();
var passport = require("passport");
var Users = require("../models/user");
var authenticate = require("../authenticate");
var students = require("../models/students");
var teachers = require("../models/teachers");

// router.post("/signup", (req, res, next) => {
//   const { email, password, cnic } = req.body;
//   Users.register(
//     new Users({ username: email, role: "student", cnic }),
//     password,
//     (err, user) => {
//       if (err) return next(err);
//       user.save(err => {
//         if (err) return next(err);
//         const token = authenticate.getToken({
//           _id: user._id,
//           name: user.name,
//           role: user.role
//         });
//         res.setHeader("content-type", "application/json");
//         res.statusCode = 200;
//         res.json({ success: true, message: "Signup successfully", token });
//       });
//     }
//   );
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(req.body);
    if (err) return next(err);
    if (!user) {
      res.setHeader("content-type", "application/json");
      res.statusCode = 401;
      res.json({ success: false, message: "Login Un successfull", info: info });
      return;
    }
    req.logIn(user, { session: false }, err => {
      if (err) {
        res.setHeader("content-type", "application/json");
        res.statusCode = 401;
        res.json({ success: false, message: "Login Un successfull", err: err });
        return;
      }
      const token = authenticate.getToken({
        _id: user._id,
        // role: user.role
      });
      // .....................for student ...........>
      if (user.role === "student") {
        students.findOne({ cnic: user.cnic }, (err, student) => {
          if (err) return next(err);
          if (!student) {
            res.setHeader("content-type", "application/json");
            res.statusCode = 404;
            res.json({ sucess: false, message: "Student Record Not found" });
          } else {
            res.setHeader("content-type", "application/json");
            res.statusCode = 200;
            res.json({
              success: true,
              message: "Login Successfull",
              token,
              student
            });
          }
        });
      }
      // .......................for teacher .............>
      else if (user.role === "teacher") {
        teachers.findOne({ cnic: user.cnic }, (err, teacher) => {
          if (err) return next(err);
          if (!teacher) {
            res.setHeader("content-type", "application/json");
            res.statusCode = 404;
            res.json({ sucess: false, message: "Teacher Record Not found" });
          } else {
            res.setHeader("content-type", "application/json");
            res.statusCode = 200;
            res.json({
              success: true,
              message: "Login Successfull",
              token,
              teacher
            });
          }
        });
      }
      // ..................................for default case .................>
      else {
        res.setHeader("content-type", "application/json");
        res.statusCode = 404;
        res.json({ sucess: false, message: "Teacher Record Not found" });
        return;
      }
    });
  })(req, res, next);
});

module.exports = router;
