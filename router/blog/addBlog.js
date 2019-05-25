const {
    router
} = require("../../server/server");
const Blog = require('../../mongo/schema/blog');
const {
    getDate
} = require('../../utils/util');

//添加博客请求
router.post("/admin/addBlog", async ctx => {
    await addBlog(ctx.request.body).then(data => {
        ctx.body = data
    })
});

//添加博客
function addBlog(reqData) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: '添加成功'
        }
        reqData.addTime = getDate(Date.now(), true);
        reqData.pageView = 0;
        new Blog(reqData).save(err => {
            if (err) {
                resData.code = -1;
                resData.data = '注册失败';
            }
            resolve(resData);
        });
    })
}