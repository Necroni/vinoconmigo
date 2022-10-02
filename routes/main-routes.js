const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-cont")
const homeController = require("../controllers/home-cont")
const wineController = require("../controllers/wine-cont")
const tastingController = require("../controllers/tasting-cont")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, wineController.getProfile);
router.get("/feed", ensureAuth, wineController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
