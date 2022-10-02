const cloudinary = require("../middleware/cloudinary")
const Wine = require("../models/Wine")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const wines = await Wine.find({ user: req.user.id })
      res.render("profile.ejs", { wines: wines, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
      const wines = await Wine.find().sort({ createdAt: "desc" }).lean()
      res.render("feed.ejs", { wines: wines })
    } catch (err) {
      console.log(err)
    }
  },
  getWine: async (req, res) => {
    try {
      const wine = await Wine.findById(req.params.id)
      res.render("wine.ejs", { wine: wine, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  createWine: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Wine.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      })
      console.log("Wine has been added!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
  likeWine: async (req, res) => {
    try {
      await Wine.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/wine/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  },
  deleteWine: async (req, res) => {
    try {
      // Find wine by id
      let wine = await Wine.findById({ _id: req.params.id })
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(wine.cloudinaryId)
      // Delete wine from db
      await Wine.remove({ _id: req.params.id })
      console.log("Deleted Wine")
      res.redirect("/profile")
    } catch (err) {
      res.redirect("/profile")
    }
  },
};
