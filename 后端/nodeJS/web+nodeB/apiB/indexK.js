/**
 * 目的：node.js安全
 * 结果：其它失败。ddos成功。
 */

/* 
const querystring = require('querystring');
// const Controller = require('../../core/controller');
const Controller = require('../api');
class Eval extends Controller {
    index() {
        const params = querystring.parse(this.ctx.request.querystring);
        // 获取参数 r
        let r = decodeURI(params['r']);
        // 根据参数 r 动态调用 this._p() 获取执行结果
        let ret = eval(`this._q() + ${r}`);
        return this.resApi(true, 'good', ret);
    }
    _q () {
        return 1;
    }
    _p () {
        return 2;
    }
}
module.exports = Eval;
*/

/**/
var Ddos = require('ddos');
var express = require('express');
var ddos = new Ddos({burst:10, limit:15});
var app = express();
app.use(ddos.express);

app.get('/', function(req, res) {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world.2'); // 设置为end后，状态码正确。
    // res.send('Hello, world.2'); // 设置send后，即使设置了状态码，也是不正确的。
    console.log('客户端对服务器发来的请求！');
});
// }).listen(3000); // success

var server = app.listen(3000, function() {
    console.log('请打开：http://127.0.0.1:3000/');
});
// console.log('server:' + server);
// console.log(server);