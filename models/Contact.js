// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Basic email validation
  },
  message: {
    type: String,
    required: true,
    minlength: 10, // Minimum message length
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
