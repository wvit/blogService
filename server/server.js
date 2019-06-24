const Koa = require('koa');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('koa2-cors');
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const sslify = require('koa-sslify').default;
const verifyLogin = require('../middleware/verifyLogin');

const app = new Koa();
const {
  dbs,
  server,
  production
} = require('../config/serverConfig');
const httpsConfig = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/1wei.cc.key')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/1wei.cc.pem'))
};

mongoose.connect(dbs, {
  useNewUrlParser: true
}, err => {
  const msg = err ? '数据库发生错误' : '数据库链接成功';
  console.log(msg, dbs)
});

app.use(verifyLogin);
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, '../static')));

if (production) {
  app.use(sslify());
  https.createServer(httpsConfig, app.callback()).listen(server.port, () => {
    console.log('https服务已启动', `${server.address}`)
  });
} else {
  app.listen(server.port, server.host, () => {
    console.log('服务已启动', `${server.address}`)
  });
}

module.exports = {
  router,
  bodyParser,
  mongoose
}