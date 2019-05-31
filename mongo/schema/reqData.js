const mongoose = require('mongoose');
const reqDate = new mongoose.Schema({
    ip: String, //ip
    userAgent: String, //设备
    referer: String, //来源
    reqDate: String, //请求时间
    city: String //城市
});

module.exports = mongoose.model('reqDate', reqDate);