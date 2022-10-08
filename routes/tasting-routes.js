const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const tastingController = require("../controllers/tasting-cont");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, tastingController.getTasting);

router.post("/createTasting", ensureAuth, tastingController.createTasting);

router.delete("/deleteTasting/:id", tastingController.deleteTasting);

module.exports = router;