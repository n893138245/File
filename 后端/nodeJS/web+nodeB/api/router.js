/**
 * 接口方法模块
 * 注册的步骤：主要是实现服务器获取请求体的数据，然后将数据插入数据库，最后给客户端响应。
 */

// server/router.js文件
// 设置路由，定义对应post，URL的处理函数
const express = require("express")
// 创建路由对象
const router = express.Router();
//导入数据库配置对象
const sqlClient = require('./dbconfig')
//导入JWT生成token
const JWT = require("jsonwebtoken")
//导入JWT解密
const expressJWT = require("express-jwt")
// 请求post和url=localhost:3000/api/register 的注册路由
const url = require("url");
const { send } = require("process");


router.post("/register", (req, res) => {
  //接收请求对象携带的数据
  const { username, pass, email } = req.body;
  //sqlClient实现连接数据库，并将用户数据插入数据库 并回调函数响应数据
  sqlClient("insert into user values(null,?,?,?)", [username, pass, email], result => {
    //插入成功 并响应对象数据给客户端
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "注册成功"
      })
    } else {
      res.send({
        statu: 401,
        msg: "注册失败"
      })
    }
  })
})

module.exports = router