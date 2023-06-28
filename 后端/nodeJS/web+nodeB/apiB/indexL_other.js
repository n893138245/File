/**
 * 目的：node.js查漏补缺。
 * 结果：成功。
 */
// ———————————————————— node.js ——————————————————————————————————————

// process.nextTick
/* 
process.nextTick( () => {
    console.log('这是一个事件循环');
});
*/
/*
console.log("Hello => number 1");

setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

process.nextTick(() => {
  console.log("Running at next tick => number 2");
});
*/

// -
/*
// 定时器
const id = setTimeout( () => {
    console.log('定义了一个有id的定时器');
}, 2000);
clearTimeout(id); // 销毁这个定时器
// 定时器 零延迟
setTimeout(() => {
    console.log('零延迟a');
}, 0);
console.log('零延迟b');
// setInterval() // 重复执行
const id2 = setInterval(() => {
    // if (App.somethingIWait === 'arrived') {
        console.log('setInterval');
    // }
}, 2000);
clearInterval(id2);
// setImmediate() 
// 当你想异步执行一段代码，但尽可能快地执行时，一个选择是使用 Node.js 提供的 setImmediate() 函数：
const id3 = setImmediate(() => { // error: Uncaught ReferenceError: setImmediate is not defined
    console.log('setImmediate');
});
*/

// -

/* 
// Node.js 事件触发器 // 类似iOS通知功能
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
// eventEmitter.on('start', () => {
//     console.log('started');
// });
// eventEmitter.emit('start');

// eventEmitter.on('start', number => {
//     console.log(`started ${number}`);
// });
// eventEmitter.emit('start', 23);

eventEmitter.on('start', (start, end) => {
    console.log(`started from ${start} to ${end}`);
});
eventEmitter.emit('start', 1, 100);
*/
// -
// 使用 Node.js 输出到命令行
/* 
// 计数元素
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});
*/

/* 
// 重置计数
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];
oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});

console.countReset('orange');

oranges.forEach(fruit => {
  console.count(fruit);
});
// 请注意对 console.countReset('orange') 的调用如何将值计数器重置为零。
*/

/* 
// 打印堆栈跟踪
const function2 = () => console.trace();
const function1 = () => function2();
function1();
*/

/* 
// 计算花费的时间
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  // do something, and measure the time it takes
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
*/

/*
标准输出和标准错误
正如我们所见，console.log 非常适合在控制台中打印消息。 这就是所谓的标准输出，或 stdout。
console.error 打印到 stderr 流。
它不会出现在控制台中，但会出现在错误日志中。
*/

/* 
// 为输出着色
console.log('\x1b[33m%s\x1b[0m', 'hi!');
// 你可以在 Node.js REPL 中尝试，它将以黄色打印 hi!。
// 但是，这是执行此操作的低级方法。 为控制台输出着色的最简单方法是使用库。 Chalk 就是这样一个库，除了着色之外，它还有助于其他样式设置，例如将文本设为粗体、斜体或下划线。
// 你用 npm install chalk@4 安装它，然后你就可以使用它了：
const chalk = require('chalk');
console.log(chalk.yellow('hi!'));
console.log(chalk.red.bgYellow.bold('hi!'));
// 使用 chalk.yellow 比死记硬背转义码方便得多，而且代码的可读性也更高。
// 查看上面发布的项目链接以获取更多使用示例。
*/

/* 
// 创建进度条
const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);

// const ProgressBar = require('progress');
// const bar = new ProgressBar(':bar', { total: 10});
// const timer = setInterval(() => {
//     bar.tick();
//     if (bar.complete) {
//         clearInterval(timer);
//     }
// }, 1000);
*/

// -

// 在 Node.js 中接受来自命令行的输入
/* */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`);
    readline.close();
});


/* 
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
*/

/*
// import inquirer from 'inquirer';
const inquirer = require('inquirer'); // error
// const inquirer = require('express'); // success
*/

// -
