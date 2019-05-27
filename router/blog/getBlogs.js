const {
    router
} = require("../../server/server");
const Blog = require('../../mongo/schema/blog');

//后台获取博客请求
router.get("/admin/getBlogs", async ctx => {
    await getBlogs(ctx.request.query).then(data => {
        ctx.body = data
    })
});

//前台获取博客请求
router.get("/app/getBlogs", async ctx => {
    await getBlogs(ctx.request.query).then(data => {
        ctx.body = data
    })
});

//查询博客
function getBlogs(reqData) {
    const pageSize = Number(reqData.pageSize);
    const page = (Number(reqData.page) - 1) * 10;
    const reg = new RegExp(reqData.key, 'i');
    const queryRule = {
        isShow: true,
        $or: [{
            title: {
                $regex: reg
            }
        }]
    };
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: {
                count: 0,
                list: []
            }
        };
        Blog.countDocuments(queryRule, (err, count) => {
            Blog.find(queryRule)
                .skip(page)
                .limit(pageSize)
                .sort({
                    'addTime': -1
                })
                .exec((err, data) => {
                    resData.data.count = count;
                    resData.data.list = data;
                    resolve(resData);
                })
        })
    })
}