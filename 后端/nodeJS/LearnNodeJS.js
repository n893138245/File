/**
 * Node.js learn
 * 网页：https://www.runoob.com/nodejs/nodejs-tutorial.html
 * 注：文中的文件命名啥的，与学习的网站不同。需注意。
 */

/**/
// 步骤二、创建服务器
var http = require('http');
http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.end('hello, world!2');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');


/*
注：在终端进行代码编写
REPL(交互式解释器)：简单的表达式运算、使用变量、多行表达式、下划线(_)变量、REPL 命令、停止 REPL。
网页：https://www.runoob.com/nodejs/nodejs-repl.html
*/

// ——————————————————————————————

// 回调函数
// function foo1(name, age, callback) {}
// function foo2(value, callback1, callback2) {}

// 阻塞代码实例：参考 main.js 文件，仅能单独运行，故注释。
/*
var fs = require('fs');
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('End');
*/

// 非阻塞代码实例：参考 main.js 文件，仅能单独运行，故注释。
/*
var fs = require('fs');
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
console.log('End');
*/

// ——————————————————————————————

// 事件循环
// 事件驱动程序
/*
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.eventEmitter();
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
// 触发事件
eventEmitter.emit('eventName');
 */
/* 
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var connectHandler = function connected() {
    console.log('连接成功');
    // 触发 data_received 事件
    eventEmitter.emit('data_received');
}
// 绑定 connection 事件的处理程序
eventEmitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function() {
    console.log('数据接收成功');
});
// 触发 connection 事件
eventEmitter.emit('connection');
console.log('End');
*/

// Node 应用程序是如何工作的？
/*
var fs = require('fs');
fs.readFile('input.txt', function(err, data) {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});
console.log("程序执行完毕");
*/

// ——————————————————————————————

// EventEmitter
/*
// 引入 event 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.eventEmitter();
*/
// EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。
// 下面我们用一个简单的例子说明 EventEmitter 的用法：
// event.js文件 ？想让我创建一个这个文件夹？
/* 
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function() {
    console.log('some_event 事件触发');
});
setTimeout(function() {
    event.emit('some_event');
}, 1000);
*/
// EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
// 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
// 让我们以下面的例子解释这个过程：
/* 
// event.js文件
var events = require('events');
const { emit } = require('process');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});
var listener3 = function listener3() {
    console.log('listener3');
}
emitter.addListener('someEvent', listener3);
emitter.addListener('someEvent', function listener4() {
    console.log('listener4');
});
emitter.removeListener('someEvent', listener3); // 删除某个监听事件
// emitter.removeListener('someEvent', listener4); // error：删除某个监听事件
// emitter.removeAllListeners('someEvent'); // 删除所有监听事件
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
*/
// 以上例子中，emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。
// 运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是EventEmitter最简单的用法。
// EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。
// 重要：接下来我们来具体看下 EventEmitter 的属性介绍。
// 参考网址：https://www.runoob.com/nodejs/nodejs-event.html
/*
var events = require('events');
var eventEmitter = new events.EventEmitter();
// 监听器 #1
var listener1 = function listener1() {
    console.log('监听器 listener1 执行。');
}
// 监听器 #2
var listener2 = function listener2() {
    console.log('监听器 listener2 执行。');
}
// 绑定 connection 事件，处理函数为listener1
eventEmitter.addListener('connection', listener1);
// 绑定 connection 事件，处理函数为listener2
eventEmitter.on('connection', listener2);
// 计算有N个监听事件？
var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件");
// 处理 connection 事件
eventEmitter.emit('connection');
// 移除绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");
// 触发连接事件
eventEmitter.emit('connection');
// 计算有N个监听事件？
eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件");
console.log("程序执行完毕。");
 */

// error 事件
/*
var events = require('events');
var emitter = new events.EventEmitter();
emitter.emit('error'); // 会主动告知错误
*/

// 继承 EventEmitter
// 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
// 为什么要这样做呢？原因有两点：
// 首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。
// 其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

// ——————————————————————————————

// Buffer(缓冲区)（缓冲器）
// JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
// 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
// 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
// 在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。
/*
const buf = Buffer.from('runoob', 'ascii');
console.log(buf.toString('hex')); // 输出 72756e6f6f62
console.log(buf.toString('base64')); // 输出 cnVub29i
*/
// Node.js 目前支持的字符编码包括：
// ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
// utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
// utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
// ucs2 - utf16le 的别名。
// base64 - Base64 编码。
// latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
// binary - latin1 的别名。
// hex - 将每个字节编码为两个十六进制字符。

// 创建 Buffer 类
// Buffer 提供了以下 API 来创建 Buffer 类：
// Buffer.alloc(size[, fill[, encoding]]); //： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
// Buffer.allocUnsafe(size); //： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
// Buffer.allocUnsafeSlow(size)
// Buffer.from(array); //： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
// Buffer.from(arrayBuffer[, byteOffset[, length]]); //： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
// Buffer.from(buffer); //： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
// Buffer.from(string[, encoding]); //： 返回一个被 string 的值初始化的新的 Buffer 实例
// 以上是错误代码
/*
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('test');
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('test', 'latin1');
console.log(buf1);
console.log(buf2);
console.log(buf3);
console.log(buf4);
console.log(buf5);
console.log(buf6);
*/
// 写入缓冲区
// 写入 Node 缓冲区的语法如下所示：

// 参数
// 参数描述如下：
// string - 写入缓冲区的字符串。
// offset - 缓冲区开始写入的索引值，默认为 0 。
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8' 。
// 根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。
// buf.write(string[a, offset[bc, length]][def, encoding]) // 测试代码，正确语法，输出错误：ReferenceError: buf is not defined。
// buf.write(string['1', offset['2', length]]['3', encoding]) // 测试代码，正确语法，输出错误：ReferenceError: buf is not defined。
// buf.write(string[, offset[, length]][, encoding]) // 正式代码，错误
// const buf = Buffer.alloc(10); // 测试代码，仍是错误。
// Buffer.write(string[, offset[, length]][, encoding]) // 测试代码，仍是错误。
// buf.write(String[, offset[, length]][, encoding]) // 测试代码，仍是错误。
// 返回值
// 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
// 实例
/*
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");
console.log('写入字节数：' + len); // 输出：写入字节数：14
*/
// 从缓冲区读取数据
// 语法
// 读取 Node 缓冲区数据的语法如下所示：
// 参数
// 参数描述如下：
// encoding - 使用的编码。默认为 'utf8' 。
// start - 指定开始读取的索引位置，默认为 0。
// end - 结束位置，默认为缓冲区的末尾。
// buf.toString([encoding[, start[, end]]]); // 正式代码，语法错误
// buf.toString([encoding[len, start[len, end]]]); // 测试代码：语法正确，输出错误
// console.log('test' + buf.toString([encoding[len, start[len, end]]])); // 语法正确，输出错误
// buf.toString([encoding[a, start[b, end]]]); // 测试代码：语法正确，输出错误
// 返回值
// 解码缓冲区数据并使用指定的编码返回字符串。
// 实例
/*
buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}
console.log(buf.toString('ascii')) // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii',0,5)); //使用 'ascii' 编码, 并输出: abcde
console.log(buf.toString('utf8',0,5)); //使用 'utf8' 编码, 并输出: abcde
console.log(buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde
*/
// 将 Buffer 转换为 JSON 对象
// 语法
// 将 Node Buffer 转换为 JSON 对象的函数语法格式如下：
// buf.toJSON();
/*
console.log(buf.toJSON());
*/
// 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
// 返回值
// 返回 JSON 对象。
// 实例
/*
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x64]);
const json = JSON.stringify(buf);
console.log(json); // 输出: {"type":"Buffer","data":[1,2,3,4,5]}
const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
});
console.log(copy) // 输出: <Buffer 01 02 03 04 05>
*/

