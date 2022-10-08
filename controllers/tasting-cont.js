const cloudinary = require("../middleware/cloudinary");
const Tasting = require("../models/Tasting");
const { getRandomString } = require("../config/wordlist");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const tastings = await Tasting.find({ user: req.user.id });
      res.render("profile.ejs", { tastings: tastings, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const tastings = await Tasting.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { tastings: tastings });
    } catch (err) {
      console.log(err);
    }
  },
  getTasting: async (req, res) => {
    try {
      const tasting = await Tasting.findById(req.params.id);
      res.render("tasting.ejs", { tasting: tasting, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTasting: async (req, res) => {

    try {
      await Tasting.create({
        title: req.body.title,
        humanId: getRandomString(),
        creatorId: req.user.id,
        tastingDate: req.body.date,
        createdAt: Date.now(),
        wines: [],
        participants: [req.user.id], 
      });
      console.log("Tasting has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // createTasting: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Tasting.create({
  //       title: req.body.title,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //     });
  //     console.log("Tasting has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  likeTasting: async (req, res) => {
    try {
      await Tasting.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/tasting/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTasting: async (req, res) => {
    try {
      // Find tasting by id
      let tasting = await Tasting.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(tasting.cloudinaryId);
      // Delete tasting from db
      await Tasting.remove({ _id: req.params.id });
      console.log("Deleted Tasting");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
