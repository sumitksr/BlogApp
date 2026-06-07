const express = require("express");
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// local file ka hnadler
// local mtlb server pe file upload krna
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file; // file ko req se lelo
    console.log("agayi file bhai ", file);

    // path unique rkhne ke liye date ka use krte hai
    // file name ke sath date ka use krte hai taki file name unique ho j
    // the last funct will spilt tand give the file extension
    let path =
      __dirname + "/../files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("File path:", path);
    file.mv(path, (err) => {
      if (err) {
        console.error("File upload failed:", err);
        return res
          .status(500)
          .json({ message: "File upload failed", error: err.message });
      }
      console.log("File uploaded successfully:", path);
    });
    res.json({
      success: true,
      message: "File uploaded successfully",
      filePath: path,
    });
    // Save file info to DB
   const newFile = await File.create({
      name: file.name,
      imageUrl: path,
    });
    console.log("File saved to database:", newFile);

    return res.status(200).json({
      success: true,
      message: "File uploaded and saved successfully",
      file: newFile,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
}
async function uploadFileToCloudinary(file,folder,quality=100) {

  const options = {folder};
  options.quality = quality; // Set the quality to 50% if specified
  return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async (req, res) => {
  try {
    // data fetch from req.body
    const { name, tags, email, title, content, summary, author, userid } = req.body;

    // file fetch from req.files
    const file = req.files.file;
    console.log("Image file received:", file);

    // file validation
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only images are allowed.",
      });
    }
    // here u should be first stroging it to local file then upload to cloudinary because cloudinary needs a file path to upload the file 
    // upload file to cloudinary
    const response = await uploadFileToCloudinary(file, "Blog", 90);
    console.log("Image uploaded to Cloudinary:", response);

    // save to database
    const newFile = await File.create({
      name: name,
      imageUrl: response.secure_url,
      tags: tags,
      email: email,
      title: title,
      content: content,
      summary: summary,
      author: author,
      userid: userid,
    });

    // success response
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded and saved successfully",
      file: newFile,
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
};


// Get all posts/files
exports.getAllPosts = async (req, res) => {
  try {
    // Populate likes and comments if referenced, or just count them if stored as arrays
    const files = await File.find({});
    // If you want to include like/comment counts, you can map here
    const posts = files.map(file => ({
      ...file.toObject(),
      likes: file.likes ? file.likes.length : 0,
      comments: file.comments ? file.comments.length : 0
    }));
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts', error: error.message });
  }
};

// Get a single post by id with comments
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await File.findById(id).populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user',
        model: 'user',
        select: 'name',
      }
    });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await File.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete post', error: error.message });
  }
};

// Edit/Update a post (only the owner can edit)
exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content } = req.body;

    // Find the post
    const post = await File.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check ownership: the logged-in user must be the post creator
    const userId = req.user.id || req.user._id;
    if (post.userid.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to edit this post' });
    }

    // Build update object with only the fields that were provided
    const updateFields = {};
    if (title !== undefined && title.trim() !== '') updateFields.title = title;
    if (summary !== undefined && summary.trim() !== '') updateFields.summary = summary;
    if (content !== undefined && content.trim() !== '') updateFields.content = content;

    // If a new image file is uploaded, upload to Cloudinary and update imageUrl
    if (req.files && req.files.file) {
      const file = req.files.file;
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file type. Only images are allowed.',
        });
      }
      const response = await uploadFileToCloudinary(file, 'Blog', 90);
      updateFields.imageUrl = response.secure_url;
    }

    const updatedPost = await File.findByIdAndUpdate(id, updateFields, { new: true });

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ success: false, message: 'Failed to update post', error: error.message });
  }
};