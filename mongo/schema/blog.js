const mongoose = require('mongoose');
const blog = new mongoose.Schema({
    title: String,
    content: String,
    addTime: String,
    isShow: {
        type: Boolean,
        default: true
    },
    pageView: Number
});

module.exports = mongoose.model('blog', blog);