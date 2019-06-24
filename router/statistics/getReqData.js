const {
  router
} = require("../../server/server");
const ReqData = require('../../mongo/schema/reqData');

//后台获取请求数据
router.get("/admin/getReqData", async ctx => {
  await getReqData(ctx.request.query).then(data => {
    ctx.body = data
  })
});

//查询请求数据
function getReqData(reqData) {
  const pageSize = Number(reqData.pageSize);
  const page = (Number(reqData.page) - 1) * 10;
  const reg = new RegExp(reqData.key, 'i');
  const queryRule = {
    $or: [{
      userAgent: {
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
    ReqData.countDocuments(queryRule, (err, count) => {
      ReqData.find(queryRule)
        .skip(page)
        .limit(pageSize)
        .sort({
          'reqDate': -1
        })
        .exec((err, data) => {
          resData.data.count = count;
          resData.data.list = data;
          resolve(resData);
        })
    })
  })
}