const axios = require("axios");
const {
    router
} = require("../../server/server");
const ReqData = require('../../mongo/schema/reqData');
const util = require("../../utils/util");
router.all('*', async (ctx, next) => {
    const {
        req,
        request
    } = ctx;
    const ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress // 判断 connection 的远程 IP
    console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress,ip)
    const userAgent = request.header['user-agent'];
    const referer = request.header['referer'];
    const reqDate = util.getDate(Date.now(), true);
    axios.get(`https://restapi.amap.com/v3/ip?key=771f11dfb2e5788f499633a952e9ced2&ip=${ip}`).then(res => {
        new ReqData({
            ip,
            userAgent,
            referer,
            reqDate,
            city: res.data.city
        }).save();
    });
    await next();
})