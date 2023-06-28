/**
 * 目的：用于测试上线至腾讯云相关测试。主要验证数据库mysql模块。
 * 结果：成功。
 */
const express = require('express');
const mysql = require("mysql") // 数据库索引
const app = express();

// 注：增加跨域处理，方可终端运行，被访问
const cors = require("cors") //跨域请求处理 后台处理
app.use(cors()); // 注册中间件

const client = mysql.createConnection({ // 数据库配置
    host: '82.156.141.27',
    user: 'testc',
    password: '123456',
    database: 'testc',
    port: '3306'
});
client.connect(); // 数据库连接
client.query('SELECT 1 + 1 AS solution', function (error, results, fields) { // 数据库连接判断
    if (error) throw error;
    console.log('连接数据库成功-The solution is: ', results[0].solution);
});

// client.end(); // 数据库关闭

// 与数据库无关
app.get('/', function (req, res) {
    res.send('Hello World!');
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

// 对外接口-增加数据到数据库
app.use(express.json());
app.post('/api/newsAdd', (req, res) => {
    /* */
    const {name, url, alexa, country} = req.body;
    var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var addSqlParams = [name, url, alexa, country];
    console.log('All value:' + name + url + alexa + country);
    client.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:',result);    
        // res.json(result);
        console.log('-----------------------------------------------------------------\n\n');  
    });
    res.send({'info': '服务端发送给客户端的信息，你能看到么！增'});
});

// 对外接口-删除数据库数据
app.delete('/api/newsDelete/:id', (req, res) => {
    const { id } = req.params;
    var delSql = 'DELETE FROM websites where id=?';
    var delSqlParams = [id];
    client.query(delSql, delSqlParams, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
        }
        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
    res.send({'info': '服务端发送给客户端的信息，你能看到么！删'});
});

// 对外接口-更改数据库数据
app.put('/api/newsChange/:id', (req, res) => {
    const {id} = req.params;
    const {name, url, alexa, country} = req.body;
    var modSql = 'UPDATE websites SET name = ?, url = ?, alexa = ?, country = ? where id = ?'; // 后两个参数不需要打“逗号”？ // 后一个参数不需要打“逗号”？
    var modSqlParams = [name, url, alexa, country, id];
    client.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
    res.send({'info': '服务端发送给客户端的信息，你能看到么！改'});
});

// 根据新闻ID获取单个新闻 - 查询某个具个表单中具体的数据
app.get('/api/news/:id', (req, res) => {
    /* // 这个是基于先查询数据的基础上，有弊端
    const newsId = parseInt(req.params.id);
    const news = newsData.find(item => item.id === newsId);
    if (news) {
      res.json(news);
      // res.end(news);
    } else {
      res.status(404).json({ error: '新闻不存在' });
    }
    */
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

// 监听端口
const port = 8889;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
