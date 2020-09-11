const Koa = require('koa');
const cors = require('koa-cors');
const Router = require('koa-router');

const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())
app.use(cors());


let router = new Router();
router.get('/jspang',async(ctx)=>{
  let url =ctx.url;
  // 从request中获取GET请求
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;
  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querytring = ctx.querystring;
  // query获取参数
  let query = ctx.query

  ctx.body={
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querytring,
    query
  }
})
// koa get 请求动态获取参数
router.get('/product/:aid',async(ctx)=>{
  let params = ctx.params;
  let query = ctx.request.query;
  let querystring = ctx.request.querystring;
  ctx.body = {
    params,
    query,
    querystring
  };
})
// koa post 请求获取body参数
router.post('/users', async (ctx) => {
  let request = ctx.request;
  let body = ctx.request.body
  let response = ctx.response;

  ctx.body = {
    request,
    body,
    response
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
