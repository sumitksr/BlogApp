const express = require("express");
const File = require("../models/file");
// loacal file ka hnadler
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
};