// 缓冲区合并
// 语法
// Node 缓冲区合并的语法如下所示：
// Buffer.concat(list[, totalLength])
// 参数
// 参数描述如下：
// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。
// 返回值
// 返回一个多个成员合并的新 Buffer 对象。
// 实例
/* 
var buffer1 = Buffer.from('菜鸟教程');
var buffer2 = Buffer.from('www.runoob.com');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('buffer3 内容：' + buffer3.toString()); // buffer3 内容：菜鸟教程www.runoob.com
*/

// 缓冲区比较
// 语法
// Node Buffer 比较的函数语法如下所示, 该方法在 Node.js v0.12.2 版本引入：
// buf.compare(otherBuffer);
// 参数
// 参数描述如下：
// otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
// 返回值
// 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
// 实例
/*
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);
console.log('result:' + result);
if (result < 0) {
    console.log(buffer1 + '在' + buffer2 + '之前');
} else if (result == 0) {
    console.log(buffer1 + '在' + buffer2 + '相同');
} else {
    console.log(buffer1 + '在' + buffer2 + '之后');
}
// 输出：ABC在ABCD之前
*/

/*
// 拷贝缓冲区
// 语法
// Node 缓冲区拷贝语法如下所示：
// buf.copy(targetBuffer[, targetStart[, SourceStart[, sourceEnd]]]);
// 参数
// 参数描述如下：
// targetBuffer - 要拷贝的 Buffer 对象。
// targetStart - 数字, 可选, 默认: 0
// sourceStart - 数字, 可选, 默认: 0
// sourceEnd - 数字, 可选, 默认: buffer.length
// 返回值
// 没有返回值。
// 实例
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');
// 将buf2插入到buf1指定位置上
buf2.copy(buf1, 2);
console.log(buf1.toString()); // 输出：abRUNOOBijkl
*/

/*
// 缓冲区裁剪
// Node 缓冲区裁剪语法如下所示：
// buf.slice([start[, end]]);
// 参数
// 参数描述如下：
// start - 数字, 可选, 默认: 0
// end - 数字, 可选, 默认: buffer.length
// 返回值
// 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
// 实例
var buffer1 = Buffer.from('runoob');
// 剪辑缓冲区
var buffer2 = buffer1.slice(0,2);
console.log('buffer2 content:' + buffer2.toString()); // 输出：buffer2 content:ru
*/

/*
// 缓冲区长度
// 语法
// Node 缓冲区长度计算语法如下所示：
// buf1.length;
// 返回值
// 返回 Buffer 对象所占据的内存长度。
// 实例
var buffer = Buffer.from('www.runoob.com');
// 缓冲区长度
console.log("buffer length: " + buffer.length); // 输出：buffer length: 14
*/

// ——————————————————————————————

// Node.js Stream(流)
// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
// Node.js，Stream 有四种流类型：
// Readable - 可读操作。
// Writable - 可写操作。
// Duplex - 可读可写操作.
// Transform - 操作被写入数据，然后读出结果。
// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。
// 本教程会为大家介绍常用的流操作。

/*
// 从流中读取数据
// 创建 input.txt 文件，内容如下：
// 菜鸟教程官网地址：www.runoob.com
// 创建 main.js 文件, 代码如下：
var fs = require('fs');
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为utf8
readerStream.setEncoding('UTF8');
// 处理流事件 --> data，end，and error
readerStream.on('data', function(chunk) {
    data += chunk;
});
readerStream.on('end', function() {
    console.log(data);
});
readerStream.on('error', function(err) {
    console.log(err.stack);
});
console.log('程序执行完毕'); 
// 输出：
// 程序执行完毕
// 这是一个input.txt文件，专门用于测试。
*/

/*
// 写入流
// 创建 main.js 文件, 代码如下：
var fs = require('fs');
var data = '菜鸟教程官网地址：www.runoob.com5';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(data, 'UTF8'); // 数据格式必须定义，否则无法写入。
// 标记文件末尾
writerStream.end();
// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log('写入完成');
});
writerStream.on('error', function(err) {
    console.log(err.stack);
});
console.log('程序执行完毕');
// 输出
// 程序执行完毕
// 写入完成
// 注：
// 1. 若当前文件夹没有“output.txt”文件，则会新创建一个。
// 2. output.txt文件内若有内容，会被覆盖。
*/

/*
// 管道流
// 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
// https://www.runoob.com/nodejs/nodejs-stream.html
// 如上面的图片所示，我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。
// 以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。
// 设置 input.txt 文件内容如下：
// 菜鸟教程官网地址：www.runoob.com
// 管道流操作实例
// 创建 main.js 文件, 代码如下：
var fs = require('fs');
// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');
// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
// 输出：序执行完毕
// 查看 output.txt 文件的内容：input.txt里面是啥内容，它就是啥内容呗。
*/

/* 
// 链式流
// 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
// 接下来我们就是用管道和链式来压缩和解压文件。
// 创建 compress.js 文件, 代码如下：
var fs = require('fs');
var zlib = require('zlib');
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));
console.log("文件压缩完成。"); // 输出：文件压缩完成。
*/

/* 
// 执行完以上操作后，我们可以看到当前目录下生成了 input.txt 的压缩文件 input.txt.gz。
// 接下来，让我们来解压该文件，创建 decompress.js 文件，代码如下：
var fs = require('fs');
var zlib = require('zlib');
// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('inputB.txt'));
console.log("文件解压完成。"); // 输出：文件解压完成。
*/

// ——————————————————————————————

// Node.js模块系统
// 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
// 模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
// 引入模块
// 在 Node.js 中，引入一个模块非常简单，如下我们创建一个 main.js 文件并引入 hello 模块，代码如下:
/* 
var hello = require('./hello');
hello.world();
*/
// 以上实例中，代码 require('./hello') 引入了当前目录下的 hello.js 文件（./ 为当前目录，node.js 默认后缀为 js）。
// Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
// 接下来我们就来创建 hello.js 文件，代码如下：
// exports.world = function() {
//     console.log('hello world.');
// }
// 在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。
// 有时候我们只是想把一个对象封装到模块中，格式如下：
// module.exports = function() {
//     // ...
// }
// 这样就可以直接获得这个对象了：
//main.js 
/*
var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
*/
// 模块接口的唯一变化是使用 module.exports = Hello 代替了exports.world = function(){}。 在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。

// 服务端的模块放在哪里
// 也许你已经注意到，我们已经在代码中使用了模块了。像这样：
// var http = require('http');
// ...
// http.createServer(...);

// Node.js 中自带了一个叫做 http 的模块，在我们的代码中请求它并把返回值赋给一个本地变量。
// 这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。
// Node.js 的 require 方法中的文件查找策略如下：
// 由于 Node.js 中存在 4 类模块（原生模块和3种文件模块），尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同。如下图所示：
// https://www.runoob.com/nodejs/nodejs-module-system.html
// 从文件模块缓存中加载
// 尽管原生模块与文件模块的优先级不同，但是都会优先从文件模块的缓存中加载已经存在的模块。
// 从原生模块加载
// 原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载。
// 原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。
// 从文件加载
// 当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前一节中已经介绍过，这里我们将详细描述查找文件模块的过程，其中，也有一些细节值得知晓。
// require方法接受以下几种参数的传递：
// http、fs、path等，原生模块。
// ./mod或../mod，相对路径的文件模块。
// /pathtomodule/mod，绝对路径的文件模块。
// mod，非原生模块的文件模块。
// 在路径 Y 下执行 require(X) 语句执行顺序：
// 1. 如果 X 是内置模块
//    a. 返回内置模块
//    b. 停止执行
// 2. 如果 X 以 '/' 开头
//    a. 设置 Y 为文件根路径
// 3. 如果 X 以 './' 或 '/' or '../' 开头
//    a. LOAD_AS_FILE(Y + X)
//    b. LOAD_AS_DIRECTORY(Y + X)
// 4. LOAD_NODE_MODULES(X, dirname(Y))
// 5. 抛出异常 "not found"

