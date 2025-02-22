const express = require('express');

const router = express.Router();
const nodemailer=require('nodemailer')
const Project = require('../models/Projects');
const Contact = require('../models/Contact');
const Certificate = require('../models/Certificates');
require('dotenv').config();

router.get('/project', async (req, res) => {
    try {console.log("hello")
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch projects' });
    }
});
router.post('/contact', async (req, res) => {
  const { name, email, msg } = req.body;
console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)
  try {
      const newContact = new Contact({ name, email, message: msg });
   //   await newContact.save();

      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Set false for TLS, true for SSL
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });
console.log("Hello");
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thank You for Reaching Out!",
          html: `<p>Dear <b>${name},</b></p>
                <p>Thank you for getting in touch! I’ve received your message and appreciate your interest in connecting. I'm committed to responding promptly, so you can expect a reply from me soon.</p>
                <p>If you have any additional questions or need more information in the meantime, please feel free to reply directly to this email. I’m here to help!</p>
                <p>Looking forward to speaking with you soon.</p>
                <p>Warm regards,<br> Ayush Rai<br> Software Developer</p>`
      };

      await transporter.sendMail(mailOptions);

      // Send notification email to yourself
      const mailOptions2 = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "Someone Messaged You",
          html:`<p>Name : ${name}</p>
                <p>Email : ${email}</p>
                <p>Message : ${msg} `
      };

      await transporter.sendMail(mailOptions2);
  console.log("Mail Sent")
      res.status(201).json({ message: 'Thank You for your message!' });

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Something went wrong', error });
  }
});




  router.post('/add-project', async (req, res) => {
    try {
        const { title, imageUrl, deployedLink, githubLink, youtubeLink, category } = req.body;

        // Create a new project document
        const newProject = new Project({
            title,
            imageUrl,
            deployedLink,
            githubLink,
            youtubeLink,
            category
        });

        // Save to MongoDB
        const savedProject = await newProject.save();
        res.status(201).json({ message: "Project added successfully!", data: savedProject });

    } catch (error) {
        res.status(500).json({ error: "Failed to add project", details: error.message });
    }
});

router.post("/add-certificate", async (req, res) => {
    try {
      const { title, organization, issueDate, certificateId, certificateUrl, certificateImage } = req.body;
  
      // Create a new certificate document
      const newCertificate = new Certificate({
        title,
        organization,
        issueDate,
        certificateId,
        certificateUrl,
        certificateImage,
      });
  
      // Save to database
      await newCertificate.save();
  
      res.status(201).json({ message: "Certificate added successfully", certificate: newCertificate });
    } catch (error) {
      console.error("Error adding certificate:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  });
  
  router.get("/certificates", async (req, res) => {
    try {
      const certificates = await Certificate.find(); // Fetch all certificates
      res.status(200).json(certificates); // Send response to frontend
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
