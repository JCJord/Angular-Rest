const Post = require("../models/post");

exports.createPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a post failed !",
      });
    });
};

exports.updatePost = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });

  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((postData) => {
      console.log(postData.nModified);
      if (postData.nModified > 0) {
        return res.status(200).json({ message: " Successfully authorized" });
      } else {
        return res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't update post!" });
    });
};

exports.getAllPosts = (req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then((documents) => {
        fetchedPosts = documents;
        return Post.count();
      })
      .then((count) => {
        res.status(200).json({
          posts: fetchedPosts,
          maxPosts: count,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: "Fetching posts failed!" });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching posts failed!" });
    });
};

exports.deletePosts = async (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.nModified > 0) {
        res.status(200).json({ message: " Deletion authorized" });
      } else {
        res.status(200).json({ message: "Deleted" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't delete post!" });
    });
};
