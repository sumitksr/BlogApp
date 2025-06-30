const express = require("express");
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
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
}
async function uploadFileToCloudinary(file,folder,quality=100) {

  const options = {folder};
  options.quality = quality; // Set the quality to 50% if specified
  return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload
exports.imageUpload = async (req, res) => {
  try{
    // data fecth
    const {name,tags,email} = req.body;
    const file = req.files.file; 
    console.log("Image file received:", file);
    // validation 
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.')[1].toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ 
        sucess: false,
        message: "Invalid file type. Only images are allowed." });
    }
    // upload cloudinary 
    const response= await uploadFileToCloudinary(file, "Blog",90);
    console.log("Image uploaded to Cloudinary:", response);
    // save to db
    const newFile = await File.create({
      name:name,
      imageUrl: response.secure_url,
      tags: tags,
      email: email
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded and saved successfully",
      file: newFile,
    });


  }
  catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
}



  