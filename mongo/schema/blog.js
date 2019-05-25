const mongoose = require('mongoose');
const blog = new mongoose.Schema({
    title: String,
    content: String,
    addTime: String,
    pageView: Number
});

module.exports = mongoose.model('blog', blog);