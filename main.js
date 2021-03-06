const Koa = require('koa');
// 处理跨域
const cors = require('koa-cors');
// 处理post请求
const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())
app.use(cors());

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