// LOAD_AS_FILE(X)
// 1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
// 2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
// 3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
// 4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

// LOAD_INDEX(X)
// 1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
// 2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
// 3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

// LOAD_AS_DIRECTORY(X)
// 1. 如果 X/package.json 是一个文件,
//    a. 解析 X/package.json, 并查找 "main" 字段。
//    b. let M = X + (json main 字段)
//    c. LOAD_AS_FILE(M)
//    d. LOAD_INDEX(M)
// 2. LOAD_INDEX(X)

// LOAD_NODE_MODULES(X, START)
// 1. let DIRS=NODE_MODULES_PATHS(START)
// 2. for each DIR in DIRS:
//    a. LOAD_AS_FILE(DIR/X)
//    b. LOAD_AS_DIRECTORY(DIR/X)

// NODE_MODULES_PATHS(START)
// 1. let PARTS = path split(START)
// 2. let I = count of PARTS - 1
// 3. let DIRS = []
// 4. while I >= 0,
//    a. if PARTS[I] = "node_modules" CONTINUE
//    b. DIR = path join(PARTS[0 .. I] + "node_modules")
//    c. DIRS = DIRS + DIR
//    d. let I = I - 1
// 5. return DIRS

// exports 和 module.exports 的使用
// 如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。

// ——————————————————————————————

// Node.js 函数
/*
// 在 JavaScript中，一个函数可以作为另一个函数的参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。
// Node.js 中函数的使用与 JavaScript 类似，举例来说，你可以这样做：
function say(word) {
    console.log(word);
}
function excute(someFunction, value) {
    someFunction(value);
}
excute(say, 'hello');
// 以上代码中，我们把 say 函数作为 execute 函数的第一个变量进行了传递。这里传递的不是 say 的返回值，而是 say 本身！
// 这样一来， say 就变成了execute 中的本地变量 someFunction ，execute 可以通过调用 someFunction() （带括号的形式）来使用 say 函数。
// 当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。
*/

/* 
// 匿名函数
// 我们可以把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：
function excute(someFunction, value) {
    someFunction(value);
}
excute(function(word){ console.log(word) } ,'hello');
// 我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。
// 用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做匿名函数 。
*/

/*
// 函数传递是如何让HTTP服务器工作的
// 带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：
var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello,world.3');
    response.end();
}).listen(8888);
*/

/* 
// 现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。
// 用这样的代码也可以达到同样的目的：
var http = require('http');
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello,world.4');
    response.end();
}
http.createServer(onRequest).listen(8888);
*/

// ——————————————————————————————

/* 
// Node.js 路由
// 我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。
// 因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。
// 我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。
// url.parse(string).query
// |
// url.parse(string).pathname      |
// |                   |
// |                   |
// ------ -------------------
// http://localhost:8888/start?foo=bar&hello=world
// ---       -----
// |          |
// |          |
// querystring.parse(queryString)["foo"]    |
//  |
// querystring.parse(queryString)["hello"]
// 当然我们也可以用 querystring 模块来解析 POST 请求体中的参数，稍后会有演示。
// 现在我们来给 onRequest() 函数加上一些逻辑，用来找出浏览器请求的 URL 路径：
// server.js 文件代码：
// var http = require('http');
// var url = require('url');
// function start() {
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log('Request for' + pathname + 'received');
//         response.writeHead(200, {'Context-Type': 'text/plain'});
//         response.write('hello, world.5');
//         response.end();
//     }
//     http.createServer(onRequest).listen(8888);
//     console.log('Server has started');
// }
// exports.start = start;
// 好了，我们的应用现在可以通过请求的 URL 路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以 URL 路径为基准映射到处理程序上。
// 在我们所要构建的应用中，这意味着来自 /start 和 /upload 的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。
// 现在我们可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：
// router.js 文件代码：
// function route(pathname) {
//     console.log('About to route a request for' + pathname);
// }
// exports.route = route;
// 如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。
// 我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上，但是其它语言的编程经验告诉我们这会是一件非常痛苦的事，因此我们将使用依赖注入的方式较松散地添加路由模块。
// 首先，我们来扩展一下服务器的 start() 函数，以便将路由函数作为参数传递过去，server.js 文件代码如下
// server.js 文件代码：
var http = require('http');
var url = require('url');
function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for' + pathname + 'received');
        
        route(pathname);

        response.writeHead(200, {'Context-Type': 'text/plain'});
        response.write('hello, world.5');
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log('Server has started');
}
exports.start = start;
// 同时，我们会相应扩展 index.js，使得路由函数可以被注入到服务器中：
// index.js 文件代码：
// var server = require('./server');
// var router = require('./router');
// server.start(router.route);
// 在这里，我们传递的函数依旧什么也没做。
// 如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，你将会看到应用输出相应的信息，这表明我们的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：
*/

// ——————————————————————————————
/*
// Node.js 全局对象
// JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
// 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
// 在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。
// 全局对象与全局变量
// global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
// 在最外层定义的变量；
// 全局对象的属性；
// 隐式定义的变量（未定义直接赋值的变量）。
// 当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。需要注 意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。
// 注意： 最好不要使用 var 定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。
// __filename
// __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
// 实例
// 创建文件 main.js ，代码如下所示：
// 输出全局变量 __filename 的值
console.log(__filename); // 输出：/Users/sansimac/Desktop/聂秀盛/文件/学习不同编程语言/NodeJS/Coding/HelloWorld/server.js
// __dirname
// __dirname 表示当前执行脚本所在的目录。
// 实例
// 创建文件 main.js ，代码如下所示：
// 输出全局变量 __dirname 的值
console.log(__dirname); // 输出：/Users/sansimac/Desktop/聂秀盛/文件/学习不同编程语言/NodeJS/Coding/HelloWorld
// setTimeout(cb, ms)
// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
// 返回一个代表定时器的句柄值。
// 实例
// 创建文件 main.js ，代码如下所示：
function printHello() {
    console.log('Hello, world.');
}
setTimeout(printHello, 2000); // 方式一
// setTimeout(() => { // 方式二
//     printHello();
// }, 2000);
// clearTimeout(t)
// clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器。
// 实例
// 创建文件 main.js ，代码如下所示：
function printHelloB() {
    console.log('Hello, worldB');
}
var t = setTimeout(printHelloB, 2000);
clearTimeout(t); // 清除定时器
// setInterval(cb, ms)
// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
// 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
// setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
// 实例
// 创建文件 main.js ，代码如下所示：
function printHelloC() {
    console.log('Hello, worldC');
}
// 两秒后执行以上函数 // 重复调用
setInterval(printHelloC, 2000); // 方式一
// setInterval(() => { // 方式二
//     printHelloC();
// }, 2000);
*/
// console
// console 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试工具，后来逐渐成为浏览器的实施标准。
// Node.js 沿用了这个标准，提供与习惯行为一致的 console 对象，用于向标准输出流（stdout）或标准错误流（stderr）输出字符。
// console 方法
// 以下为 console 对象的方法:
// var string = 'hello, world. 11';
// console.log(string);
// console.info(string);
// console.error(string);
// console.warn(string);
// console.time(string);
// console.timeEnd(string);
// console.log('test output: start %d end', 515);
// console.log('test output: start %s end', 'haha');
// console.log('Hello world'); 
// console.log('byvoid%diovyb'); 
// console.log('byvoid%diovyb', 1991); 
// console.trace(); // 向标准错误流输出当前的调用栈。
// 注：以上console各种状态(warn、error)在浏览器才能显示出来。
// 实例
// 创建文件 main.js ，代码如下所示：
/* 
console.info('程序开始执行：');
var counter = 10;
console.log('计数：%d', counter);
console.time('获取数据');
// 执行一些代码
for (var i=0; i < 80000; i++) {
    console.log('我有 %d 个梦想。————马丁路德', i);
}
console.timeEnd('获取数据');
console.info('程序执行完毕');
*/
// process
// process 是一个全局变量，即 global 对象的属性。
// 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
// 序号	事件 & 描述
// 1	exit
// 当进程准备退出时触发。
// 2	beforeExit
// 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
// 3	uncaughtException
// 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
// 4	Signal 事件
// 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。
// 实例
// 创建文件 main.js ，代码如下所示：
/* 
process.on('exit', function(code) {
    // 以下代码永远不会执行
    setTimeout(function() {
        console.log('该代码不会执行');
    }, 0);
    console.log('退出码为：',code);
});
console.log('程序执行结束');
*/
// 实例
// 创建文件 main.js ，代码如下所示：
// 输出到终端
/*
process.stdout.write('hello world' + '\n');
// 通过参数读取
process.argv.forEach(function(val, index, array) {
    console.log(index + ':' + val);
});
// 获取执行路径
console.log(process.execPath);
// 平台信息
console.log(process.platform);
*/
// 实例
// 创建文件 main.js ，代码如下所示：
// 输出当前目录
/*
console.log('当前目录：' + process.cwd());
// 输出当前版本
console.log('当前版本：' + process.version);
// 输出内存使用情况
console.log(process.memoryUsage());
*/

