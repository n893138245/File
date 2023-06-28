/**
 * 客户端
 */

console.log('Start');

/* 
// import sha256 from 'crypto-js/sha256';
import NodeRSA from 'node-rsa'
function entrypt(publicKey, value) {
  // 生成RSA对象
  const key = new NodeRSA({ b: 512 })
  // 导入公钥
  key.importKey(publicKey)
  return key.encrypt(value, 'base64')
}

// 登录业务
async function request_login (name, pwd) {
  try {
    let {publicKey} = await request_getPublicKey() || {}
    let pwdStr = encrypt(publicKey, pwd)
    const res = await api.login(name, pwdStr);
    const { token, userName, userId } = res.data || {};
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
*/

/* // 失败
// const { createHmac, createHash } = require('node:crypto');
import createHash from "crypto-js";
const secret = 'NSHash';
// sha256加密
const hsahB = createHash('sha256')
                .update(secret)
                .digest('hex'); // 正确结果
console.log(hsahB);
*/
/*
import createHash from "crypto-js/crypto-js";
const secret = 'NSHash';
// sha256加密
const hsahB = createHash('sha256')
                .update(secret)
                .digest('hex'); // 正确结果
console.log(hsahB);
*/

// import createHash from "./node_modules/crypto-js/crypto-js/sha256";
// import CryptoJs from 'crypto-js';
// import {LazyService} from '@delon/util';
// import {crypto} from 'crypto-js/sha256'
// import {crypto} from '/node_modules/crypto-js/sha256'

console.log('End');
