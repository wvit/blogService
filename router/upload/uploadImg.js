const fs = require('fs');
const {
    router
} = require("../../server/server");

router.post("/uploadImg", async (ctx, next) => {
    await parseImg(ctx.request.body.file, ctx.request.body.name).then(msg => {
        ctx.body = msg
    });
});

function parseImg(base64, name) {
    return new Promise((resolve, reject) => {
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile(`./static/imgs/${name}`, dataBuffer, async err => {
            if (err) {
                resolve(err);
            } else {
                resolve(`${name}上传成功`);
            }
        });
    })

}