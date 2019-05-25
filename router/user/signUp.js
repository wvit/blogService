const {
    router,
    mongoose
} = require("../../server/server");
const AdminUser = require('../../mongo/schema/adminUser');
const crypto = require('crypto');

//接受用户注册请求
router.post("/admin/signUp", async ctx => {
    await savaUser(ctx.request.body).then(data => {
        ctx.body = data
    })
});

//保存用户注册数据
function savaUser(reqData) {
    return new Promise(resolve => {
        AdminUser.findOne({
            username: reqData.username
        }, (err, user) => {
            resolve(user);
        })
    }).then(queryUser => {
        const resData = {
            code: 0,
            data: '注册成功'
        }
        if (queryUser) {
            resData.code = 2;
            resData.data = '昵称已存在';
        } else {
            reqData.password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
            reqData.userId = Date.now();
            new AdminUser(reqData).save((err, res) => {
                if (err) {
                    resData.code = -1;
                    resData.data = '注册失败';
                    return;
                }
            });
        }
        return new Promise(resolve => {
            resolve(resData)
        })
    })
}