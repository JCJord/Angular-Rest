const express = require("express");
const Post = require("../models/post");
const multer = require("multer");
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");

    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split("").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post("", multer({ storage: storage }).single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  });
});

router.get("", async (req, res) => {
  try {
    let documents = await Post.find();
    res.status(200).json({
      posts: documents,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  console.log(req.file);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  Post.updateOne({ _id: req.params.id }, post).then((postData) => {
    console.log(postData);
    res.status(200);
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({ message: "Worked" });
    } else {
      res.status(404).json({ message: "Did not work." });
    }
  });
});

router.delete("/:id", async (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    console.log(req.params.id);
    res.status(200).json({});
  });
});

module.exports = router;
