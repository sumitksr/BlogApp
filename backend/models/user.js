const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");
const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
});

// post middlerware
// doc is the document that is being saved
// this middleware will run after the document is saved to the database
user.post("save", async function (doc) {
  try {
    // transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // send mail
    let mailOptions = {
      from: process.env.MAIL_USER,
      to: doc.email,
      subject: "Account Creation Confirmation",
      text: `Hello ${doc.name},\n\n Your Acount has been Created Sucessfully \n\nThank you!`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
    console.log("Email sent ", mailOptions);
  } catch (error) {
    console.error("Error in post save middleware:", error);
  }
});

module.exports = mongoose.model("user", user);
