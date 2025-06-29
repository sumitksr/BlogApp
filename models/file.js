const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer'); 
const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags:{
        type:String
    },
    email: {
        type: String
    },
})
// post middlerware
// doc is the document that is being saved
// this middleware will run after the document is saved to the database
fileSchema.post('save', async function(doc) {
    try{
        console.log("File saved successfully:", doc);
        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },

        });
        // send mail
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: doc.email,
            subject: 'File Upload Confirmation',
            text: `Hello ${doc.name},\n\nYour file has been uploaded successfully.\n\nThank you!`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent successfully:", info.response);
            }
        });
        console.log("Email sent ",mailOptions);
    }
    catch (error) {
        console.error("Error in post save middleware:", error);
    }   
});                             







module.exports = mongoose.model('File', fileSchema);
