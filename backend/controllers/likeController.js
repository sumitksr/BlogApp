const File = require("../models/file"); 
const Like = require("../models/likeModel"); 
const User = require("../models/user"); // Add this if you have a User model

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // 1. Check if user exists (if you have a User model)
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Check if this user already liked this post
    const alreadyLiked = await Like.findOne({ post, user });
    if (alreadyLiked) {
      // Unlike: remove the like document and update the post
      await Like.findByIdAndDelete(alreadyLiked._id);
      const updatedPost = await File.findByIdAndUpdate(
        post,
        { $pull: { likes: alreadyLiked._id } },
        { new: true }
      ).populate("likes");
      return res.json({ post: updatedPost, liked: false });
    }

    // Like: create the like and update the post
    const like = new Like({ post, user });
    const savedLike = await like.save();
    const updatedPost = await File.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    ).populate("likes");
    res.json({ post: updatedPost, liked: true });
  } catch (err) {
    console.error("LIKE ERROR:", err);
    return res.status(500).json({
      error: "Error While Liking/Unliking post",
    });
  }
};

// Unlike a user
exports.unlikePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // 1. Find the like document for this user and post
    const deletedLike = await Like.findOneAndDelete({ post: post, user: user });
    if (!deletedLike) {
      return res.status(404).json({ error: "Like not found for this user and post" });
    }

    // 2. Update the post document to remove the like reference
    const updatedPost = await File.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    ).populate("likes");

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    console.error("UNLIKE ERROR:", err);
    return res.status(500).json({
      error: "Error While unliking post",
    });
  }
};
