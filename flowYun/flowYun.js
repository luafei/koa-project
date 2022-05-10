const Router = require('koa-router');

let router = new Router();

// koa get 请求
router.get('/jiagou', async (ctx) => {
  let url = ctx.url;
  let params = ctx.params;
  let query = ctx.query.query;
  ctx.body = {
    url,
    code: 200,
    data: {
      current_page: 1,
      max_page: 4,
      page_size: 20,
      records: [
        { unitId: 109638033113088, unitName: '西安第二分公司', unitChain : '第二大区 -> 西安第二分公司', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
        { unitId: 109638033113088, unitName: '西安第二分公司', unitChain : '第二大区 -> 西安第二分公司', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
        { unitId: 109638033113088, unitName: '西安第二分公司', unitChain : '第二大区 -> 西安第二分公司', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
        { unitId: 109638033113088, unitName: '西安第二分公司', unitChain : '第二大区 -> 西安第二分公司', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
        { unitId: 109638033113088, unitName: '西安第二分公司', unitChain : '第二大区 -> 西安第二分公司', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' }
      ],
      total_count: 62
    },
    message: "Success.",
    timestamp: "2020-09-11 11:56:55"
  }
})

router.get('/employee', async (ctx) => {
  let url = ctx.url;
  let params = ctx.params;
  let query = ctx.query.query;
  ctx.body = {
    code: 200,
    data: [
      { userId: 109638033113088, realName: '邢江涛', roleName: '管家', roleUnitChain: '第二大区 -> 西安第二分公司 -> 未央区域 -> 101门店', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
      { userId: 109638033113088, realName: '邢江涛', roleName: '管家', roleUnitChain: '第二大区 -> 西安第二分公司 -> 未央区域 -> 101门店', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
      { userId: 109638033113088, realName: '邢江涛', roleName: '管家', roleUnitChain: '第二大区 -> 西安第二分公司 -> 未央区域 -> 101门店', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
      { userId: 109638033113088, realName: '邢江涛', roleName: '管家', roleUnitChain: '第二大区 -> 西安第二分公司 -> 未央区域 -> 101门店', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' },
      { userId: 109638033113088, realName: '邢江涛', roleName: '管家', roleUnitChain: '第二大区 -> 西安第二分公司 -> 未央区域 -> 101门店', tenantName: '城城找房', syncMethod: '增加', sycnDate: '2020-5-5 16:37:52', syncReason: '接口返回的失败原因' }
    ],
    message: "Success.",
    timestamp: "2020-09-11 11:56:55"
  }
})


module.exports = router

