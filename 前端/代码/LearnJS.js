// js语法所有练习

// const { Button } = require("element-ui");

/*
* 学习网址：https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/JavaScript_basics
* */
/*
目录：
    1. 输出Hello，world；
    2. 语法：常量、变量、数据类型、运算、if else、switch、函数、事件、for循环、while循环、转义字符、强转数据类型、字符串操作、数组操作；
    3. 类型判断、强转类型、严格模式、本地网络请求、json和string互相转换、异步编程、函数高级用法、闭包、set和get、类、继承、对象、html调用js、第三方库；
*/

/*
* 内容
* */
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
console.log("开始");
// 输出hello，world。
console.log("Hello,world.");

// 常量、变量
const nameA = "Apple";
let nameB = "Banana"; // let、var都是变量，使用场景不同，建议使用let
var nameC = "Cheese";
// nameA = "Apple2"; // 常量不可更改，会报错
nameB = "Banana2";
nameC = "Cheese2";
console.log(nameA, nameB, nameC);

// 数据类型：String、Number、Boolean、Array、Object；
let  stringA = '李雷';
var  stringB = "韩梅梅";
let numberA = 20;
let numberB = 10.118;
let bool = true;
let boolResult = 6 < 3;
let array = [14, 20.23, 38.987, '李雷', "大美丽"];
let object = document.querySelector('h6'); // 所有类型
let dog = {name: 'xiaoBai', funny: "bite"};
// console.log(object);
// console.log(array[4]);
// console.log(array.length);
// console.log(dog.funny);

/* 运算符：
    加减乘除：+-
    等于：===
    不等于：!==
    取非：!
    求余：%
    幂（值的n次方）：** // 幂函数：Math.pow(5, 5)结果就是3125。

    算术运算符：+、-、*、/、%、**。
    赋值运算符：+=、-=、*=、/=。
    比较运算符：===、!==、<、>、<=、>=。

    备注： 您可能会看到有些人在他们的代码中使用==和!=来判断相等和不相等，这些都是 JavaScript 中的有效运算符，但它们与===/!==不同，前者测试值是否相同，但是数据类型可能不同，而后者的严格版本测试值和数据类型是否相同。严格的版本往往导致更少的错误，所以我们建议您使用这些严格的版本。
    */
var result = numberA / numberB;
console.log("result = ", result);
if (numberA === numberB) {
    console.log("numberA等于numberB");
} else {
    console.log("numberA不等于numberB");
}
if (numberA !== numberB) {
    console.log("numberA不等于numberB");
} else {
    console.log("numberA等于numberB");
}
if (numberA === 20) {
    console.log("numberA等于20");
} else {
    console.log("numberA不等于20");
}
if (stringA === "李雷") {
    console.log("Yes");
} else {
    console.log("No");
}
if (!numberA) {
    console.log("Yes");
} else {
    console.log("No");
}
if (5 === 2+3) {
    console.log("Yes");
} else {
    console.log("No");
}
// let qiuYu = 8%3;
// console.log(qiuYu);
// let mi = 5**5;
// console.log(mi);
// let mi2 = Math.pow(5, 5);

// 条件语句
if (stringA === "李雷a") {
    console.log("if");
} else if (stringA === "李雷") {
    console.log("else if");
} else {
    console.log("else");
}
switch (9) {
    case 1:
        console.log("1");
        break;
    case 2:
        console.log("2");
        break;
    case 3:
        console.log("3");
        break;
    default:
        console.log("default：没有想要的结果，默认执行此句代码。");
}

