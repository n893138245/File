/**
 * 目的：用于测试上线至腾讯云相关测试。主要验证数据库mysql模块。
 * 结果：成功。
 */
var express = require('express');
var app = express();
const cors = require("cors") // 解决跨域
app.use(cors()); // 解决跨域
app.get('/', function (req, res) {
    res.send('hello, world. today is 2023.06.07 10:10');
});
var server = app.listen(8891, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
/* */
// 数据库相关操作
const mysql = require("mysql") // 数据库索引
/* */
const client = mysql.createConnection({ // 数据库配置
    host: '82.156.141.27',
    user: 'testc',
    password: '123456',
    database: 'testc',
    port: '3306'
});

/* 
const client = mysql.createConnection({ // 数据库配置
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'testB',
  port: '3306'
});
*/
client.connect(); // 数据库连接
app.get('/api/mysql/connect', function (req, res) {
  client.query('SELECT 1 + 1 AS solution', function (error, results, fields) { // 数据库连接判断
    if (error) throw error;
    console.log('连接数据库成功-The solution is: ', results[0].solution);
    if (results[0].solution === 2) {
      res.send('成功连接数据库');
    } else {
      res.send('失败连接数据库');
    }
  });
});

// 获取所有新闻 // 对应“查询数据库”
app.get('/api/news', (req, res) => {
  var sql = 'SELECT * FROM websites'; // 表单 // 数据库表单
  client.query(sql, function (err, result) { // 数据库查询
      if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
      }
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      res.json(result);
      console.log('------------------------------------------------------------\n\n');  
  });
  // res.send({'info': '服务端发送给客户端的信息，你能看到么！查'});
});

// 根据新闻ID获取单个新闻 - 查询某个具个表单中具体的数据
app.get('/api/news/:id', (req, res) => {
  const {id} = req.params;
  var sql = 'SELECT * FROM websites where id=?'; // 表单 // 数据库表单
  var searchDetailSqlParams = [id];
  client.query(sql, searchDetailSqlParams, function (err, result) { // 数据库查询
      if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
      }
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      res.json(result);
      console.log('------------------------------------------------------------\n\n');  
  });
});