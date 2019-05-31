const mongoose = require('mongoose');
const tag = new mongoose.Schema({
    tag: String, //标签分类名
    status: Number //类型 1标签 2分类
});

module.exports = mongoose.model('tag', tag);