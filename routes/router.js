const express = require('express');

const router = express.Router();
const nodemailer=require('nodemailer')
const Project = require('../models/Projects');
const Contact = require('../models/Contact');
require('dotenv').config();

router.get('/project', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch projects' });
    }
});
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newContact = new Contact({
        name,
        email,
        message,
      });
  
      await newContact.save();
      const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, 
        subject: "Thank You for Reaching Out!",
        html: `<p>Dear <b>${name},</b></p>
        
        <p>Thank you for getting in touch! I’ve received your message and appreciate your interest in connecting. I'm committed to responding promptly, so you can expect a reply from me soon.</p>
        
        <p>If you have any additional questions or need more information in the meantime, please feel free to reply directly to this email. I’m here to help!</p>
        
        <p>Looking forward to speaking with you soon.</p>
        
        <p>Warm regards,<br>
        Ayush Rai<br>
        Software Developer<br>
       `
    };
    
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send("Error");
        } else {
            console.log("Email sent: " + info.response);
            
        }
    });
    
      res.status(201).json({ message: 'Thank You for your message!' });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error });
    }
  });
module.exports = router;
