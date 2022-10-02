const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const tastingController = require("../controllers/tasting-cont");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, tasting.getPost);

router.post("/createPost", upload.single("file"), tastingController.createPost);

router.put("/likePost/:id", tastingController.likePost);

router.delete("/deletePost/:id", tastingController.deletePost);

module.exports = router;