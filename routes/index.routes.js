const express = require("express");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("auth/register");
});

router.get("/userProfile", isLoggedIn, (req, res, next) => {
  res.render("index", { user: req.session.currentUser });
});

module.exports = router;
