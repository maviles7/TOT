const express = require('express'); 
const router = express.Router(); 

const postCtrl = require('../controllers/posts'); 

// all paths start w/"api/posts"

// GET /api/posts --> INDEX FUNCTIONALITY 
router.get('/', postCtrl.index); 

module.exports = router; 