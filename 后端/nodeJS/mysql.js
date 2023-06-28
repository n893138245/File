/**
 * 流程：
 *      1. npm安装mysql库：cnpm install mysql，在cd到项目目录下执行。
 *      2. 导入库：var mysql = require('mysql');。
 *      3. 开始连接（地址/用户/密码/数据库名）。
 *      4. 获取表单名称填入。
 *      5. 访问具体数据（增删改查等操作）。
 *      6. 结束连接。
 * 注：
 *      1. 访问的“databse”数据必须存在，否则便会报错。
 *      2. MAC电脑数据库工具“Seqyek Ace”，可以在app store下载。
 */
// 1.安装mysql第三方包
// npm i mysql // npm install mysql

// 2.导入mysql第三方包
var mysql = require('mysql');

// 3.创建连接对象
var connection = mysql.createConnection({
    host: 'localhost', // 如果是操作本地数据库，填写127.0.0.1；如果是远程服务器上的数据库填服务公网ip
    user: 'root', // 通常为root
    password: '123456',
    database: 'testB', // 你所要操作的数据库的名称（是你在mysql中建立的数据库）
    port: '3306' // 默认端口号：3306。可以不写。
});
/*
const connection = mysql.createPool({
    host:"",//如果是操作本地数据库，填写127.0.0.1；如果是远程服务器上的数据库填服务公网ip
    user:"用户名",//通常为root
    password:"",//密码
    database:""//你所要操作的数据库的名称（是你在mysql中建立的数据库）
});
*/
/* */
connection.connect(); // 开始连接数据库
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution); // The solution is:  2 // 意为成功
//   console.log('The solution is: ', results);
});

/* 
// 4.测试连接是否成功
connection.query('select 1', (err, results) => {
    // mysql 模块工作期间报错了
    if (err) return console.log('error:' + err.message);
    // 能够成功的执行 SQL 语句
    console.log('results:' + results); // 结果为：[ RowDataPacket { '1': 1 } ]证明连接成功
});
*/
/* 
// 5.声明待执行的sql语句，使用连接对象执行sql语句
const sqlStr = 'select * from users';
connection.query(sqlStr, (err, results) => {
    // 查询失败
    if (err) return console.log('error:' + err.message);
    // 查询成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是一个对象数组
    console.log('results:' + results);
});
*/

// 数据库操作( CURD )
// 在进行数据库操作前，你需要将本站提供的 Websites 表 SQL 文件websites.sql 导入到你的 MySQL 数据库中。
// 本教程测试的 MySQL 用户名为 root，密码为 123456，数据库为 test，你需要根据自己配置情况修改。
// 查询数据
// 将上面我们提供的 SQL 文件导入数据库后，执行以下代码即可查询出数据：
// 查询数据
var sql = 'SELECT * FROM websites'; // 表单
// 查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    // console.log(result[0]['name']);
    console.log('------------------------------------------------------------\n\n');  
});

/* 
// 插入数据
// 我们可以向数据表 websites 插入数据：
// 插入数据
var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)'; // id可以设定
var addSqlParams = ['菜鸟工具', 'htpps://c.runoob.com', '23453', 'CN'];
// 增
connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
    console.log('INSERT ID:',result);        
    console.log('-----------------------------------------------------------------\n\n');  
});
*/

/* 
// 更新数据
// 我们也可以对数据库的数据进行修改：
// 更新数据
var modSql = 'UPDATE websites SET name = ?, url = ? WHERE Id = ?'; // 可以更改唯一id值，一般不建议'UPDATE websites SET id = newValue, WHERE Id = oldValue'
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.con', 6]; // id好像不能更改
// 改
connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});
*/

/* 
// 删除数据
// 我们可以使用以下代码来删除 id 为 6 的数据:
// 删除数据
var delSql = 'DELETE FROM websites where id=6';
// 删
connection.query(delSql, function (err, result) {
    if (err) {
        console.log('[DELETE ERROR] - ', err.message);
    }
    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');  
});
*/

// -
connection.end(); // 结束数据库连接 // 如果不关闭数据库，终端都是打开的状态。