// ——————————————————————————————
// Node.js 常用工具
// util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。
// 使用方法如下：
// const util = require('util');
// util.callbackify
// util.callbackify(original) 将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数，例如将 (err, value) => ... 回调作为最后一个参数。 在回调函数中，第一个参数为拒绝的原因（如果 Promise 解决，则为 null），第二个参数则是解决的值。
// 实例
/* 
const util = require('util');
async function fn() {
    return 'hello, world';
}
const callbackFunction = util.callbackify(fn);
callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret);
});
*/
/*
// 回调函数是异步执行的，并且有异常堆栈错误追踪。 如果回调函数抛出一个异常，进程会触发一个 'uncaughtException' 异常，如果没有被捕获，进程将会退出。
// null 在回调函数中作为一个参数有其特殊的意义，如果回调函数的首个参数为 Promise 拒绝的原因且带有返回值，且值可以转换成布尔值 false，这个值会被封装在 Error 对象里，可以通过属性 reason 获取。
const util = require('util');
function fn() {
    return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);
callbackFunction((err, ret) => {
    // 当 Promise 被以 `null` 拒绝时，它被包装为 Error 并且原始值存储在 `reason` 中。
    err && err.hasOwnProperty('reason') && err.reason === null; // true
});
// original 为 async 异步函数。该函数返回传统回调函数。
*/
// util.inherits
// util.inherits(constructor, superConstructor) 是一个实现对象间原型继承的函数。
// JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。 // 重要
// 在这里我们只介绍 util.inherits 的用法，示例如下：
/*
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('1:' + 'Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log('2:' + this.name);
}
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
// console.log('3:' + objBase);
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
// console.log('4:' + objSub);
console.log(objSub);
*/
// 我们定义了一个基础对象 Base 和一个继承自 Base 的 Sub，Base 有三个在构造函数内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承。运行结果如下：
// 2:base
// 1:Hello base
// Base { name: 'base', base: 1991, sayHello: [Function (anonymous)] }
// 2:sub
// Sub { name: 'sub' }
// 注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。 // 重要
// 同时，在原型中定义的属性不会被 console.log 作 为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到：
// -
// util.inspect
// util.inspect(object,[showHidden],[depth],[colors]) 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
// showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
// depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归 2 层，指定为 null 表示将不限递归层数完整遍历对象。 如果 colors 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
// 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了 toString 方法也不会调用。
/*
var util = require('util');
function Person() {
    this.name = 'byvoid';
    this.toString = function() {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
*/
// 输出：
// Person { name: 'byvoid', toString: [Function (anonymous)] }
// Person {
//   name: 'byvoid',
//   toString: <ref *1> [Function (anonymous)] {
//     [length]: 0,
//     [name]: '',
//     [arguments]: null,
//     [caller]: null,
//     [prototype]: { [constructor]: [Circular *1] }
//   }
// }
// -
/* 
// util.isArray(object)
// 如果给定的参数 "object" 是一个数组返回 true，否则返回 false。
var util = require('util');
util.isArray([]);
util.isArray(new Array);
util.isArray({});
console.log(util.isArray([])); // true
console.log(util.isArray(new Array)); // true
console.log(util.isArray({})); // false
*/
// -
/* 
// util.isRegExp(object)
// 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
var util = require('util');
console.log( util.isRegExp(/some regexp/) ); // true
console.log( util.isRegExp(new RegExp('auother regexp')) ); // true
console.log( util.isRegExp({}) ); // false
*/
// -
/* 
// util.isDate(object)
// 如果给定的参数 "object" 是一个日期返回true，否则返回false。
var util = require('util');
console.log( util.isDate(new Date()) ); // true
console.log( util.isDate(Date()) ); // false
console.log( util.isDate({}) ); // false
const sd = require('silly-datetime'); // 必须先通过终端安装包：npm install silly-datetime // 重要
const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log('time:' + time);
console.log( util.isDate(time) );
console.log( util.isDate('2023-05-15 16:14') );
console.log( util.isDate('2023-05-15') );
console.log( util.isDate('2023/05/15') );
console.log( util.isDate('2023.05.15') );
console.log( util.isDate('16:14') );
// 更多详情可以访问 http://nodejs.org/api/util.html 了解详细内容。
*/

// ——————————————————————————————

