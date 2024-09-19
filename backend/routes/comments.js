const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const commentsCtrl = require("../controllers/comments");

// all paths start w/'/api'

// POST /api/posts/:postId/comments --> COMMENT --- CREATE FUNCTIONALITY
router.post("/posts/:postId/comments", commentsCtrl.create);

// DELETE /api/posts/:postId/comments/:commnetId --> COMMENT --- DELTE FUNCTIONALITY
router.delete("/posts/:postId/comments/:commentId", commentsCtrl.deleteComment);

// PUT /posts/:postId/comments/:commentId --> COMMENT --- UPDATE FUNCTIONALITY
router.put("/posts/:postId/comments/:commentId", commentsCtrl.update);

module.exports = router;
