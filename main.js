const Koa = require('koa');
const koaBody = require('koa-body');
// 处理跨域
const cors = require('koa-cors');
// 处理post请求
const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())
// app.use(cors());

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})


// app.use(koaBody({
//   multipart: true,
//   formidable: {
//       maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
//   }
// }))

// 引用user.js
const userRouter = require('./user/user');
app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

// 引用goods
const goodsRouter = require('./goods/goods');
app
  .use(goodsRouter.routes())
  .use(goodsRouter.allowedMethods());

// 引用goods
const flowYunRouter = require('./flowYun/flowYun');
app
  .use(flowYunRouter.routes())
  .use(flowYunRouter.allowedMethods());

app.listen(3000)