// Node.js 文件系统 // 重要：整个章节，涉及增删改查操作，还有目录创建删除等。
// Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 Node 导入文件系统模块(fs)语法如下所示：
// var fs = require('fs');
// 异步和同步
// Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
// 异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
// 建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
// 实例
// 创建 input.txt 文件，内容如下：
// 菜鸟教程官网地址：www.runoob.com
// 文件读取实例
// 创建 file.js 文件, 代码如下：
/* 
var fs = require('fs');
const path = require('path');
// 异步读取
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('异步读取：' + data.toString());
});
// 同步读取
var data = fs.readFileSync('input.txt');
console.log('同步读取：' + data.toString());
console.log("程序执行完毕。");
*/
// 接下来，让我们来具体了解下 Node.js 文件系统的方法。
// 打开文件
// 语法
// 以下为在异步模式下打开文件的语法格式：
// fs.open(path, flags[, mode], callback); // 注：fs得先定义一下
// 参数
// 参数使用说明如下：
// path - 文件的路径。
// flags - 文件打开的行为。具体值详见下文。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。
// flags 参数可以是以下值：
// 参考详细图
// Flag	描述
// r	以读取模式打开文件。如果文件不存在抛出异常。
// r+	以读写模式打开文件。如果文件不存在抛出异常。
// rs	以同步的方式读取文件。
// rs+	以同步的方式读取和写入文件。
// w	以写入模式打开文件，如果文件不存在则创建。
// wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
// w+	以读写模式打开文件，如果文件不存在则创建。
// wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
// a	以追加模式打开文件，如果文件不存在则创建。
// ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
// a+	以读取追加模式打开文件，如果文件不存在则创建。
// ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
// 实例
// 接下来我们创建 file.js 文件，并打开 input.txt 文件进行读写，代码如下所示：
/* 
var fs = require('fs');
// 异步打开文件
console.log('准备打开文件！');
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log('文件打开成功');
});
// 注：只是命令行提示，我也不知道文件在哪打开的😆
*/
// -
/**/
// 获取文件信息
// 语法
// 以下为通过异步模式获取文件信息的语法格式：
// fs.stat(path, callback);
// 参数
// 参数使用说明如下：
// path - 文件路径。
// callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
// fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
/*
var fs = require('fs');
fs.stat('/Users/sansimac/Desktop/聂秀盛/文件/学习不同编程语言/NodeJS/Coding/HelloWorld/server.js', function(err, stats) {
    console.log(stats.isFile()); // true
});
*/
// stats类中的方法有：
// 方法	描述
// stats.isFile()	如果是文件返回 true，否则返回 false。
// stats.isDirectory()	如果是目录返回 true，否则返回 false。
// stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
// stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
// stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
// stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
// stats.isSocket()	如果是 Socket 返回 true，否则返回 false。
// 实例
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
    if (err) {
        return console.error(err);
    }
    console.log(stats);
    console.log("读取文件信息成功！");
    // 检测文件类型
    console.log('是否为文件（isFile）？' + stats.isFile());
    console.log('是否为目录（isDirectory）？' + stats.isDirectory());
});
*/
// -
// 写入文件
// 语法
// 以下为异步模式下写入文件的语法格式：
// fs.writeFile(file, data[, options], callback);
// writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
// 参数
// 参数使用说明如下：
// file - 文件名或文件描述符。
// data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
// options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
// 实例
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
console.log("准备写入文件");
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------");
    console.log("读取写入的数据！");
    fs.readFile('input.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log('异步读取文件数据：' + data.toString());
    });
});
*/
// -
// 读取文件
// 语法
// 以下为异步模式下读取文件的语法格式：
// fs.read(fd, Buffer, offset, length, position, callback);
// 该方法使用了文件描述符来读取文件。
// 参数
// 参数使用说明如下：
// fd - 通过 fs.open() 方法返回的文件描述符。
// buffer - 数据写入的缓冲区。
// offset - 缓冲区写入的写入偏移量。
// length - 要从文件中读取的字节数。
// position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
// callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
// 实例
// input.txt 文件内容为：
// 菜鸟教程官网地址：www.runoob.com
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
var buf = new Buffer.alloc(1024);
console.log("准备打开已存在的文件！");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件：");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
        if (err) {
            return console.error(err);
        }
        console.log(bytes + ' 字节被读取');
        // 仅输出读取的字节
        if (bytes > 0 ) {
            console.log(buf.slice(0, bytes).toString());
        }
    });
});
*/
// -
// 关闭文件
// 语法
// 以下为异步模式下关闭文件的语法格式：
// fs.close(fd, callback);
// 该方法使用了文件描述符来读取文件。
// 参数
// 参数使用说明如下：
// fd - 通过 fs.open() 方法返回的文件描述符。
// callback - 回调函数，没有参数。
// 实例
// input.txt 文件内容为：
// 菜鸟教程官网地址：www.runoob.com
// 接下来我们创建 file.js 文件，代码如下所示：
/*
var fs = require('fs');
var buf = new Buffer.alloc(1024);
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件！");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
        if (err) {
            return console.error(err);
        }
        // 仅输出读取的字节
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString());
        }
        // 关闭文件
        fs.close(fd, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('文件关闭成功');
        });
    });
});
*/
// -
// 截取文件
// 语法
// 以下为异步模式下截取文件的语法格式：
// fs.ftruncate(fd, len, callback);
// 该方法使用了文件描述符来读取文件。
// 参数
// 参数使用说明如下：
// fd - 通过 fs.open() 方法返回的文件描述符。
// len - 文件内容截取的长度。
// callback - 回调函数，没有参数。
// 实例
// input.txt 文件内容为：
// site:www.runoob.com
// 接下来我们创建 file.js 文件，代码如下所示：
/*
var fs = require('fs');
var buf = new Buffer.alloc(1024);
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.log(err);
    }
    console.log("文件打开成功！");
    console.log("截取10字节内的文件内容，超出部分将被去除。");
    // 截取文件
    fs.ftruncate(fd, 10, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("文件截取成功。");
        console.log("读取相同的文件"); 
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
            if (err) {
                return console.log(err);
            }
            // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }
            // 关闭文件
            fs.close(fd, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("文件关闭成功！");
            });
        });
    });
});
*/
// -
// 删除文件
// 语法
// 以下为删除文件的语法格式：
// fs.unlink(path, callback);
// 参数
// 参数使用说明如下：
// path - 文件路径。
// callback - 回调函数，没有参数。
// 实例
// input.txt 文件内容为：
// site:www.runoob.com
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
console.log("准备删除文件！");
fs.unlink('input.txt', function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("文件删除成功！");
});
*/
// -
// 创建目录
// 语法
// 以下为创建目录的语法格式：
// fs.mkdir(path[, Option], callback);
// 参数
// 参数使用说明如下：
// path - 文件路径。
// options 参数可以是：
// recursive - 是否以递归的方式创建目录，默认为 false。
// mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。
// 实例
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
// tmp 目录必须存在
console.log("创建目录 /tmp/test/");
// 方式一
fs.mkdir('/tmp/test/', function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("目录创建成功。");
});
// 方式二
// fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
//     if (err) throw err;
// });
// 注：不清楚创建的目录位置在哪里
*/
// -
// 读取目录
// 语法
// 以下为读取目录的语法格式：
// fs.readdir(path, callback)
// 参数
// 参数使用说明如下：
// path - 文件路径。
// callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。
// 实例
// 接下来我们创建 file.js 文件，代码如下所示：
/*
var fs = require('fs');
console.log("查看 /tmp 目录");
fs.readdir('/tmp/', function(err, files) {
    if (err) {
        return console.log(err);
    }
    files.forEach( function(file) {
        console.log(file);
    });
});
*/
// -
// 删除目录
// 语法
// 以下为删除目录的语法格式：
// fs.rmdir(path, callback)
// 参数
// 参数使用说明如下：
// path - 文件路径。
// callback - 回调函数，没有参数。
// 实例
// 接下来我们创建 file.js 文件，代码如下所示：
/* 
var fs = require('fs');
// 执行前创建一个空的 /tmp/test 目录
console.log("准备删除目录 /tmp/test");
fs.rmdir('/tmp/test', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("读取 /tmp 目录");
    fs.readdir('/tmp/', function(err, files) {
        if (err) {
            return console.log(err);
        }
        files.forEach( function (file) {
            console.log(file);
        });
    });
});
*/

// ——————————————————————————————
// Node.js GET/POST请求 // 重要
// 在很多场景中，我们的服务器都需要跟用户的浏览器打交道，如表单提交。
// 表单提交到服务器一般都使用 GET/POST 请求。
// 本章节我们将为大家介绍 Node.js GET/POST请求。
// 获取GET请求内容
// 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
// node.js 中 url 模块中的 parse 函数提供了这个功能。
// 实例
/*
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
// 在浏览器中访问 http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com 然后查看返回结果:
*/
// 获取 URL 的参数
// 我们可以使用 url.parse 方法来解析 URL 中的参数，代码如下：
// 实例
/* 
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write('网站名：' + params.name);
    res.write('\n');
    res.write('网站url：' + params.url);
    res.end();
}).listen(3000);
*/
// 获取 POST 请求内容
// POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
// 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
// 基本语法结构说明
// var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
// http.createServer(function(req, res) {
//     // 定义了一个post变量，用于暂存请求体的信息
//     var post = '';
//     // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
//     req.on('data', function(chunk) {
//         post += chunk;
//     });
//     // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
//     req.on('end', function() {
//         post = querystring.parse(post);
//         res.end(util.inspect(post));
//     });
// }).listen(3000);
// 以下实例表单通过 POST 提交并输出数据：
// 实例
/* 
var http = require('http');
var querystring = require('querystring');
var postHTML = 
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名：<input name="name"><br>' +
    '网站url：<input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body>'
    '</html>';
http.createServer(function(req, res) {
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function() {
        // 解析参数
        body = querystring.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        if (body.name && body.url) { // 输出提交的数据
            res.write('网站名：' + body.name);
            res.write('<br>');
            res.write('网站 URL：' + body.url);
        } else { // 输出表单
            res.write(postHTML);
        }
        res.end();
    });
}).listen(3000);
*/

