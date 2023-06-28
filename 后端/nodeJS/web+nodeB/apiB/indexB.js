/**
 * 成功：提供2个新闻接口，还可以根据id搜索具体的某个新闻详情。
 * from：ChatGPT。
 */
const express = require('express');
const app = express();

// 注：增加跨域处理，方可终端运行，被访问
const cors = require("cors") //跨域请求处理 后台处理
app.use(cors()); // 注册中间件

// 假设已经有一个存储新闻数据的数组
const newsData = [
  { id: 1, title: '新闻标题1', content: '新闻内容1' },
  { id: 2, title: '新闻标题2', content: '新闻内容2' }
];

// 获取所有新闻
app.get('/api/news', (req, res) => {
  res.json(newsData);
});

// 根据新闻ID获取单个新闻
app.get('/api/news/:id', (req, res) => {
  const newsId = parseInt(req.params.id);
  const news = newsData.find(item => item.id === newsId);
  if (news) {
    res.json(news);
  } else {
    res.status(404).json({ error: '新闻不存在' });
  }
});

// 监听端口
const port = 8889;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
