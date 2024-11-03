// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,

    imageUrl: String,
    deployedLink: String,
    githubLink: String,
    youtubeLink: String,
    category: String, // New field for category
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
