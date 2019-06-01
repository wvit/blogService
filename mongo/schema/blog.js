const mongoose = require('mongoose');
const blog = new mongoose.Schema({
    title: String, //标题
    content: String, //内容
    addTime: String, //发布时间
    model: Number, //类型 1工作 2生活
    tags: Array, //标签 model=1
    classId: String, //分类 model=2
    isShow: {
        type: Boolean,
        default: true //是否显示
    },
    pageView: Number //浏览量
});

module.exports = mongoose.model('blog', blog);