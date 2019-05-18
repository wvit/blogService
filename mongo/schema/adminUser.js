const mongoose = require('mongoose');
const adminUser = new mongoose.Schema({
    username: String,
    password: String,
    userId: Number
});

module.exports = mongoose.model('adminUser', adminUser);