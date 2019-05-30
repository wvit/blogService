const {
    router
} = require("../../server/server");
const multer = require('koa-multer');
const {
    server
} = require('../../config/serverConfig')
const storage = multer.diskStorage({
    //文件保存路径
    destination(req, file, cb) {
        cb(null, 'static/uploadFiles/')
    },
    //修改文件名称
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({
    storage: storage
});

//上传文件
router.post("/upload", upload.single('file'), async (ctx, next) => {
    const filename = ctx.req.file.filename;
    ctx.body = {
        code: 0,
        data: {
            path: `${server.address}/uploadFiles/${filename}`,
            filename
        }
    }
});