# weixiao.js - 腾讯微校应用开放平台 API

腾讯微校应用开发文档：[http://open.weixiao.qq.com/app/index.html#/api?content=beforeStart&_k=d8q1ae](http://open.weixiao.qq.com/app/index.html#/api?content=beforeStart&_k=d8q1ae)

## 安装

```shell
yarn add weixiao.js
```
或
```shell
npm install weixiao.js -S
```

## 使用

### 服务器端使用

```javascript
const Weixiao = require('weixiao.js');

const wx = new Weixiao({
  key: 'your key',
  secret: 'your secret',
  token: 'your token' // 仅 "消息回复类" 应用需要 token
});

(async () => {

  // 获取公众号信息
  // 返回结果格式如：{ name: '人民日报', ..., qrcode: '公众号二维码URL' }
  const mediaInfo = await wx.getMediaInfo('media id');

  // 获取公众号设置的应用关键词
  // 返回结果格式格式如：[ '关键词1', '关键词2', ... ]
  const mediaKeywords = await wx.getMediaKeywords('media id');

  // 签名验证
  // 该方法会根据传入的参数自动进行微校开放平台签名验证或微信公众平台签名验证
  // 返回结果格式格式如：true
  const checkSignResult = wx.checkSign('待验证的参数对象');

  // 时间戳验证
  // 该方法会检查当前时间戳与传入参数中的 timestamp 字段是否在一个合理的范围，以防止重放攻击
  // 返回结果格式格式如：true
  const checkIntervalResult = wx.checkInterval(
    '待验证的参数对象', // 若参数对象不含 timestamp 字段，将直接返回 false
    60 // 允许的最大时间差，单位：秒
  );

})();

```

### 浏览器端使用

> 你需自行引入 Promise Polyfill（推荐：[taylorhakes/promise-polyfill](https://github.com/taylorhakes/promise-polyfill)）。

```javascript
import Weixiao from 'weixiao.js';

const wx = new Weixiao({
  key: 'your key',
  secret: 'your secret'
});

// 获取公众号信息
wx.getMediaInfo('media id')
  .then(info => console.log(info))
  .catch(err => console.log(err));

```
