const {
    router
} = require("../../server/server");
const Blog = require('../../mongo/schema/blog');

//获取博客详情请求
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
        const _id = reqData.id
        Blog.findOne({
                _id
            })
            .exec((err, data) => {
                const pageView = data.pageView + 1;
                Blog.updateOne({
                    _id
                }, {
                    pageView
                }, () => {});
                resData.data = data;
                resolve(resData);
            })
    })
}