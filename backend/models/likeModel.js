const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file", // This should refer to your Post model (e.g., File)
    required: true,
  },
  user: {
    type: String, // or mongoose.Schema.Types.ObjectId if users are stored in DB
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