// 函数
Add(12, 63);
function Add(numA, numB) {
    let result = numA + numB;
    console.log("函数：",numA,"+",numB,"=",result);
    return result;
}
Add(7, 10);
function notReturnValueFunc() {
    console.log("调用了一个没有返回值的函数");
}
notReturnValueFunc();
// 函数表达式
// JavaScript 函数可以通过一个表达式定义。
// 函数表达式可以存储在变量中：
var funA = function (a, b) {return a * b};
// 在函数表达式存储在变量后，变量也可作为一个函数使用：
var funA_result = funA(2, 8);
console.log('funA_result:' + funA_result);
// Function() 构造函数
var funB = new Function('a', 'b', 'return a*b');
var funB_result = funA(2, 9);
console.log('funB_result:' + funB_result);
// 在 JavaScript 中，很多时候，你需要避免使用 new 关键字。
// -
// 函数提升（Hoisting）
// 提升（Hoisting）是 JavaScript 默认将当前作用域提升到前面去的行为。
// 提升（Hoisting）应用在变量的声明与函数的声明。
// 因此，函数可以在声明之前调用：
// funC(5);
console.log('funC:' + funC(5));
function funC(a) {
    return a * a;
}
// 使用表达式定义函数时无法提升。
// -
// 自调用函数
// 函数表达式可以 "自调用"。自调用表达式会自动调用。如果表达式后面紧跟 () ，则会自动调用。不能自调用声明的函数。通过添加括号，来说明它是一个函数表达式：
(function (){
    var x = 'hello';
})();
// 以上函数实际上是一个 匿名自我调用的函数 (没有函数名)。
// -
// 函数可作为一个值使用
function funD(a, b) {
    return a * b;
}
var funD_result = funD(3, 5) * 2;
console.log('funD_result:' + funD_result);
// 函数是对象
// 在 JavaScript 中使用 typeof 操作符判断函数类型将返回 "function" 。但是JavaScript 函数描述为一个对象更加准确。JavaScript 函数有 属性 和 方法。arguments.length 属性返回函数调用过程接收到的参数个数：
function funE(a, b, c) {
    return arguments.length;
}
var funE_result = funE(2, 3, 4);
console.log('funE_result:' + funE_result);
function funF(a, b) {
    return a * b;
}
var funF_result = funF.toString();
console.log('funF_result:' + funF_result); // output: success
// 箭头函数: ES6 新增了箭头函数。箭头函数表达式的语法比普通函数表达式更简洁。
// ES5
var funG = function(x, y) {
    return x * y;
};
// ES6
const funGG = (x, y) => x * y;
// 有的箭头函数都没有自己的 this。 不适合定义一个 对象的方法。
// 当我们使用箭头函数的时候，箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的。
// 箭头函数是不能提升的，所以需要在使用之前定义。
// 使用 const 比使用 var 更安全，因为函数表达式始终是一个常量。
// 如果函数部分只是一个语句，则可以省略 return 关键字和大括号 {}，这样做是一个比较好的习惯:
const funGGG = (x, y) => {return x * y};
// 函数参数
function funH(x, y = 10) {
    return x + y;
}
var funH_result = funH(0, 2); // output: 2
console.log('funH_result:' + funH_result);
var funH_resultB = funH(5); // output: 15
console.log('funH_resultB:' + funH_resultB);
// arguments 对象:JavaScript 函数有个内置的对象 arguments 对象。arguments 对象包含了函数调用的参数数组。通过这种方式你可以很方便的找到最大的一个参数的值：
function funI_findMax() { // 😓，这不就等于“通过数组，遍历查找最大值”。
    var i, max = arguments[0];
    if (arguments.length < 2) return max; // 这种编码方式不好，因现为学习阶段，现跟着学习网站代码走。应该遵循正规编码方式，增加代码的可读性。
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}
var funI = funI_findMax(10, 123, 500, 115, 44, 88);
console.log('funI:' + funI);
// 或者创建一个函数用来统计所有数值的和：
function funJ_sumAll() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
var funJ = funJ_sumAll(10, 123, 500, 115, 44, 88);
console.log('funJ:' + funJ);
// 隐式参数
// 通过值传递参数。在函数中调用的参数是函数的隐式参数。JavaScript 隐式参数通过值来传递：函数仅仅只是获取值。如果函数修改参数的值，不会修改显式参数的初始值（在函数外定义）。隐式参数的改变在函数外是不可见的。
// 通过对象传递参数。在JavaScript中，可以引用对象的值。因此我们在函数内部修改对象的属性就会修改其初始的值。修改对象属性可作用于函数外部（全局变量）。修改对象属性在函数外是可见的。
// -
// 函数调用
function myFunction(a, b) {
    return a * b;
}
myFunction(10, 2);           // myFunction(10, 2) 返回 20
// 以上函数不属于任何对象。但是在 JavaScript 中它始终是默认的全局对象。
// 在 HTML 中默认的全局对象是 HTML 页面本身，所以函数是属于 HTML 页面。
// 在浏览器中的页面对象是浏览器窗口(window 对象)。以上函数会自动变为 window 对象的函数。
// myFunction() 和 window.myFunction() 是一样的：
// window.myFunction(10, 2);    // window.myFunction(10, 2) 返回 20 // 重要
// 这是调用 JavaScript 函数常用的方法， 但不是良好的编程习惯。全局变量，方法或函数容易造成命名冲突的bug。
// 内容重要：https://www.runoob.com/js/js-function-invocation.html
// 没理解什么意思：“作为函数方法调用函数”
// -

