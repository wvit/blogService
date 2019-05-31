const mongoose = require('mongoose');
const reqDate = new mongoose.Schema({
    ip: String,
    userAgent: String,
    referer: String,
    reqDate: String,
    city: String
});

module.exports = mongoose.model('reqDate', reqDate);