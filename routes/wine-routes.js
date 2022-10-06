const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const wineController = require("../controllers/wine-cont");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, wineController.getWine);

router.post("/createWine", upload.single("file"), wineController.createWine);

// router.put("/likeWine/:id", wineController.likeWine);

router.delete("/deleteWine/:id", wineController.deleteWine);

module.exports = router;