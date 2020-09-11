const Koa = require('koa');
const fs = require('fs');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');

const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())

// 处理GET请求,处理请求参数
// app.use(async(ctx)=>{
//   let url =ctx.url;
//   // 从request中获取GET请求
//   let request =ctx.request;
//   let req_query = request.query;
//   let req_querystring = request.querystring;
//   // 从上下文中直接获取
//   let ctx_query = ctx.query;
//   let ctx_querytring = ctx.querystring;
//
//
//   ctx.body={
//     url,
//     req_query,
//     req_querystring,
//     ctx_query,
//     ctx_querytring
//   }
// });

// 处理POST请求
// app.use(async (ctx) => {
//   console.log('请求方法： ' + ctx.method + '   请求路径：' + ctx.url)
//   //当请求时GET请求时，显示表单让用户填写
//   if(ctx.url === '/' && ctx.method === 'GET') {
//     let html =`
//             <h1>Koa2 request post demo  </h1>
//             <form method="POST" action="/">
//                 <p>姓名： </p>
//                 <input name="userName" type="text" />
//                 <p>年龄： </p>
//                 <input name="age" type="text" />
//                 <p>网站： </p>
//                 <input name="website" type="text" /><br/>
//                 <button type="submit">提交</button>
//             </form>
//         `;
//     ctx.body = html
//   }else if (ctx.url === '/' && ctx.method === 'POST') {
//     //当请求时POST请求时
//     let pastData= ctx.request.body;
//     ctx.body = pastData
//   }else {
//     // 其他请求显示404页面
//     ctx.body = '<h1>404!</h1>'
//   }
// })

// 解析数据
// function parsePostData(ctx){
//   return new Promise((resolve,reject)=>{
//     try{
//       let postdata="";
//       ctx.req.on('data',(data)=>{
//         console.log('data', data)
//         postdata += data
//       })
//       ctx.req.addListener("end",function(){
//         console.log('postdata', postdata)
//         let parseData = parseQueryStr( postdata )
//         resolve(parseData);
//       })
//     }catch(error){
//       reject(error);
//     }
//   });
// }

// 解析数据
// function parseQueryStr(queryStr){
//   let queryData={};
//   let queryStrList = queryStr.split('&');
//   console.log(queryStrList);
//   for( let [index,queryStr] of queryStrList.entries() ){
//     let itemList = queryStr.split('=');
//     console.log(itemList);
//     queryData[itemList[0]] = decodeURIComponent(itemList[1]);
//   }
//   return queryData
// }

// koa原生路由实现
// async function route(url){
//   console.log('url:  ', url)
//   let page = '404.html';
//   switch(url){
//     case '/':
//       page ='index.html';
//       break;
//     case '/index':
//       page ='index.html';
//       break;
//     case '/todo':
//       page = 'todo.html';
//       break;
//     case '/404':
//       page = '404.html';
//       break;
//     default:
//       break;
//   }
//   let html = await render(page);
//   return html;
// }
//
// function render(page){
//   return  new Promise((resolve,reject)=>{
//     let pageUrl = `./page/${page}`;
//     fs.readFile(pageUrl,"binary",(err,data)=>{
//       if(err){
//         reject(err)
//       }else{
//         resolve(data);
//       }
//     })
//   })
// }
//
// app.use(async (ctx) => {
//   let url = ctx.request.url;
//   let html = await route(url);
//
//   ctx.body=html;
// })

// koa-router
// const router = new Router();
// router.get('/users', function (ctx, next) {
//   ctx.body = 'users page'
// })
//
// router.get('/todo', (ctx, next) => {
//   ctx.body = 'todo page'
// })

// 路由层级
// let router = new Router();
// router.get('/jspang/:id',async(ctx)=>{
//   let url =ctx.url;
//   // 从request中获取GET请求
//   let request =ctx.request;
//   let req_query = request.query;
//   let req_querystring = request.querystring;
//   // 从上下文中直接获取
//   let ctx_query = ctx.query;
//   let ctx_querytring = ctx.querystring;
//   // query获取参数
//   let query = ctx.query
//
//   ctx.body={
//     url,
//     req_query,
//     req_querystring,
//     ctx_query,
//     ctx_querytring,
//     query
//   }
// }).get('/todo',async(ctx)=>{
//   ctx.body ='Home ToDo';
// })
//
// let page = new Router();
// page.get('/jspang',async(ctx)=>{
//   ctx.body="Page JSPang";
// }).get('/todo',async(ctx)=>{
//   ctx.body ='Page ToDo';
// })

//装载所有子路由
// const router = new Router();
// router.use('/home',home.routes(),home.allowedMethods());
// router.use('/page',page.routes(),page.allowedMethods());

// 写入cookie操作
// const router = new Router();
// app.use(async(ctx)=>{
//   if(ctx.url=== '/index'){
//     ctx.cookies.set(
//       'MyName','JSPang',{
//         domain:'127.0.0.1', // 写cookie所在的域名
//         path:'/index',       // 写cookie所在的路径
//         maxAge:1000*60*60*24,   // cookie有效时长
//         expires:new Date('2020-12-31'), // cookie失效时间
//         httpOnly:false,  // 是否只用于http请求中获取
//         overwrite:false  // 是否允许重写
//       }
//     );
//     ctx.body = 'cookie is edwin';
//   }else{
//     if( ctx.cookies.get('MyName')){
//       ctx.body = ctx.cookies.get('MyName');
//     }else{
//       ctx.body = 'Cookie is none';
//     }
//   }
// });

// 加载路由中间件

// 加载模板引擎
// const router = new Router();
// app.use(views(path.join(__dirname, './view'), {
//   extension: 'ejs'
// }))
//
// app.use(async (ctx) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title
//   })
// })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
