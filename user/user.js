  const Router = require('koa-router');
  const fs = require("fs");
  const jwt = require("jsonwebtoken");
  const koaJwt = require('koa-jwt');


  let router = new Router();

  // koa get 请求
  router.get('/api/users/getdata', async (ctx) => {
    let url = ctx.url;
    let query = ctx.query;
    let querystring = ctx.querystring;
    let requery = ctx.request.query;
    let requerystring = ctx.request.querystring;
    ctx.body = {
      url,
      query,
      querystring,
      requery,
      requerystring
    }
  })


  router.get('/mobileapp', ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('user/index.html');
  })

  router.get('/sign', ctx => {
    /* 要在token中携带的信息 */
    let payload = {name: 'morilence'};
    /* 签发token，此处采用对称加解密来加密签名，密钥为: 'fgnb' */
    const token = jwt.sign(payload, 'fgnb');
    ctx.type = 'json';
    ctx.body = {
      token
    };
  })
  router.use('/api', (ctx, next) => { // 自定针对 /api 路由进行处理的中间件
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    console.log('clientToken', clientToken)
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      console.log(decoded);
      /* 验证成功 */
      next();
    } catch (err) {
      console.log(err.name+': '+err.message);
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })
  router.get('/api', ctx => {
    ctx.type = 'json';
    ctx.body = {
      msg: '你追我，如果你追到我，我就让你...'
    };
  })

  router.get('/api1', ctx => {
    ctx.type = 'json';
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      /* 验证成功 */
      ctx.body = {
        msg: '你追我，如果你追到我，我就让你...'
      };
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 登陆
  router.post('/mobileapp/acl/user/login', async (ctx) => {
    let url = ctx.url;
    let body = ctx.request.body
    console.log('1111', body)
    if (body.mobile  && body.password) {
      /* 要在token中携带的信息 */
      let payload = {name: 'morilence'};
      /* 签发token，此处采用对称加解密来加密签名，密钥为: 'fgnb' */
      const token = jwt.sign(payload, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "accessToken": token
        }
      }
    }
    if (body.mobile != '13177777777') {
      ctx.body = {
        "success": false,
        "code": 20001,
        "message": "用户不存在,登录失败",
        "data": {}
      }
    }
    if (body.password != '123456') {
      ctx.body = {
        "success": false,
        "code": 20001,
        "message": "登录失败,请确认密码",
        "data": {}
      }
    }
  })

  // 获取当前用户的角色信息
  router.get('/mobileapp/acl/user/getRoles', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
            "user": {
              "id": "1448534308598861827",
              "mobile": "18277777777",
              "nickname": null,
              "roles": [
                {
                  "id": "1448533292272857090",
                  "name": "管理员",//目前只有管理员和普通用户
                  "createTime": 1634192224000,
                  "modifiedTime": 1634192224000,
                  "isDeleted": 0
                }
              ]
            }
          }
        }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 批量生成二维码
  router.post('/mobileapp/qrcodeinfo/batchcreate', ctx => {
    ctx.type = 'json';
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    // let body = ctx.request.body  //暂时不用 
    let request = ctx.request.query
    console.log('request', request)
   /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
   try {
    decoded = jwt.verify(clientToken, 'fgnb');
    if (request.num) {
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
            "url": "http://192.168.42.1:9002/upload/2021-10-27(1).zip"
        }

      }
    }
  } catch (err) {
    /* 捕获错误即已说明无权，抛出401 */
    ctx.throw(401);
  }
})

  // 查看二维码生成记录
  router.get('/mobileapp/qrcodeinfo/createhistory', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
              "data": [
                  "2021年10月12日 16:00:00,15个,1214422734@qq.com",
                  "2021年10月12日 16:13:40,3个,1214422734@qq.com",
                  "2021年10月13日 11:28:09,3个,1214422734@qq.com"
              ]
          }
        }
      
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 下载二维码压缩包
  router.get('/mobileapp/qrcodeinfo/getCreateZip', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      if(request.createTime) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
            "url": "https://edu-0922.oss-cn-beijing.aliyuncs.com/2021/10/21/2021-10-21(3).zip" //压缩包访问url，访问直接下载
          }        
        }
      }  
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  //  创建场景返回二维码的url
  router.post('/mobileapp/sceneinfo/createAndReturnQr', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let body = ctx.request.body
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      if (body.minInterval) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
            "data": {
              "url": "https://edu-0922.oss-cn-beijing.aliyuncs.com/2021/10/19/a5b7b03ae9a54b358c0d2906c917effc.png"
            }
        }
      }else {
        ctx.throw('params error');
      }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 创建场景并绑定指定的二维码   TODO -> test qrCodeId
  router.post('/mobileapp/sceneinfo/createWithQrCodeId', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let body = ctx.request.body
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      if (body.minInterval) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功", // '已经关联二维码不允许修改'
          "data": {}    
        }
      }else {
        ctx.throw('params error');
      }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 场景信息列表
  router.get('/mobileapp/sceneinfo/getscenes', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      // if(request.type) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
          "1450385278043729922": "上课", //场景id : 场景名称
          "1450388632056672258": "开会"
          }
        }
      // }  
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 设备信息列表
  router.get('/mobileapp/deviceinfo/getDevices', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "1450670680273162241": "摄像头",//设备id:设备名称
          "1450670680273162242": "唢呐",
          "1450670680105390081": "录音机",
          "1450670680340271107": "AKM",
          "1450670680340271106": "BerryM762"
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 场景删除
  router.get('/mobileapp/sceneinfo/remove/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {}
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 科室人员信息多级列表
  router.get('/mobileapp/userinfo/getUserList', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "officeRes": [
            {
              "office": "管理科",
              "userInfoRes": [
                {
                  "userId": "1450667048358244354",
                  "username": "科比",
                  "checked": false
                },
                {
                  "userId": "1450667048920281089",
                  "username": "jack",
                  "checked": false
                }
              ]
            },
            {
              "office": "大队",
              "userInfoRes": [
                {
                  "userId": "1450667048853172225",
                  "username": "谢霆锋",
                  "checked": false
                },
                {
                  "userId": "1450667048983195649",
                  "username": "库里",
                  "checked": false
                }
              ]
            },
            {
              "office": "教育科",
              "userInfoRes": [
                {
                  "userId": "1450667048786063361",
                  "username": "胡歌",
                  "checked": false
                },
                {
                  "userId": "1450667048920281090",
                  "username": "susan",
                  "checked": false
                }
              ]
            }
          ]
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })



  // 管理员查看扫码记录
  router.get('/mobileapp/codescan/getRecords/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "codeScanRecordList": [
            {
            "createrName" :"zhangsan",
            "createTime":"2021-09-09 09:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            }
          ],
          "sceneInfo":{
              "id": "1451473913203666946",//场景id
                      "type": 2,//场景类型
                      "name": "testxx",//场景名称
                      "members": null,
                      "startTime": null,
                      "endTime": null,
                      "content": null,
                      "minInterval": null,
                      "creater": null,
                      "createTime": null,
                      "modifiedTime": null
              }
            }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 创建单个二维码
  router.get('/mobileapp/qrcodeinfo/create', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
            "url": "https://edu-0922.oss-cn-beijing.aliyuncs.com/2021/10/22/3a9c27e6e3034fcea51c0562735d4b80.png"
          }

        }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 根据场景id获取场景详细信息
  router.get('/mobileapp/sceneinfo/getSceneInfo/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "sceneInfo": {
            "id": "1453747641358774273",
            "type": 4,
            "name": "吃泡面",
            "members": "1448534308070379521",
            "memberNames": "甄子丹",
            "admins": "1448534308733079554",
            "adminNames": "谢霆锋",
            "startTime": "2021-10-28 23:35:55",
            "endTime": "2021-10-28 23:35:55",
            "certificate": "",
            "devices": "1450670680273162241;1450670680273162242",
            "deviceNames": "摄像头、扫码仪",
            "content": "{\"tipInfo\":\"别乱扫哦\",\"questionList\":[{\"id\":\"10000\",\"type\":\"input\",\"inputValue\":\"\"}],\"userList\":[{\"office\":\"管理科\",\"userInfoRes\":[{\"userId\":\"1448534308070379521\",\"username\":\"甄子丹\",\"checked\":true}],\"checked\":true},{\"office\":\"教育科\",\"userInfoRes\":[{\"userId\":\"1448534308598861827\",\"username\":\"胡歌\",\"checked\":false}]},{\"office\":\"大队\",\"userInfoRes\":[{\"userId\":\"1448534308733079554\",\"username\":\"谢霆锋\",\"checked\":false}]}],\"adminList\":[{\"office\":\"管理科\",\"userInfoRes\":[{\"userId\":\"1448534308070379521\",\"username\":\"甄子丹\",\"checked\":false}]},{\"office\":\"教育科\",\"userInfoRes\":[{\"userId\":\"1448534308598861827\",\"username\":\"胡歌\",\"checked\":false}]},{\"office\":\"大队\",\"userInfoRes\":[{\"userId\":\"1448534308733079554\",\"username\":\"谢霆锋\",\"checked\":true}],\"checked\":true}],\"deviceList\":[{\"key\":\"1450670680273162241\",\"name\":\"摄像头\",\"checked\":true},{\"key\":\"1450670680273162242\",\"name\":\"扫码仪\",\"checked\":true},{\"key\":\"1450670680105390081\",\"name\":\"录音机\",\"checked\":false},{\"key\":\"1450670680340271107\",\"name\":\"耳机\",\"checked\":false},{\"key\":\"1450670680340271106\",\"name\":\"吹风机\",\"checked\":false}]}",
            "minInterval": 1,
            "creater": "1448534308733079554",
            "createTime": 1635435422000,
            "modifiedTime": 1635435422000
          },
          "url": "https://192.168.1.221:9002/upload/1635438448918/e3ea06dd40264d2a968be354ab963669.png"
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 生成单个二维码
  router.get('/mobileapp/qrcodeinfo/create', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      if(request.createTime) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
            "url": "https://edu-0922.oss-cn-beijing.aliyuncs.com/2021/10/22/3a9c27e6e3034fcea51c0562735d4b80.png"
          }        
        }
      }  
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 管理员场景信息列表
  router.get('/mobileapp/sceneinfo/getAdminScenes', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "sceneInfos": [
            {
              "id": "1451473913203666946",
              "type": 2,
              "name": "testxx",
              "members": null,
              "startTime": null,
              "endTime": null,
              "content": null,
              "minInterval": null,
              "creater": null,
              "createTime": null,
              "modifiedTime": null
            },
            {
              "id": "1451470274284261377",
              "type": 1,
              "name": "看电影11",
              "members": null,
              "startTime": null,
              "endTime": null,
              "content": null,
              "minInterval": null,
              "creater": null,
              "createTime": null,
              "modifiedTime": null
            },
          ]
        }

      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 查看当前用户可扫码的场景列表
  router.get('/mobileapp/sceneinfo/getRelatedScenes', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "sceneInfos": [
            {
              "id": "1451473913203666946",//场景id
              "type": 2,//场景类型
              "name": "testxx",//场景名称
              "members": null,
              "startTime": null,
              "endTime": null,
              "content": null,
              "minInterval": null,
              "creater": null,
              "createTime": null,
              "modifiedTime": null
            }
          ]
        }

      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  
  // 根据二维码id返回二维码下载地址
  router.get('/mobileapp/qrcodeinfo/getUrl/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "url": "https://edu-0922.oss-cn-beijing.aliyuncs.com/2021/10/26/de5bc638965a43c881a3ec76a8f1f435.png"
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 根据场景和日期查看扫码记录
  router.get('/mobileapp/codescan/getRecordsWithSceneId', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "codeScanRecordList": [
            {
            "createrName" :"zhangsan",
            "createTime":"2021-09-09 09:00:00"
            },
            {
            "createrName" :"lisi",
            "createTime":"2021-09-09 10:00:00"
            }
          ]
        }

      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 根据二维码id查看自己对应场景的身份信息
  router.get('/mobileapp/codescan/adminOrNot/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "flag": 2, // 1: 会议管理员 2: 普通参会人员 3:既是会议管理员也是普通参会人员
          "sceneInfo": {
            "id": "1453323240591097857",//场景id
            "type": 4,//场景id
            "name": "吃饭啦啦啦啦啦",//场景名称
            "members": null,
            "admins": "1448534308070379521",
            "startTime": null,
            "endTime": null,
            "content": null,
            "minInterval": null,
            "creater": null,
            "createTime": null,
            "modifiedTime": null
          }
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 根据二维码id查看对应场景的详细信息
  router.get('/mobileapp/codescan/getRequiredFillFormat/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "sceneInfo": {
            "id": "1453323240591097857",//场景id
            "type": 1,//场景类型
            "name": "吃饭啦啦啦啦啦",//场景名称
            "members": "1448534308598861827;1448534308733079554",//场景允许扫码人员，分号分隔
            "admins": "1448534308070379521",//场景管理员，分号分隔
            "startTime": "2021-10-19 09:00:00",
            "endTime": "2021-10-19 09:10:00",
            "content": "xxxx",//填报格式
            "minInterval": 1,//打卡最小间隔，单位：分钟
            "creater": "1448534308733079554",//创建人
            "createTime": 1635334237000,//创建时间
            "modifiedTime": 1635334237000 //更新时间
          }
        }

      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 根据二维码id查看对应的打卡人数和打卡记录
  router.get('/mobileapp/codescan/getRecordsAndNums/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
         "nums": 2, //扫码人数
          "codeScanRecordList": [
            {
              "id": null,
              "qcid": null,
              "message": null,
              "certificate": null,
              "creater": null,
              "createrName": "谢霆锋", //扫码人名称
              "createTime": "2021-10-27 19:58:00", //扫码时间
              "modifiedTime": null
            },
            {
              "id": null,
              "qcid": null,
              "message": null,
              "certificate": null,
              "creater": null,
              "createrName": "谢霆锋",
              "createTime": "2021-10-27 19:53:14",
              "modifiedTime": null
            },
          ]
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 用户填写扫码信息进行扫码
  router.post('/mobileapp/codescan/save', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let body = ctx.request.body
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      if (body.qid) {
        ctx.body = {
          "success": false,
          "code": 20000,
          "message": "成功",
          "data": {}
        }
      }else {
        ctx.throw('params error');
      }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 根据场景id查看自己的打卡记录
  router.get('/mobileapp/codescan/getSelfScanInfo/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request.query;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "codeScanRecords": [
            {
              "id": null,
              "qcid": null,
              "message": "我扫码了哦",//填写的扫码内容
              "certificate": "xxx;xxx",//上传的扫码附件url
              "creater": null,
              "createrName": "谢霆锋",//扫码人
              "createTime": "2021-10-27 19:58:00", //扫码时间
              "modifiedTime": null
            },
            {
              "id": null,
              "qcid": null,
              "message": "我扫码了哦",
              "certificate": "xxx;xxx",
              "creater": null,
              "createrName": "谢霆锋",
              "createTime": "2021-10-27 19:53:14",
              "modifiedTime": null
            }
          ]
        }      
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })

  // 上传文件，返回文件ur
  router.post('/mobileapp/fileUpload/save', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    let request = ctx.request
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      let f1 = ctx.request.files.file;
      console.log(22222, f1)
      decoded = jwt.verify(clientToken, 'fgnb');
      if (true) {
        ctx.body = {
          "success": true,
          "code": 20000,
          "message": "成功",
          "data": {
            "url": "http://192.168.42.1:9002/upload/1635396250487/de5be647aad34d58a5f62bd7a5bcc491userinfo.xlsx"
          }
        }
      }else {
        ctx.throw('params error');
      }
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  // 云之家用户数据同步及用户验证模块   通过ticket获取APP访问token
  router.get('/verity/ticketParse/:id', ctx => {
    /* 从请求头中取出客户端携带的token */
    var clientToken = ctx.headers.accesstoken;
    clientToken =  clientToken.replace('Bearer ', '');
    let decoded = null;
    /* 采用jwt.verify()函数的同步形式，函数返回解码后的内容 */
    try {
      decoded = jwt.verify(clientToken, 'fgnb');
      ctx.body = {
        "success": true,
        "code": 20000,
        "message": "成功",
        "data": {
          "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkcnVnY29udHJvbC11c2VyIiwiaWF0IjoxNjM0MTEzNjczLCJleHAiOjE2MzQyMDAwNzMsImlkIjoiMTQ0ODIwMDQwNTM1MDcxMTI5NyIsIm5pY2tuYW1lIjoiMTMxNzc3Nzc3NzcifQ.UiT2HVNOsgr2-VKozzY6ArzLc8Hcf__9T2Gq8s0nxkw"
        }
      } 
    } catch (err) {
      /* 捕获错误即已说明无权，抛出401 */
      ctx.throw(401);
    }
  })


  module.exports = router


