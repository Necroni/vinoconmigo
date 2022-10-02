const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const wineController = require("../controllers/wine-cont");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, wineController.getPost);

router.post("/createPost", upload.single("file"), wineController.createPost);

router.put("/likePost/:id", wineController.likePost);

router.delete("/deletePost/:id", wineController.deletePost);

module.exports = router;