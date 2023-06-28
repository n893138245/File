/**
 * 目的：前后端交互安全 & 移动端后端交互安全。
 * 结果：失败。
 * 
 * 注：交互安全，意指网络通信安全性。
 * 常见做法：token、非对称加密、对称加密、HTTPS、非明文处理、反抓包ssl pinning、ddos攻击保护、跨站请求保护、反编译、cookie。
 * 不安全：MD5、DES、RC4。
 * 安全：SHA256。
 */

/**
 * 服务端
 */
const NodeRSA = require('node-rsa')
class RSA {
  constructor () {
    this.key = null
    this.publicKey = ''
    this.privateKey = ''
  }
  initRsa () {
    if(!this.key) {
      let key = new NodeRSA({
        b: 512
      });
      //指定加密格式  不改格式得话可能会报错
      // key.setOptions({ encryptionScheme: 'pkcs1' });
      this.key = key
      this.publicKey = key.exportKey('public'); // 公钥
      this.privateKey = key.exportKey('private'); // 私钥
    }
    return this.key;
  }
  decrypt (value) {
    this.key.importKey(this.privateKey)
    return this.key.decrypt(value, 'utf8')
  }
}

// 业务模块
const rsa = new RSA()
// 分发公钥
router.get('/getPublicKey', async (ctx) => {
  rsa.initRsa()
  ctx.response.body = { 
    code: 200, 
    msg: 'success', 
    data: {
      publicKey: rsa.publicKey
    }
  }
})
// 解密
// 沿用上部分案例
router.post('/login', async ctx => {
  try {
    const { userName, password } = ctx.request.body || {}
    let results = await mysql.findUserName(userName)
    let userInfo = results[0]
    if (userInfo) {
      // 解密后
      const truthyPwd = rsa.decrypt(password, 'utf8') 
      if( userInfo.password != truthyPwd ){
        return ctx.response.body = {code: 0, msg: '账号或密码错误'}
      }
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