// 闭包（重要）
var add = ( function () { // 等于：函数调用函数
    var counter = 0;
    return function() { return counter += 1; }
})();
add();
// document.querySelector('h2').innerHTML = add() // output:2
// function buttonClick() { // error
//     console.log('点击了按钮');
    // document.querySelector('button').innerHTML = add();
    // document.querySelector('button').innerHTML = 111;
// }
// $(Button).click(function() { // error
//     console.log('点击了按钮2');
// });
var myButton = document.querySelector('button');
myButton.onclick = function() {
    console.log('点击了按钮3');
    document.querySelector('button').innerHTML = add();
}
add();
add();

// 事件
// 点击整个屏幕，都可以触发点击事件
// document.querySelector("html").addEventListener("click", function () {
//     alert("click me");
// });
// 事件的另一种写法
// document.querySelector('html').addEventListener('click', () => {
//     alert("click me again");
// });

// 完善示例网页-添加一个图像切换器
// 代码错误：直接copy过来出错。无法引用图片。
// let myImage = document.querySelector('img');
// myImage.onclick = function () {
//     let mySrc = myImage.getAttribute('src');
//     if(mySrc === 'images/firefox-icon.png') {
//         myImage.setAttribute('src', 'images/firefox2.png');
//     } else {
//         myImage.setAttribute('src', 'images/firefox-icon.png');
//     }
// }

// 添加个性化欢迎信息
// 暂不练习，与目的无关

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 其它知识点：for of、while、do while循环。
for (var i = 0; i < array.length; i++) {
    console.log("for循环输出:"+array[i]);
}
for (content of array) {
    console.log("for of循环输出："+content);
}
let tempValue = 0;
while (1) {
    tempValue++;
    console.log("一直执行中");
    if (tempValue === 3) {
        console.log("已经执行了"+tempValue+"次，可以结束了");
        break;
    }
}
console.log("跳出while循环");
var doWhileValue = 0
do {
    console.log('do while执行了' + doWhileValue + '次');
    doWhileValue++;
} while (doWhileValue < 5);
console.log("跳出do while循环");

// 其它知识点：转义字符
console.log("I love \"you\", one hundred 100\% love. I will give you a fruit, It's "+nameA+".");

// 其它知识点：强转数据类型
let stringC = "123";
let numberC = Number(stringC);
typeof numberC; // 数字类型

let numberD = 123;
let stringD = numberD.toString(); // 方式一
// let stringD = String(numberD); // 方式二
typeof stringD; // 字符串类型