// ——————————————————————————————
// Node.js 工具模块
// 序号	模块名 & 描述
// 1	OS 模块
// 提供基本的系统操作函数。
// 2	Path 模块
// 提供了处理和转换文件路径的工具。
// 3	Net 模块
// 用于底层的网络通信。提供了服务端和客户端的的操作。
// 4	DNS 模块
// 用于解析域名。
// 5	Domain 模块
// 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。
/* 
// Node.js OS 模块
// Node.js 工具模块Node.js 工具模块
// Node.js os 模块提供了一些基本的系统操作函数。我们可以通过以下方式引入该模块：
var os = require('os');
console.log('返回操作系统的默认临时文件夹。tmpdir:' + os.tmpdir);
console.log('返回 CPU 的字节序，可能的是 "BE" 或 "LE"。endianness:' + os.endianness);
console.log('返回操作系统的主机名hostname:' + os.hostname);
console.log('返回操作系统名type:' + os.type);
console.log('返回编译时的操作系统名platform:' + os.platform);
console.log('返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。arch:' + os.arch);
console.log('返回操作系统的发行版本。release():' + os.release);
console.log('返回操作系统运行的时间，以秒为单位。uptime:' + os.uptime);
console.log('返回系统内存总量，单位为字节。totalmem:' + os.totalmem);
console.log('返回操作系统空闲内存量，单位是字节。freemem:' + os.freemem);
console.log('返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。cpus:' + os.cpus);
console.log('获得网络接口列表。networkInterfaces:' + os.networkInterfaces);
注-网址：https://www.runoob.com/nodejs/nodejs-os-module.html
*/
/* 
// Node.js Path 模块
// Node.js 工具模块Node.js 工具模块
// Node.js path 模块提供了一些用于处理文件路径的小工具，我们可以通过以下方式引入该模块：
// var path = require('path');
// 实例
// 创建 main.js 文件，代码如下所示：
var path = require('path');
// 格式化路径
console.log('normalization:' + path.normalize('/test/test1/2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path:' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换为绝对路径
console.log('resolve:' + path.resolve('main.js'));
// 路径中文件的后缀名
console.log('ext name:' + path.extname('main.js'));
// 注-网址：https://www.runoob.com/nodejs/nodejs-path-module.html
*/
/* 
// Node.js Net 模块
// Node.js 工具模块Node.js 工具模块
// Node.js Net 模块提供了一些用于底层的网络通信的小工具，包含了创建服务器/客户端的方法，我们可以通过以下方式引入该模块：
// var net = require('net');
// 实例
// 创建 server.js 文件，代码如下所示：
var net = require('net');
var server = net.createServer(function(connection) {
    console.log('client connected');
    connection.on('end', function() {
        console.log('客户端关闭连接');
    });
    connection.write('Hello, world.10。我是服务端的数据\r\n');
    connection.pipe(connection);
});
server.listen(8080, function() {
    console.log('server is listening 服务端监听中，此时是一直属于运行状态中');
});
// // 新开一个窗口，创建 client.js 文件，代码如下所示：
// var net = require('net');
// var client = net.connect({port: 8080}, function() {
//     console.log('1. 连接到服务器');
// });
// client.on('data', function(data) {
//     console.log('2. 获取数据：' + data.toString());
//     client.end();
// });
// client.on('end', function() {
//     console.log('3. 断开与服务器的连接');
// });
// 注：我使用“浏览器”连接“服务器”，服务器直接被干翻😆
// 注-网址：https://www.runoob.com/nodejs/nodejs-net-module.html
*/
/* 
// Node.js DNS 模块
// Node.js 工具模块Node.js 工具模块
// Node.js DNS 模块用于解析域名。引入 DNS 模块语法格式如下：
// var dns = require('dns')
// 实例
// 创建 main.js 文件，代码如下所示：
var dns = require('dns');
// dns.lookup('www.github.com', function onLookup(err, address, family) {
dns.lookup('www.github.com', function onLookup(err, address, family) {
    console.log('IP地址：', address);
    dns.reverse(address, function (err, hostnames) {
        if (err) {
            console.log(err.stack);
        }
        console.log('反向解析' + address + ':' + JSON.stringify(hostnames));
    });
});
// 输出：正常
// address: 192.30.252.130
// reverse for 192.30.252.130: ["github.com"]
// 输出：异常
// IP地址： 20.205.243.166
// Error: getHostByAddr ENOTFOUND 20.205.243.166
//     at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/callback_resolver:47:19)
// 反向解析20.205.243.166:undefined
// 注-网址：https://www.runoob.com/nodejs/nodejs-dns-module.html
*/
/* 
// Node.js Domain 模块
// Node.js 工具模块Node.js 工具模块
// Node.js Domain(域) 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常。引入 Domain 模块 语法格式如下：
// var domain = require('domain')
// domain模块，把处理多个不同的IO的操作作为一个组。注册事件和回调到domain，当发生一个错误事件或抛出一个错误时，domain对象会被通知，不会丢失上下文环境，也不导致程序错误立即退出，与process.on('uncaughtException')不同。
// Domain 模块可分为隐式绑定和显式绑定：
// 隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象
// 显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象
// 实例
// 创建 main.js 文件，代码如下所示：
var EventEmitter = require('events').EventEmitter;
const { error } = require('console');
var domain = require('domain');
var emitter1 = new EventEmitter();
// 创建域
var domain1 = domain.create();
domain1.on('error', function(err) {
    console.log('domain1 处理这个错误('+err.message+')');
});
// 显式绑定
domain1.add(emitter1);
emitter1.on('error', function(err) {
    console.log('监听器处理此错误('+err.message+')');
});
emitter1.emit('error', new Error('通过监听器来处理'));
emitter1.removeAllListeners('error');
emitter1.emit('error', new Error('通过 domain1 处理'));
var domain2 = domain.create();
domain2.on('error', function(err) {
    console.log('domain2 处理这个错误('+err.message+')');
});
// 隐式绑定
domain2.run(function(){
    var emitter2 = new EventEmitter();
    emitter2.emit('error', new Error('通过 domain2 处理'));
});
domain1.remove(emitter1);
emitter1.emit('error', new Error('转换为异常，系统将崩溃'));
// 输出：正常。就是会报异常的。
// 注-网址：https://www.runoob.com/nodejs/nodejs-domain-module.html
*/

