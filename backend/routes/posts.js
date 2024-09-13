const express = require('express'); 
const router = express.Router(); 

const postCtrl = require('../controllers/posts'); 

// all paths start w/"api/posts"

// GET /api/posts --> INDEX FUNCTIONALITY 
router.get('/', postCtrl.index); 

// GET /api/posts/:postId --> SHOW FUNCTIONALITY 
router.get('/:postId', postCtrl.show); 

// POST /api/posts --> CREATE FUNCTIONALITY 
router.post('/', postCtrl.create); 

// DELETE /api/posts/:postId --> DELETE FUNCTIONALITY
router.delete('/:postId', postCtrl.postDelete); 

module.exports = router; 