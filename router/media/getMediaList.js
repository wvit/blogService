const {
  router
} = require('../../server/server');
const path = require('path');
const fs = require('fs');
const mediaDir = path.join(__dirname, '../../static/media');

router.get("/media/getMediaList", async ctx => {
  const reqData = ctx.request.query;
  await new Promise(resolve => {
    fs.readdir(mediaDir, (err, list) => {
      const resData = {
        code: 0,
        data: []
      };
      if (err) {
        resData.code = -1;
      } else {
        resData.data = list;
      }
      resolve(resData);
    })
  }).then(data => {
    ctx.body = data
  })
})