const mongoose = require('mongoose'); 

// embedded comment schema 
const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String, 
            required: true,
        }, 
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, 
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        }, 
        photo: {
            type: String
        }, 
        location: {
            type: String, 
            required: true,
        }, 
        startOfTravel: {
            type: Date, 
            required: true,
        }, 
        endOfTravel: {
            type: Date, 
            required: true,
        }, 
        vibeCheck: {
            type: Boolean, 
            required: true,
        }, 
        insight: {
            type: String,
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        comments: [commentSchema],
    },
    { timestamps: true }
); 

const Post = mongoose.model('Post', postSchema); 

module.exports = Post; 