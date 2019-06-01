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
    const {
        pageSize,
        page,
        key,
        tags,
        classId
    } = reqData;
    const queryRule = {
        isShow: true,
        $or: [{
            title: {
                $regex: new RegExp(key, 'i')
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
                .skip((Number(page) - 1) * 10)
                .limit(Number(pageSize))
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