// import axios form 'axios';

function sayHi(str) {
    return '您好啊' + str;
}
var text = '大甜瓜';
console.log(sayHi(text));

// ----------------------------------------------

// 查询数据
async function stuff() {
    await connectToServer();
}

/* */
// success 查询数据
async function connectToServer() {
    console.log('查询所有数据');
    const xhttp = new XMLHttpRequest(); 
    xhttp.onload = function() { 
        // alert(this.responseText);
        console.log(this.responseText);
        // console.log('test');
        // console.log(this.responseText.toString('utf8'));
    }; 
    // xhttp.open('GET', '/api/router.js', true); // 仍旧获取的是代码
    // xhttp.open('GET', '/apiB/index.js', true); 
    // xhttp.open('GET', 'http://localhost:8889', true);
    xhttp.open('GET', 'http://localhost:8889/api/news', true);
    // xhttp.open('GET', 'http://localhost:8889/api/news/2', true); // success：增加跨域处理才可以。
    // xhttp.open('GET', 'http://localhost:3000/', true);  // success：不是在当前项目的，是在本电脑其它项目中，前提是必须开启服务才可以。
    // xhttp.open('GET', 'http://82.156.141.27:8080/', true);
    // xhttp.open('GET', 'http://82.156.141.27:8889/', true); // 上传至云服务器的代码，代码中必须包含解决跨域的代码，否则前端代码无法访问。
    xhttp.send();
    return;
}

function searchDetail() {
    console.log('查询详细数据');
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:8889/api/news/2', true);
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    xhttp.send();
}

async function add() {
    console.log('增加数据');
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://localhost:8889/api/newsAdd', true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    const data = {
        "id": 100,
        "name": "腾讯",
        "url": "www.tenxun.com",
        "alexa": "100",
        "country": "CN"
    }
    xhttp.send(JSON.stringify(data));
    return;
}

async function remove() {
    console.log('删除数据');
    const xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', 'http://localhost:8889/api/newsDelete/100', true);
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    xhttp.send();
}

async function change() {
    console.log('更改数据');
    const xhttp = new XMLHttpRequest();
    xhttp.open('PUT', 'http://localhost:8889/api/newsChange/100', true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    const params = {
        "id": 100,
        "name": "腾讯4",
        "url": "www.tenxun.com3",
        "alexa": "103",
        "country": "CN3"
    }
    xhttp.send(JSON.stringify(params));
}

// ------------------------------------------------

/* // fail 
var xhr = new XMLHttpRequest();
xhr.open('GET', '/apiB/index.js', true);
xhr.onreadystatechange = function() {
    console.log('连接后端');
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('连接后端成功');
    } else {
        console.log('连接后端失败');
    }
};
xhr.send
*/

/* 
var xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/router.js', true);
xhr.open('GET', '/apiB/index.js', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
  }
};
xhr.send();
*/

/* 
// fetch('/api/dbconfig.js')
// fetch('/api/router.js') // 可以正常访问
fetch('/apiB/index.js') // 可以正常访问
// fetch('http://82.156.141.27:8080/') // 不能正常访问
//   .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
*/

/*
import axios from 'axios';

// axios.get('/api/router.js')
axios.get('/apiB/index.js')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
*/

