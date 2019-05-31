const {
    router
} = require("../../server/server");
const Blog = require('../../mongo/schema/blog');
const {
    getDate
} = require('../../utils/util');

//操作博客请求
router.post("/admin/blog", async ctx => {
    const type = ctx.request.body.type;
    const handleFn = type === 0 ? addBlog : type === 1 ? editBlog : removeBlog;
    await handleFn(ctx.request.body).then(data => {
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
        new Blog(reqData).save(() => {
            resolve(resData);
        });
    })
}

//修改博客
function editBlog(reqData) {
    return update(reqData.id, reqData, '修改');
}

//删除博客
function removeBlog(reqData) {
    return update(reqData.id, {
        isShow: false
    }, '删除');
}

//更新数据
function update(_id, data, msg) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: `${msg}成功`
        }
        Blog.updateOne({
            _id
        }, data, () => {
            resolve(resData);
        });
    })
}