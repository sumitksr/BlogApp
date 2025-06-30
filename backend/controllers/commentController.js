// import model 
const user = require("../models/user");
const Comment = require("../models/commentModel");

// business Logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, user, body } = req.body;
        // can use that create one also
        // create comment object
        const comment = new Comment({
            post, user, body
        }) 

        // save the new comment object into the db 
        const savedComment = await comment.save();

        // Find the user By Id and the new comment to its comment array 
        // push is used to edit or make changes
        // pull is used to delete 
        // isse sirf ek chiz pe edit hoga 
        const updatedPost = await user.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") //Populates the comment array with the comments document
            .exec();

        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}
exports.getAllComments = async (req, res) => { 
    try {
        // fetch all comments from the db 
        const comments = await Comment.find({}).populate("user").exec();
        res.json({
            comments: comments,
        })
    } catch (err) {
        return res.status(500).json({
            error: "Error while fetching comments",
        })
    }
}