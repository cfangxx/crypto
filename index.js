/**
 * AES256比128大概需要多花40%的时间
 * 当前AES是较为安全的公认的对称加密算法
 *  aes 在使用是需要指定 key 与 iv
 */

var crypto = require('crypto');
 
/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
var encrypt = function (key, iv, data) {
     var s1 = new Date()

    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');

    var s2 = new Date();

     console.log('[encrypt]:'+data+','+(s2-s1) +'ms');
    return crypted;
};
 
/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
var decrypt = function (key, iv, crypted) {
     var s1 = new Date()
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
     var s2 = new Date();

    console.log('[decrypt]:'+decoded+','+(s2-s1) +'ms');
    return decoded;
};
 
var key = '751f621ea5c8f930';
console.log('加密的key:', key.toString('hex'));
var iv = '2624750004598718';
console.log('加密的iv:', iv);
var data = "Hello, nodejs. 演示aes-128-cbc加密和解密";
console.log("需要加密的数据:", data);
var crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);

var token = {
    email : 'cfang@juewang.com',
    fullName : '陈绝望'
}
var crypted = encrypt(key, iv, JSON.stringify(token));
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);