// ——————————————————————————————
// Node.js Web 模块
// 什么是 Web 服务器？
// Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。
// 大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。
// 目前最主流的三个Web服务器是Apache、Nginx、IIS。
// Web 应用架构：参考网址图片
// Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
// Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
// Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
// Data - 数据层，一般由数据库组成。
// 使用 Node 创建 Web 服务器
// Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下：
// var http = require('http')
// 以下是演示一个最基本的 HTTP 服务器架构(使用 8080 端口)，创建 server.js 文件，代码如下所示：
// 实例
/*
var http = require('http');
var fs = require('fs');
var url = require('url');
// 创建服务器
http.createServer( function(request, response) {
    // 请求解析，包括文件名
    var pathname = url.parse(request.url).pathname;
    // 输出请求的文件名
    console.log('Request for' + pathname + 'received');
    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码：404：NOT FOUND
            // Centent Type: text/html
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // HTTP 状态码：200：OK
            // Content Type: text/html
            response.writeHead(200, {'Content-Type': 'text/html'});
            // 响应文件内容
            response.write(data.toString());
        }
        // 发送响应数据
        response.end();
    });
}).listen(8080);
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
*/
// 接下来我们在该目录下创建一个 index.html 文件，代码如下：
// index.html 文件
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8">
// <title>菜鸟教程(runoob.com)</title>
// </head>
// <body>
//     <h1>我的第一个标题</h1>
//     <p>我的第一个段落。3</p>
// </body>
// </html>
// 使用 Node 创建 Web 客户端
// Node 创建 Web 客户端需要引入 http 模块，创建 client.js 文件，代码如下所示：
// 实例
// var http = require('http');
// // 用于请求的选项
// var options = {
//     host: 'localhost',
//     port: '8080',
//     path: '/index.html'
// };
// // 处理响应的回调函数
// var callback = function(response) {
//     // 不断更新数据
//     var body = '';
//     response.on('data', function(data) {
//         body += data;
//     });
//     response.on('end', function() {
//         // 数据接受完成
//         console.log(body);
//     });
// }
// // 向服务端发送请求
// var req = http.request(options, callback);
// req.end();
// 注-网址：https://www.runoob.com/nodejs/nodejs-web-module.html

// ——————————————————————————————

// Node.js Express 框架 // 重要：涉及第三方库安装到项目文件夹内、路由
// Express 简介
// Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
// 使用 Express 可以快速地搭建一个完整功能的网站。
// Express 框架核心特性：
// 可以设置中间件来响应 HTTP 请求。
// 定义了路由表用于执行不同的 HTTP 请求动作。
// 可以通过向模板传递参数来动态渲染 HTML 页面。
// 安装 Express
// 安装 Express 并将其保存到依赖列表中：
// $ cnpm install express --save // 打开终端，在当前路径中执行，会生成对应内容。
// 以上命令会将 Express 框架安装在当前目录的 node_modules 目录中， node_modules 目录下会自动创建 express 目录。以下几个重要的模块是需要与 express 框架一起安装的：
// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
// cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
// multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
// $ cnpm install body-parser --save
// $ cnpm install cookie-parser --save
// $ cnpm install multer --save
// 安装完后，我们可以查看下 express 使用的版本号：
// $ cnpm list express
// /data/www/node
// └── express@4.15.2  -> /Users/tianqixin/www/node/node_modules/.4.15.2@express
// 第一个 Express 框架实例
// 接下来我们使用 Express 框架来输出 "Hello World"。
// 以下实例中我们引入了 express 模块，并在客户端发起请求后，响应 "Hello World" 字符串。
// 创建 express_demo.js 文件，代码如下所示：
// express_demo.js 文件代码：
//express_demo.js 文件
/*
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World.3');
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port); 
    // 结果：浏览器可以访问：http://127.0.0.1:8081/
    // 官方输出：应用实例，访问地址为 http://0.0.0.0:8081
    // 实际输出：应用实例，访问地址为 http://:::8081
    // 注：虽有出入，但不妨碍正确结果显示。
});
*/
/* 
// 请求和响应
// Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
// app.get('/', function (req, res) {
    // 执行代码
// });
// 路由
// 我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
// 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。
// 接下来我们扩展 Hello World，添加一些功能来处理更多类型的 HTTP 请求。
// 创建 express_demo2.js 文件，代码如下所示：
// express_demo2.js 文件代码：
var express = require('express');
var app = express();
//  主页输出 "Hello World"
app.get('/', function(req, res) {
    console.log('主页 GET 请求');
    res.send('Hello GET');
});
//  POST 请求
app.post('/', function(req, res) {
    console.log('主页 POST 请求');
    res.send('Hello POST');
});
//  /del_user 页面响应
app.get('/del_user', function(req, res) {
    console.log('del_user 响应 DELETE 请求');
    res.send('删除页面');
});
// /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log('/list_user GET 请求');
    res.send('用户列表页面');
});
// 对页面 abcd，abxcd，ab123cd， 等响应GET请求
app.get('/ab*cd', function(req, res) {
    console.log('/ab*cd GET 请求');
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
/* 
// 静态文件
// Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
// 你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
// app.use('/public', express.static('public'))
// 我们可以到 public/images 目录下放些图片,如下所示：
// node_modules
// server.js
// public/
// public/images
// public/images/logo.png
// 让我们再修改下 "Hello World" 应用添加处理静态文件的功能。
// 创建 express_demo3.js 文件，代码如下所示：
// express_demo3.js 文件代码：
var express = require('express');
var app = express();
app.use('/public', express.static('public')); // 注：访问静态文件，必须加上这行代码
app.use('/private', express.static('private'));
app.get('/', function (req, res) {
    res.send('hello, world. 2');
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
// 输出：访问：http://127.0.0.1:8081/public/image/v4.png
*/
// -
// GET 方法
// 以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 process_get 路由器来处理输入：
// index.html 文件代码：
{/* <html>
    <body>
        <form action="http://127.0.0.1:8081/process_get" method="GET">
            First name:<input type="text" name="first_name"><br>
            Last name:<input type="text" name="last_name">
            <input type="submit" value="submit">
        </form>
    </body>
</html> */}
// server.js 文件代码：
/* 
var express = require('express');
var app = express();
app.use('/public', express.static('/public'));
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
});
app.get('/process_get', function (req, res) {
    // 输出json格式
    var response = {
        'first_name':req.query.first_name,
        'last_name':req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
// -
// POST 方法
// 以下实例演示了在表单中通过 POST 方法提交两个参数，我们可以使用 server.js 文件内的 process_post 路由器来处理输入：
// index.html 文件代码：
{/* <html>
    <body>
        <form action="http://127.0.0.1:8081/process_get" method="POST">
            First name:<input type="text" name="first_name"><br>
            Last name:<input type="text" name="last_name">
            <input type="submit" value="submit">
        </form>
    </body>
</html> */}
// server.js 文件代码：
/* 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use('/public', express.static('/public'));
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + '/' + 'index.html');
});
app.post('/process_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    var response = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
// -
// 文件上传
// 以下我们创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data。
// index.html 文件代码：
{/* <html>
    <head>
        <title>文件上传表单</title>
    </head>
    <body>
        <h3>文件上传：</h3>
        选择一个文件上传：<br>
        <form action="/file_upload" method="post" enctype="multipart/form-data">
            <input type="file" name="image" size="50"></input>
            <br>
            <input type="submit" value="上传文件"></input>
        </form>
    </body>
</html> */}
// server.js 文件代码：
/* 
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
app.use('/public', express.static('/public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.get('/index.html', function (req, res) {
    console.log( __dirname + '/' + 'index.html');
});
app.post('file_upload', function (req, res) {
    console.log(req.files[0]); // 上传的文件信息
    var des_file = __dirname + '/' + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end( JSON.stringify( express.response ));
        });
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
// -
/* 
// Cookie 管理
// 我们可以使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息：
// express_cookie.js 文件代码：
// express_cookie.js 文件
var express = require('express');
var cookieParser = require('cookie-parser');
var util = require('util');
var app = express();
app.use(cookieParser());
app.get('/', function (req, res) {
    console.log('Cookies:' + util.inspect(req.cookies));
});
app.listen(8081);
*/
// 注-网址：https://www.runoob.com/nodejs/nodejs-express-framework.html

// ——————————————————————————————

