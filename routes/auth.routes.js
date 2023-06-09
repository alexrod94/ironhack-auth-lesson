const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const User = require("../models/User.model");

router.get("/register", isLoggedOut, (req, res, next) => {
  res.render("auth/register");
});

router.post("/register", (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    res.render("auth/register", {
      errorMessage: "Passwords don't match",
    });
    return;
  }

  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    email: req.body.email,
  })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      res.render("auth/register", {
        errorMessage: err,
      });
    });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Your credentials are wrong",
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/userProfile");
      } else {
        res.render("auth/login", {
          errorMessage: "Your credentials are wrong",
        });
      }
    })
    .catch((err) => {
      res.render("auth/login", {
        errorMessage: err,
      });
    });
  console.log(req.session);
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
