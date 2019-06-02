const {
    router
} = require("../../server/server");
const Tag = require('../../mongo/schema/tag');

//操作tag请求
router.post("/admin/tag", async ctx => {
    const type = ctx.request.body.type;
    const handleFn = type === 0 ? addTag : removeTag;
    await handleFn(ctx.request.body).then(data => {
        ctx.body = data
    })
});

//添加标签分类
function addTag(reqData) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: '添加成功'
        }
        new Tag(reqData).save(() => {
            resolve(resData);
        });
    })
}

//删除标签分类
function removeTag(reqData) {
    return new Promise(resolve => {
        const resData = {
            code: 0,
            data: `删除成功`
        }
        Tag.deleteOne({
            _id: reqData.id
        }, () => {
            resolve(resData);
        });
    })
}