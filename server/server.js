const Koa = require('koa');
const https = require('https');
const path = require('path');
const cors = require('koa2-cors');
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const enforceHttps = require('koa-sslify');
const app = new Koa();
const {
    dbs,
    server
} = require('../config/serverConfig');
const httpsConfig = {
    key: fs.readFileSync('../ssl/1wei.cc.key'),
    cert: fs.readFileSync('../ssl/1wei.cc.pem')
};

mongoose.connect(dbs, {
    useNewUrlParser: true
}, err => {
    const msg = err ? '数据库发生错误' : '数据库链接成功';
    console.log(msg, dbs, err)
});

app.use(enforceHttps());
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, '../static')));

app.listen(server.port, server.host, () => {
    console.log('服务已启动', `${server.host}:${server.port}`)
});

https.createServer(httpsConfig, app.callback()).listen(server.port);

module.exports = {
    router,
    bodyParser,
    mongoose
}