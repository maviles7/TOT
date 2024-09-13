const Post = require('../models/post.js'); 

module.exports = {
    index,
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