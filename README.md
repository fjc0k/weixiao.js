# weixiao.js
一个小巧的腾讯微校开放平台js封装库~
> 库本身未引入 Promise Polyfill([推荐: taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill)), 若有需要, 请自行引入!
## Install
#### Node
```shell
npm i weixiao.js -S
```
#### Browser
```html
<script src="./dist/weixiao.js.min.js"></script>
```
## Usage
#### Node
```javascript
import Weixiao from 'weixiao.js';

const api = {
  key: 'key',
  secret: 'secret'
};
let mediaId = 'hello';

const wx = new Weixiao(api);

// 获取公众号基本信息
// 文档: http://open.weixiao.qq.com/app/index.html#/api?content=getInfo&_k=woxdbt
// 注: 若获取成功, 除返回官方文档给出的全部参数外,
// 还会返回 id（等于mediaId）、qrcode（公众号二维码图片地址） 参数
wx.getMediaInfo(mediaId).then(
  info => console.log(info),
  err => console.log(err)
);
// 返回示例:
// id: "gh_3daf2618b310"
// media_number: "iweschool"
// name: "腾讯微校"
// qrcode: "http://open.weixin.qq.com/qr/code/?username=gh_3daf2618b310"
// school_code: "950944945943"
// school_name: "深圳大学"


// 辅助方法
wx.setApi({
  key: 'newKey',
  secret: 'newSecret'
});
wx.getApi();


// 静态方法
// 通过 mediaId 获取二维码图片地址
Weixiao.getQRCode(mediaId);
// 签名
Weixiao.sign({
  hello: 'world',
  mm: 'hhh'
}, 'yourSecret');
```
#### Browser
```javascript
var api = {
  key: 'key',
  secret: 'secret'
};
var mediaId = 'hello';

var wx = new Weixiao(api);

// 获取公众号基本信息
// 文档: http://open.weixiao.qq.com/app/index.html#/api?content=getInfo&_k=woxdbt
// 注: 若获取成功, 除返回官方文档给出的全部参数外,
// 还会返回 id（等于mediaId）、qrcode（公众号二维码图片地址） 参数
wx.getMediaInfo(mediaId).then(function (info) {
  return console.log(info);
}, function (err) {
  return console.log(err);
});
// 返回示例:
// id: "gh_3daf2618b310"
// media_number: "iweschool"
// name: "腾讯微校"
// qrcode: "http://open.weixin.qq.com/qr/code/?username=gh_3daf2618b310"
// school_code: "950944945943"
// school_name: "深圳大学"


// 辅助方法
wx.setApi({
  key: 'newKey',
  secret: 'newSecret'
});
wx.getApi();

// 静态方法
// 通过 mediaId 获取二维码图片地址
Weixiao.getQRCode(mediaId);
// 签名
Weixiao.sign({
  hello: 'world',
  mm: 'hhh'
}, 'yourSecret');
```