const redis = require('../config/redisConfig');

redis.get('a').then(res => {
  console.log(res)
})

async function verifyLogin(ctx, next) {
  await next();
  ctx.body = {
    code: 1001,
    msg: '登录失效',
    reqData: ctx.request
  }
}

module.exports = verifyLogin;