// 其它知识点：字符串相关操作
let stringE = "This is string.";
console.log(stringE.length); // 获取字符串长度
console.log(stringE[1]); // 检索特定字符串字符
console.log(stringE[stringE.length-1]); // 输出字符串最后一个字符串，结合长度和索引使用
console.log(stringE.indexOf("str")); // 在字符串中查找子字符串并提取它
console.log(stringE.indexOf("haha")); // 查找不到字符串时，便会输出 -1
if (stringE.indexOf("string") !== -1) {
    console.log("Yes");
} else {
    console.log("No");
}
console.log(stringE.slice(0,3)); // 提取某一段字符串
console.log(stringE.slice(6)); // 提取剩余字符串，从某个位置开始
console.log(stringE.slice(-7)); // 提取某一段字符串，从末尾开始
console.log(stringE.slice(-7, -4)); // 提取某一段字符串，从末尾开始，取某几个字符串
console.log(stringE.toLowerCase()); // 转换大小写
console.log(stringE.toUpperCase()); // 转换大小写
console.log(stringE.replace("string","doubi")); // 替换字符串的某部分

// 其它知识点：数组相关操作
let arrayB = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
arrayB[0] = "tahini"; // 单独修改数组某个元素
console.log(arrayB.length);
console.log(arrayB[0].length);
console.log(arrayB);
// 重要：字符串和数组之间的转换
let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let myArray = myData.split(','); // 重要：字符串和数组之间的转换
console.log(myArray);
let myNewString = myArray.join(','); // 重要：字符串和数组之间的转换
console.log(myNewString);
let dogNames = ["Rocket","Flash","Bella","Slugger"];
console.log(dogNames.toString()); //Rocket,Flash,Bella,Slugger
// 添加和删除数组项
let myArrayB = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
console.log(myArrayB);
myArrayB.push("Cardiff"); // 新增数组末尾数据
myArrayB.push('Bradford', 'Brighton'); // 新增数组末尾N个数据
console.log(myArrayB);
let getArrayNewLength = myArrayB.push('Bristol'); // 数组长度
console.log("注意：这个获取的时数组长度哦："+getArrayNewLength);
console.log(myArrayB);
myArrayB.pop(); // 删除数组中最后一个元素
console.log(myArrayB);
let removedItem = myArrayB.pop();
console.log(myArrayB);
myArrayB.shift(); // 删除数组中第一个元素
console.log(myArrayB);
myArrayB.unshift('Edinburgh') // 新增数组中第一个元素
console.log(myArrayB);
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
console.log("结束");

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
console.log("开始2");
/*
* 学习网址：https://www.runoob.com/js/js-obj-intro.html
* */

// 对象：属性 + 方法
var person = {
    name: 'Steven',
    age: '24',
    height: '179',
    funny: 'play ball',
    hobby: {
        travel: '蓝天碧海',
    },
    playBall: function() {
        return 'play basketball';
    },
    readbook: function() {
        return 'love and peace'
    }
}

// error code
// var steven = person()
// console.log(steven.name, steven.age);
console.log(person.name, person.age, person.playBall(), person.readbook());

// constructor属性：constructor 属性返回所有 JavaScript 变量的构造函数。
// error code，第一个字符串类型，在浏览器平台输入，能够返回正确内容。
// "John".constructor                 // 返回函数 String()  { [native code] }
// (3.14).constructor                 // 返回函数 Number()  { [native code] }
// false.constructor                  // 返回函数 Boolean() { [native code] }
// [1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
// {name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
// new Date().constructor             // 返回函数 Date()    { [native code] }
// function () {}.constructor         // 返回函数 Function(){ [native code] }

// 同步任务和异步任务
// console.log('同步任务1');
// setTimeout(() => {
//     console.log('异步任务1');
// }, 1000);
// console.log('同步任务2');

// console.log(1);
// setTimeout(() => {
//     console.log(2);
// }, 0);
// console.log(3);
// console.log(4);

