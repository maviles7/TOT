const Post = require("../models/post.js");

module.exports = {
  create,
  deleteComment,
  update,
};

// CREATE FUNCTIONALITY
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const post = await Post.findById(req.params.postId);
    post.comments.push(req.body);
    await post.save();

    // find newly created comment:
    const newComment = post.comments[post.comments.length - 1];

    newComment._doc.author = req.user;

    // respond with the newComment:
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
}

// DELETE FUNCTIONALITY
async function deleteComment(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.remove({ _id: req.params.commentId });
    await post.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// UPDATE FUNCTIONALITY
async function update(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    comment.text = req.body.text;
    await post.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
}
