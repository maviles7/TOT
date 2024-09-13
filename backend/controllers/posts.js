const Post = require('../models/post.js'); 

module.exports = {
    index,
    show,
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
