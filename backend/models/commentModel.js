// Import Mongoose 
const mongoose = require('mongoose')

// Route Handler 
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "file", // reference to the post/file model
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // reference to the user model
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})

// Export 
module.exports = mongoose.model("Comment", commentSchema)