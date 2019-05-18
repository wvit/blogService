const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const {
    dbs,
    server
} = require('../config/serverConfig');

mongoose.connect(dbs, {
    useNewUrlParser: true
}, err => {
    const msg = err ? '数据库发生错误' : '数据库链接成功';
    console.log(msg, dbs, err)
});

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, '../static')));

app.listen(server.port, server.host, () => {
    console.log('服务已启动', `${server.host}:${server.port}`)
});

module.exports = {
    router,
    bodyParser,
    mongoose
}