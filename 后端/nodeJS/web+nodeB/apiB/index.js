/**
 * 目的：解决跨域问题。
 * 结果：成功。
 */

/* // 原生
var http = require('http');
http.createServer( function (req, response) {
  // fail
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:8889");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    response.end('hello, world. today is 2023.05.31 13:01');
    // res.send('hello, world. today is 2023.05.31 13:01');
}).listen(8889);
*/

/* // express */
var express = require('express');
var app = express();

// 注：增加跨域处理，方可终端运行，被访问
//跨域请求处理 后台处理
const cors = require("cors")
// 注册中间件
app.use(cors());

app.get('/', function (req, response) {
  // response.setHeader("Access-Control-Allow-Origin", "http://localhost:8889");
  // response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  // response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  response.send('hello, world. today is 2023.05.31 14:52');
})
 
var server = app.listen(8889, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

