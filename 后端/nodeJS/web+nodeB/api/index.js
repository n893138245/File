/**
 * 创建服务器模块
 * 网址：https://blog.csdn.net/puhuihui/article/details/126292449
 */

//接口服务器 server/index.js文件
// 1.导入express
const express = require("express")
//跨域请求处理 后台处理
const cors = require("cors")
//post传参问题
const bodyParser = require("body-parser")
// 导入自定义路由
const router = require("./router")

// 2.创建web服务器
const app = express()

// 注册中间件
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
//路由访问前缀
app.use('/api', router)

app.get('/', function (req, res) {
  res.send('Hello World. 20');
  // var dict = {
  //   'name':'Steven',
  //   'age': '24',
  //   'funny':'play ball'
  // };
  // res.send(dict);
})

// 3.启动服务器
app.listen(3000, () => {
  console.log('express server running at http://127.0.0.1')
})

/** 
 * 其中，web服务器服务器对象 app，通过导入接口方法模块，并使用app.use('/api', router)实现接口方法应用。
*/