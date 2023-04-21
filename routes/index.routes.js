const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("auth/register");
});

router.get("/userProfile", (req, res, next) => {
  res.render("index");
});

module.exports = router;
