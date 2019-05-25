const {
    router
} = require("../../server/server");
const AdminUser = require('../../mongo/schema/blog')
const crypto = require('crypto');

//接受用户登录信息
router.post("/admin/signIn", async ctx => {
    await findUser(ctx.request.body).then(data => {
        ctx.body = data;
    })
});

//查找验证用户登录
function findUser(reqData) {
    return new Promise(resolve => {
        AdminUser.findOne({
            username: reqData.username
        }, (err, user) => {
            resolve(user);
        })
    }).then(user => {
        const password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
        const resData = {
            code: 0,
            data: {}
        }
        if (!user) {
            resData.code = 2;
            resData.data.text = '用户不存在';
        } else if (user.password !== password) {
            resData.code = -1;
            resData.data.text = '密码错误';
        } else {
            resData.data = {
                userId: user.userId,
                text: '登录成功，正在跳转...'
            }
        }
        return new Promise(resolve => {
            resolve(resData)
        })
    })
}