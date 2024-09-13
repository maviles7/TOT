const Post = require('../models/post.js'); 

module.exports = {
    index,
    show,
    create,
    postDelete,
}

// INDEX FUNCTIONALITY 
async function index(req, res) {
    try {
        const posts = await Post.find({})
            .populate('author')
            .sort({createdAt: 'desc' }); 
        res.status(200).json(posts); 
    } catch (err) {
        res.status(500).json(error);
    }
}; 

// SHOW FUNCTIONALITY 
async function show(req, res) {
    try {
      const post = await Post.findById(req.params.postId).populate('author');
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// CREATE FUNCTIONALITY 
async function create(req, res) {
    console.log(req.user);
    try {
      req.body.author = req.user._id;
      const post = await Post.create(req.body);
      post._doc.author = req.user;
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

// DELETE FUNCTIONLITY
async function postDelete(req, res) {
    try {
      const post = await Post.findById(req.params.postId);
  
      if (!post.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json(deletedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  };
