const {
    router
} = require("../../server/server");
const Tag = require('../../mongo/schema/tag');

//后台获取标签请求
router.get("/admin/getTags", async ctx => {
    await getTags(ctx.request.query).then(data => {
        ctx.body = data
    })
});

//前台获取标签请求
router.get("/app/getTags", async ctx => {
    await getTags(ctx.request.query).then(data => {
        ctx.body = data
    })
});

//查询标签分类
function getTags(reqData) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: []
        };
        Tag.find({
            status: reqData.status //1工作 2生活
        }).exec((err, data) => {
            resData.data = data;
            resolve(resData);
        })

    })
}