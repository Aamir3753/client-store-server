const express = require("express");
const Router = express.Router();
const AppOwners = require("../models/appOwner");
const Apps = require("../models/apps");
const mailSender = require("../mailSender");
const jwt = require("jsonwebtoken");
const config = require("../config");

Router.route("/")
  .get((req, res, next) => {
    Apps.find()
      .select("appName")
      .then(apps => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json({ success: true, apps });
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    const {
      email,
      password,
      name,
      contact,
      address,
      appUrl,
      appImage,
      appName
    } = req.body;
    AppOwners.register(
      new AppOwners({ username: email, name, contact, address }),
      password,
      (err, user) => {
        if (err) return next(err);
        user.save(err => {
          if (err) return next(err);
          Apps.create(
            { appUrl, appImage, appName, owner: user._id },
            (err, app) => {
              if (err) return next(err);
              const token = jwt.sign({ _id: app._id }, config.secret, {
                expiresIn: 3600
              });
              console.log(token);
              const emailBody = `<div>
                <a href="http://localhost:3000/varifyapp/${token}">Click here to varify the app</a>
              </div>`;
              req.data = app;
              mailSender(
                email,
                "ars3753669@gmail.com",
                "App Confrimation",
                emailBody
              )(req, res, next);
            }
          );
        });
      }
    );
  });

  Router.route("/:appId")
    .get((req,res,next)=>{
      Apps.findById(req.params.appId)
          .populate("owner")
          .then(app=>{
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.json({ success: true, app });
          })
          .catch(err=>next(err));
    })

Router.post("/varify", (req, res, next) => {
  const token = req.body.token;
  jwt.verify(token, config.secret, (err, payload) => {
    if (err) return next(err)

    Apps.findByIdAndUpdate(
      payload._id,
      { isVarified: true },
      { new: true },
      (err, app) => {
        if (err) return next(err);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json({ success: true, app: app });
      }
    );
  });
});

module.exports = Router;
