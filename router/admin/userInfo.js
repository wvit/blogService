const {
    router,
    mongoose
} = require("../../server/server");
const User = require('../../mongo/schema/user');
const userConfig = require('../../mongo/schema/userConfig');
const UserConfig = mongoose.model('config', userConfig);

//获取用户数据路由
router.get("/admin/getUserInfo", async ctx => {
    await getUserData(ctx.request.query.userId).then(data => {
        ctx.body = data;
    })

});

//获取用户数据
function getUserData(userId) {
    return new Promise(resolve => {
        User.findOne({
            userId
        }, (err, user) => {
            getUserConfig(userId, user).then(data => {
                resolve(data)
            })
        })
    })
}

//获取用户设置
function getUserConfig(userId, user) {
    return new Promise(resolve => {
        UserConfig.findOne({
            userId
        }, (err, config) => {
            const resData = {
                code: 0,
                data: {
                    nickname: user.nickname,
                    email: user.email,
                    mainColor: config.mainColor
                }
            }
            resolve(resData);
        })
    }).then(data => {
        return new Promise(resolve => {
            resolve(data);
        })
    })
}