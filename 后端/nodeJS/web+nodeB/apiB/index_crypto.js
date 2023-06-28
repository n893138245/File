/**
 * 目的：使用crypto库（加密库）
 * 结果：成功
 */
const { createHmac, createHash } = require('node:crypto');

// const secret = 'abcdefg';
const secret = 'NSHash';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e

// sha256加密
const hashB = createHash('sha256')
                .update(secret)
                .digest('hex'); // 正确结果
console.log(hashB);

/* 
// sign
const {
    generateKeyPairSync,
    createSign,
    createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
    namedCurve: 'sect239k1',
});

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// Prints: true
*/

/* 
// sign
const {
    generateKeyPairSync,
    createSign,
    createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

const sign = createSign('SHA256');
sign.update('some data to sign');
console.log(sign.update('some data to sign'));
sign.end();
const signature = sign.sign(privateKey);

const verify = createVerify('SHA256');
verify.update('some data to sign2');
verify.end();
console.log(verify.verify(publicKey, signature));
// Prints: true
*/