// setTimeout(() => {
//     console.log('异步任务');
// }, 2000);
// // 伪代码
// sleep(5); //表示很耗时的同步任务

// 举例 3（较真系列）
// setTimeout(() => {
//     console.log('异步任务');
// }, 1000);
// 上面的代码中，等到 1 秒之后，真的会执行异步任务吗？其实不是。
// 在浏览器中， setTimeout()/ setInterval() 的每调用一次定时器的最小时间间隔是4毫秒，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的 setInterval 的回调函数阻塞导致的。
// 上面的案例中，异步任务需要等待 1004 毫秒之后，才会从 Event Table 进入到 Event Queue。这在面试中也经常被问到。

/* 
// 手写 Ajax
// 手写第一个 Ajax 请求
// get 请求：
//【发送ajax请求需要五步】
//（1）创建XMLHttpRequest对象
var xmlhttp = new XMLHttpRequest();
//（2）设置请求的参数。包括：请求的方法、请求的url。
xmlhttp.open('get', 'server.js'); // 默认请求地址为自己，可加路径
//（3）发送请求
xmlhttp.send();
//（4）注册事件。 onreadystatechange事件，状态改变时就会调用。
//如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
xmlhttp.onreadystatechange = function() {
    // console.log(xmlhttp);
    // 为了保证 数据 完整返回，我们一般会判断 两个值
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //（5）服务端相应：如果能够进入这个判断，说明数据请求成功了
        console.log('request success:' + JSON.stringify(xmlhttp.responseText));

        // 伪代码：按业务需要，将接口返回的内容显示在页面上
        // document.querySelector('h6').innerHTML = xmlhttp.responseText; // 插入内容无效
        // document.querySelector('h6').innerHTML = 'xmlhttp.responseText'; // 插入内容有效

        // alert(xmlhttp.responseText);
    }
};
*/

/* 
// 错误：请求返回405
// post 请求：
//（1）异步对象
var xmlhttpB = new XMLHttpRequest();
//（2）设置请求参数。包括：请求的方法、请求的url。
xmlhttpB.open('post', ''); // indexI_LearnJS.html
//（2.1）如果想要使用post提交数据,必须添加此行
xmlhttpB.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//（3）发送请求
xmlhttpB.send(''); // 参数：name=fox&age=18
//（4）注册事件
xmlhttpB.onreadystatechange = function() {
    console.log('xmlhttpB' + xmlhttpB);
    //（5）服务端相应
    if (xmlhttpB.readyState == 4 && xmlhttpB.status == 200) {
        console.log('post request success');
        // alert(xmlhttpB.responseText);
    }
};
*/

/*
// success
// jQuery 中的 Ajax
$.ajax({
    url: 'person.json', // 接口的请求地址:https://www.baidu.com/
    // Access-Control-Allow-Origin: '',
    // origin: 'https://www.baidu.com/',
    data: '', // 请求参数wd=test
    type: 'get', //请求的方式
    success: function (argument) {
        // 接口请求成功时调用
        // console.log('接口请求成功:' + 'argument');
        // console.log('接口请求成功:' + argument['Oliver'].funny);
        console.log('接口请求成功:' + JSON.stringify(argument));
        var jsonString = JSON.stringify(argument);
        console.log('json 转 string:' + jsonString);
        var stringJson = JSON.parse(jsonString);
        console.log('string 转 json:' + stringJson['Oliver'].funny);
    },
    beforeSend: function (argument) {}, // 在发送请求之前调用,可以做一些验证之类的处理
    error: function (argument) {
        // 接口请求失败时调用
        console.log('接口请求失败:' + argument);
    },
});
*/

