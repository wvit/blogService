const {
    router
} = require("../../server/server");
const Blog = require('../../mongo/schema/blog');

//后台获取博客请求
router.get("/app/getBlogDetail", async ctx => {
    await getBlogs(ctx.request.query).then(data => {
        ctx.body = data
    })
});

//查询博客
function getBlogs(reqData) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: {}
        };
        Blog.findOne({
                _id: reqData.id
            })
            .exec((err, data) => {
                resData.data = data;
                resolve(resData);
            })

    })
}