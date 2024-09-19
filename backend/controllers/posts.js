const Post = require("../models/post.js");
const TOKEN = process.env.MAP_BOX_TOKEN;

module.exports = {
  index,
  show,
  create,
  postDelete,
  update,
};

// INDEX FUNCTIONALITY
async function index(req, res) {
  console.log("plssssss");
  try {
    const posts = await Post.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(error);
  }
}

// SHOW FUNCTIONALITY
async function show(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .populate({ path: "comments", populate: { path: "author" } });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}

// CREATE FUNCTIONALITY
async function create(req, res) {
  console.log(req.user);
  try {
    const location = req.body.location;
    const coordinates = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${location}&proximity=ip&access_token=${TOKEN}`
    );
    const data = await coordinates.json();
    const geocoordinates = data.features[0].geometry.coordinates;
    req.body.geocoordinates = geocoordinates;
    console.log(geocoordinates);
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    post._doc.author = req.user;
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// DELETE FUNCTIONLITY
async function postDelete(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    // check permissions
    if (!post.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json(error);
  }
}

// UPDATE FUNCTIONALITY
async function update(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    // check permissions
    if (!post.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    updatedPost._doc.author = req.user;
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
}