// Node.js RESTful API // 重要 // 涉及增删改查，进入详情页等
// 什么是 REST？
// REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
// 表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。
// HTTP 方法
// 以下为 REST 基本架构的四个方法：
// GET - 用于获取数据。
// PUT - 用于更新或添加数据。
// DELETE - 用于删除数据。
// POST - 用于添加数据。
// RESTful Web Services
// Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。
// 基于 REST 架构的 Web Services 即是 RESTful。
// 由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax]）实现客户端。
// RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问。但是，这种服务的简便性让用户能够与之直接交互，使用它们的 Web 浏览器构建一个 GET URL 并读取返回的内容。
// 更多介绍，可以查看：RESTful 架构详解
// 创建 RESTful
// 首先，创建一个 json 数据资源文件 users.json，内容如下：
// {
//     "user1" : {
//        "name" : "mahesh",
//        "password" : "password1",
//        "profession" : "teacher",
//        "id": 1
//     },
//     "user2" : {
//        "name" : "suresh",
//        "password" : "password2",
//        "profession" : "librarian",
//        "id": 2
//     },
//     "user3" : {
//        "name" : "ramesh",
//        "password" : "password3",
//        "profession" : "clerk",
//        "id": 3
//     }
//  }
// 基于以上数据，我们创建以下 RESTful API：
// 序号	URI	HTTP 方法	发送内容	结果
// 1	listUsers	GET	空	显示所有用户列表
// 2	addUser	POST	JSON 字符串	添加新用户
// 3	deleteUser	DELETE	JSON 字符串	删除用户
// 4	:id	GET	空	显示用户详细信息
// 获取用户列表：
// 以下代码，我们创建了 RESTful API listUsers，用于读取用户的信息列表， server.js 文件代码如下所示：
/* 
var express = require('express');
var app = express();
var fs = require('fs');
app.get('/listUsers', function(req, res) {
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
/* 
// 添加用户
// 以下代码，我们创建了 RESTful API addUser， 用于添加新的用户数据，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require('fs');
// 添加新用户数据
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
};
app.get('/addUser', function (req, res) {
    // 读取已存在的数据
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data['user4'] = user['user4'];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
/* 
// 显示用户详情
// 以下代码，我们创建了 RESTful API :id（用户id）， 用于读取指定用户的详细信息，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require('fs');
app.get('/:id', function (req, res) {
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data['user' + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/
/*
// 删除用户
// 以下代码，我们创建了 RESTful API deleteUser， 用于删除指定用户的详细信息，以下实例中，用户 id 为 2，server.js 文件代码如下所示：
var express = require('express');
var app = express();
var fs = require('fs');
var id = 2;
app.get('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data['user' + id];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
*/

// ——————————————————————————————

// Node.js 多进程
// 我们都知道 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。
// 每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
// Node 提供了 child_process 模块来创建子进程，方法有：
// exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
// spawn - child_process.spawn 使用指定的命令行参数创建新进程。
// fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
// exec() 方法
// child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
// 语法如下所示：
// child_process.exec(command[, options], callback)
// 参数
// 参数说明如下：
// command： 字符串， 将要运行的命令，参数使用空格隔开
// options ：对象，可以是：
// cwd ，字符串，子进程的当前工作目录
// env，对象 环境变量键值对
// encoding ，字符串，字符编码（默认： 'utf8'）
// shell ，字符串，将要执行命令的 Shell（默认: 在 UNIX 中为/bin/sh， 在 Windows 中为cmd.exe， Shell 应当能识别 -c开关在 UNIX 中，或 /s /c 在 Windows 中。 在Windows 中，命令行解析应当能兼容cmd.exe）
// timeout，数字，超时时间（默认： 0）
// maxBuffer，数字， 在 stdout 或 stderr 中允许存在的最大缓冲（二进制），如果超出那么子进程将会被杀死 （默认: 200*1024）
// killSignal ，字符串，结束信号（默认：'SIGTERM'）
// uid，数字，设置用户进程的 ID
// gid，数字，设置进程组的 ID
// callback ：回调函数，包含三个参数error, stdout 和 stderr。
// exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。
// 实例
// 让我们创建两个 js 文件 support.js 和 master.js。
// support.js 文件代码：
// console.log('进程' + process.argv[2] + '执行');
// master.js 文件代码：
// const fs = require('fs');
// const child_process = require('child_process');
// for (var i = 0; i < 3; i++) {
//     var workerProcess = child_process.exec('node support.js ' + i, function (error, stdout, stderr) { // 一个空格会引起错误
//         if (error) {
//             console.log(error.stack);
//             console.log('Error code:' + error.code);
//             console.log('Signal received:' + error.signal);
//         }
//         console.log('stdout:' + stdout);
//         console.log('stderr:' + stderr);
//     });
//     workerProcess.on('exit', function (code) {
//         console.log('子进程已退出，退出码' + code);
//     });
// }
// -
// spawn() 方法
// child_process.spawn 使用指定的命令行参数创建新进程，语法格式如下：
// child_process.spawn(command[, args][, options])
// 参数
// 参数说明如下：
// command： 将要运行的命令
// args： Array 字符串参数数组
// options Object
// cwd String 子进程的当前工作目录
// env Object 环境变量键值对
// stdio Array|String 子进程的 stdio 配置
// detached Boolean 这个子进程将会变成进程组的领导
// uid Number 设置用户进程的 ID
// gid Number 设置进程组的 ID
// spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。
// 实例
// 让我们创建两个 js 文件 support.js 和 master.js。
// support.js 文件代码：
// console.log("进程 " + process.argv[2] + " 执行。" );
// master.js 文件代码：
// const fs = require('fs');
// const child_process = require('child_process');
// for(var i=0; i<3; i++) {
//    var workerProcess = child_process.spawn('node', ['support.js', i]);
//    workerProcess.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
//    });
//    workerProcess.stderr.on('data', function (data) {
//       console.log('stderr: ' + data);
//    });
//    workerProcess.on('close', function (code) {
//       console.log('子进程已退出，退出码 '+code);
//    });
// }
// -
// fork 方法
// child_process.fork 是 spawn() 方法的特殊形式，用于创建进程，语法格式如下：
// child_process.fork(modulePath[, args][, options])
// 参数
// 参数说明如下：
// modulePath： String，将要在子进程中运行的模块
// args： Array 字符串参数数组
// options：Object
// cwd String 子进程的当前工作目录
// env Object 环境变量键值对
// execPath String 创建子进程的可执行文件
// execArgv Array 子进程的可执行文件的字符串参数数组（默认： process.execArgv）
// silent Boolean 如果为true，子进程的stdin，stdout和stderr将会被关联至父进程，否则，它们将会从父进程中继承。（默认为：false）
// uid Number 设置用户进程的 ID
// gid Number 设置进程组的 ID
// 返回的对象除了拥有ChildProcess实例的所有方法，还有一个内建的通信信道。
// 实例
// 让我们创建两个 js 文件 support.js 和 master.js。
// support.js 文件代码：
// console.log("进程 " + process.argv[2] + " 执行。" );
// master.js 文件代码：
// const fs = require('fs');
// const child_process = require('child_process');
// for(var i=0; i<3; i++) {
//    var worker_process = child_process.fork("support.js", [i]);    
 
//    worker_process.on('close', function (code) {
//       console.log('子进程已退出，退出码 ' + code);
//    });
// }
// 执行以上代码，输出结果为：
// $ node master.js 
// 进程 0 执行。
// 子进程已退出，退出码 0
// 进程 1 执行。
// 子进程已退出，退出码 0
// 进程 2 执行。
// 子进程已退出，退出码 0

// 注-网址：https://www.runoob.com/nodejs/nodejs-process.html

// ——————————————————————————————

// Node.js JXcore 打包
// 注：苹果电脑无法使用（error：Could not fetch拿不到）
// 注-网址：https://www.runoob.com/nodejs/nodejs-jxcore-packaging.html

// ——————————————————————————————

// Node.js 连接 MySQL // 重要
// 注：参考mysql.js文件

// ——————————————————————————————

// Node.js 连接 MongoDB // 重要
// 注：参考MongoDB.js文件

// ——————————————————————————————

// console.log('end');
