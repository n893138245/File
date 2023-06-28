/**
 * 目的：读取mysql数据库，显示在前端。
 * 结果：成功。
 * 注：若使用数据库工具“Sequel Ace”对数据进行操作，无法及时响应，需重启服务器前端数据方可更新。
 */
const express = require('express');
const mysql = require("mysql")
const app = express();

// 注：增加跨域处理，方可终端运行，被访问
const cors = require("cors") //跨域请求处理 后台处理
app.use(cors()); // 注册中间件

const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'testB',
    port: '3306'
});
client.connect();
client.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('连接数据库成功-The solution is: ', results[0].solution);
});
var sql = 'SELECT * FROM websites'; // 表单
var newsData;
client.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    newsData = result;
    console.log('------------------------------------------------------------\n\n');  
});
client.end();

// 获取所有新闻
app.get('/api/news', (req, res) => {
  res.json(newsData);
    console.log('newsData:' + newsData);
    // res.end(newsData);
});

// 根据新闻ID获取单个新闻
app.get('/api/news/:id', (req, res) => {
  const newsId = parseInt(req.params.id);
  const news = newsData.find(item => item.id === newsId);
  if (news) {
    res.json(news);
    // res.end(news);
  } else {
    res.status(404).json({ error: '新闻不存在' });
  }
});

// 监听端口
const port = 8889;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
