/**
 * 连接数据库
 * 只需要导入mysql库，即可以实现数据库连接，并向外导出操作数据库的方法对象，该函数返回一个操作结果。
 */
// server/dbconfig.js文件
const mysql = require("mysql")

//定义连接对象
const client = mysql.createConnection({
    host: 'localhost', // 如果是操作本地数据库，填写127.0.0.1；如果是远程服务器上的数据库填服务公网ip
    user: 'root', // 通常为root
    password: '123456',
    database: 'testB', // 你所要操作的数据库的名称（是你在mysql中建立的数据库）
    port: '3306' // 默认端口号：3306。可以不写。
})
/* 
//定义操作数据库的方法，参数为sql语句，数组数据，回调函数
const sqlClient = (sql, arr, callback) => {
  client.query(sql, arr, (error, result) => {
    if (error) {
      //发生错误，返回错误信息
      console.log(error)
      return
    }
    //成功，则调用回调函数返回操作的结果
    callback(result)
  })
}
module.exports = sqlClient
*/

/* 成功：可以连接数据库，并查询数据。*/
client.connect(); // 开始连接数据库
 
client.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution); // The solution is:  2 // 意为成功
//   console.log('The solution is: ', results);
});

// 查询数据
var sql = 'SELECT * FROM websites'; // 表单
// 查
client.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    // console.log(result[0]['name']);
    console.log('------------------------------------------------------------\n\n');  
});

client.end(); // 结束数据库连接 // 如果不关闭数据库，终端都是打开的状态。


/**
 * 使用 mysql 对象的createConnection方法创建连接数据库对象 client，然后 定义一个sqlClient对象，其中 sqlClient 需要参数sql语句，数组数据，便会调用回调函数，并返回sql语句和数据操作数据库的结果。
 * */