const express = require("express");
const router = express.Router();
const response= require("../../server")
router.get("/", (req, res) => {
  res.send({ response: response }).status(200);
});
module.exports = router;