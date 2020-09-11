const Router = require('koa-router');

let router = new Router();

// koa get 请求
router.get('/users/:id', async (ctx) => {
  let url = ctx.url;
  let params = ctx.params;
  let query = ctx.query.query;
  ctx.body = {
    url,
    params,
    query
  }
})

// koa post 请求获取body参数
router.post('/users', async (ctx) => {
  let url = ctx.url;
  let body = ctx.request.body
  ctx.body = {
    url,
    body
  }
})

module.exports = router