// 类：包含属性、方法
class father {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    fatherMethod() {
        console.log('fatherMethod');
    }
    fatherMethodB() {
        return this.name + this.age
    }
    fatherMethodC(value) {
        return value + 18;
    }
}
let fatherInfo = new father('这是父', '49');
console.log('fatherInfo:' + fatherInfo.name + '。今年' + fatherInfo.age);
console.log('fatherInfo:' + fatherInfo.fatherMethod());
console.log('fatherInfo:' + fatherInfo.fatherMethodB());
console.log('fatherInfo:' + fatherInfo.fatherMethodC(17));
// 类表达式：类表达式是定义类的另一种方法。类表达式可以命名或不命名。命名类表达式的名称是该类体的局部名称。
// 未命名/匿名类
let anonymityClass = class {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
console.log(anonymityClass.name) // output: anonymityClass
// 命名类
let nameClass = class nameClassB {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
console.log(nameClass.name); // output: nameClassB
// 重要：严格模式 "use strict" https://www.runoob.com/js/js-strict.html
class Runoob {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    }
    age() {
      // date = new Date();  // 错误 // 不能使用没有声明的变量
      let date = new Date(); // 正确
      return date.getFullYear() - this.year;
    }
}
let newRunoob = new Runoob();
console.log('newRunoob' + newRunoob.age());
console.log(new Date());
console.log(new Date().getFullYear() - this.year);

// 类继承
class Animal { // 父类
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
    eat() {
        return 'eat rice';
    }
}
class Dog extends Animal { // 子类
    constructor(name, weight, age) {
        super(name, weight);
        this.age = age;
    }
    sleep() {
        return 'It is sleep 10 hours';
    }
}
let myAnimal = new Animal('小黑', '7kg');
console.log('myAnimal:' + myAnimal.name + myAnimal.weight);
let myDog = new Dog('旺柴', '11.05kg', '3year');
console.log('dog is' + myDog.name + myDog.weight + myDog.age);
document.querySelector('h3').innerHTML = myDog.sleep();
document.getElementById('demoP').innerHTML = myDog.eat();

// getter 和 setter
class UseGetAndSet {
    constructor(name) {
        this.sitename = name;
    }
    get s_name() {
        return this.sitename;
    }
    set s_name(x) {
        this.sitename = x;
    }
}
let useGetAndSet = new UseGetAndSet();
useGetAndSet.s_name = 'John';
console.log('useGetAndSet.s_name:' + useGetAndSet.s_name);
// 注意：即使 getter 是一个方法，当你想获取属性值时也不要使用括号。

// 静态方法
class StaticMethonClass {
    constructor(name) {
        this.name = name;
    }
    static hello() {
        return 'hello';
    }
}
class StaticMethonClassB {
    constructor(name) {
        this.name = name;
    }
    static hello(x) {
        return 'HelloB' + x.name;
    }
}
let staticMethonClass = new StaticMethonClass();
// 可以在类中调用 'hello()' 方法
document.querySelector('h3').innerHTML = StaticMethonClass.hello();
// 不能通过实例化后的对象调用静态方法
// document.querySelector('h3').innerHTML = staticMethonClass.hello(); // 错误用法
// 以上代码会报错
// 如果你想在对象 noob 中使用静态方法，可以作为一个参数传递给它：
let staticMethonClassB = new StaticMethonClassB('helloB+');
document.querySelector('h3').innerHTML = StaticMethonClassB.hello(staticMethonClassB);
// 注意：上述代码若使用同一个“静态方法类：StaticMethonClass”，报错：x is undefined。

// 第三方库：jQuery、prototype使用
// function myFunction() { // js写法
//     var obj = document.getElementById('demoB');
//     obj.innerHTML = 'Hello prototype';
// }
// onload = myFunction; // 这个方式调用函数也可以
// myFunction(); // 这个方式调用函数也可以
// function myFunction() { // jQuery写法。说语法有错误。
//     $('demoB').html('Hello jQuery');
// }
// $(document).ready(myFunction);
function myFunction() { // prototype写法
    $('demoB').insert('Hello prototype');
}
Event.observe(window,'load',myFunction);

console.log("结束2");
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
