/**
 * 目的：前后端交互安全 & 移动端后端交互安全。
 * 结果：失败。
 * 
 * 注：交互安全，意指网络通信安全性。
 * 常见做法：token、非对称加密、对称加密、HTTPS、非明文处理、反抓包ssl pinning、ddos攻击保护、跨站请求保护、反编译、cookie。
 * 不安全：MD5、DES、RC4。
 * 安全：SHA256。
 */
const jwt = require('jsonwebtoken')
const PRIVATEKET = 'hello_jwt' // token 加密密钥

// 签发
const token = jwt.sign( info, PRIVATEKET, {expiresIn: '7d'})
// 验证
// 并提取负载信息
const info = jwt.verify(token, PRIVATEKET) 

/**
 * 业务使用
 */
// koa 登录接口
router.post('/login', async ctx => {
  try {
    const { userName, password } = ctx.request.body || {}
    let results = await mysql.findUserName(userName)
    let userInfo = results[0]
    if (userInfo.password === password) {
      const info = {userName: userInfo.name, userId: userInfo.id }
      // 签发 token， 7天有效期
      const token = jwt.sign( info, PRIVATEKET, {expiresIn: '7d'})
      ctx.response.body = {code: 200, msg: '登录成功', data: {token: token, ...info}}
    } else {
      ctx.response.body = {code: 0, msg: '帐号不存在'}
    }
  } catch(err) {
    ctx.response.body = {code: -1, msg: '服务器异常'}
    throw new Error(err)
  }
})
// 添加数据
router.post('/addComment', async ctx => {
  const token = ctx.get('token') // 获取请求 Header 中 Authorization 值
  if (!token) {
    return ctx.response.body = {code: 0, msg: '未登录'}
  }
  try {
    // 验证 token
    // 验证失败会进入 catch
    let info = jwt.verify(token, PRIVATEKET)
    let {userId, comment} = ctx.request.body || {}
    if(!userId) {
      return ctx.response.body = {code: 0, msg: '数据错误'}
    }
    let {insertId} = await mysql.addComment(userId, comment)
    ctx.response.body = {code: 0, data: {insertId}, msg: 'success'}
  } catch(err) {
    // token 过时或无效
    ctx.response.body = {code: 0, msg: '未登录'}
  }
})
