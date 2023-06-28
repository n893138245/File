/**
 * 目的：读取文件数据，显示在前端。
 * 结果：成功。
 */
const express = require('express');
const app = express();

// 注：增加跨域处理，方可终端运行，被访问
const cors = require("cors") //跨域请求处理 后台处理
app.use(cors()); // 注册中间件

/*
// 假设已经有一个存储新闻数据的数组
const newsData = [
  { id: 1, title: '新闻标题1', content: '新闻内容1' },
  { id: 2, title: '新闻标题2', content: '新闻内容2' }
];
console.log('newsData:' + newsData);
*/

/* */
var fs = require('fs');
// const newsData = fs.readFileSync('output.txt')
const newsData = fs.readFileSync('person.json')
// const newsData = fs.readFileSync('news.json')
console.log('newsData:' + newsData);


// 获取所有新闻
app.get('/api/news', (req, res) => {
    /**/
//   res.json(newsData);
    // res.jsonp(newsData); // 输出效果与原有一致
//   res(newsData);
//   res(JSON.stringify(newsData));
    // res(newsData);
    res.end(newsData);

    /* 这种解析方式，只支持node.js。不支持js。
    const bufferData = {
        "type": "Buffer",
        "data": [232, 191, 153, 230, 152, 175, 228, 184, 128, 228, 184, 170, 105, 110, 112, 117, 116, 46, 116, 120, 116, 230, 150, 135, 228, 187, 182, 239, 188, 140, 228, 184, 147, 233, 151, 168, 231, 148, 168, 228, 186, 142, 230, 181, 139, 232, 175, 149, 227, 128, 130]
      };
      
      const buffer = Buffer.from(bufferData.data);
      const decodedString = buffer.toString('utf8');
      console.log(decodedString);
      */

      /*
      const buffer = Buffer.from(newsData.data);
      const decodedString = buffer.toString('utf8');
      console.log(decodedString);
      res(decodedString);
      */
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
