import axios from 'axios';
import {
  randomString,
  weixiaoSign,
  wechatSign,
  time
} from './utils';
import config from './config';

export default class Weixiao {

  /**
   * 构造函数
   * @param  {Object} api 微校应用api
   * @return {undefined}     undefined
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * 检查签名(自动识别微校 or 微信)
   * @param  {Object} params      待签名的参数(含原签名)
   * @param  {Array} excludeKeys 不参与签名的参数
   * @return {Boolean}             签名是否正确
   */
  checkSign(params, excludeKeys) {
    if (params.signature) {
      return wechatSign(params, this.api.token) === params.signature;
    } else {
      return weixiaoSign(params, this.api.secret, excludeKeys) === params.sign;
    }
  }

  /**
   * 检查时间间隔是否正常
   * @param  {Object} params           参数
   * @param  {Number} [maxInterval=60] 最大时间间隔(秒)
   * @return {Boolean}                  检查结果
   */
  static checkInterval(params, maxInterval = 60) {
    if (!params.timestamp) return false;
    const interval = time.unixNow() - params.timestamp;
    return interval >= 0 && interval <= maxInterval;
  }

  /**
   * 获取错误码的具体信息
   * @param  {Number} errorCode 错误码
   * @return {String}           错误信息
   */
  static getErrorMessage(errorCode) {
    const errorObj = {
         0: '请求成功',
      5001: '请求微校接口失败',
      5002: '公众号不存在',
      5003: '请求接口失败',
      5004: '签名验证不通过',
      5005: '公众号未开启应用',
      5006: '请求接口参数错误',
      5007: '关键词同步异常，请稍候再试'
    };
    return errorObj[errorCode] || '未知错误';
  }

  /**
   * 生成响应内容
   * @param  {Object} params        响应参数
   * @param  {Number} [errorCode=0] 错误码
   * @return {Object}               响应内容
   */
  static generateResponse(params, errorCode = 0) {
    return Object.assign({
      errcode: errorCode,
      errmsg: Weixiao.getErrorMessage(errorCode)
    }, params);
  }

  /**
   * 生成请求内容
   * @param  {Object} params 请求参数
   * @return {Object}        请求内容
   */
  generateRequest(params) {
    const requestObj = Object.assign({
      api_key: this.api.key,
      timestamp: time.unixNow(),
      nonce_str: randomString(32)
    }, params);
    requestObj.sign = weixiaoSign(requestObj, this.api.secret);
    return requestObj;
  }

  /**
   * 获取公众号信息
   * @param  {String}  mediaId 公众号原始ID
   * @return {Object}         公众号信息
   */
  getMediaInfo(mediaId) {
    return new Promise((resolve, reject) => {
      this
        .$post(config.urls.getMediaInfo, { media_id: mediaId })
        .then(info => {
          info.qrcode = Weixiao.getQRCode(mediaId);
          info.avatar_image = info.avatar_image.replace('http:', 'https:');
          resolve(info);
        })
        .catch(reject);
    });
  }

  /**
   * 获取关键词
   * @param  {String}  mediaId 公众号原始ID
   * @return {Array}         关键词数组
   */
  getMediaKeywords(mediaId) {
    return new Promise((resolve, reject) => {
      this
        .$post(config.urls.getMediaKeywords, { media_id: mediaId })
        .then(({ keyword }) => {
          resolve(keyword.split(','));
        })
        .catch(reject);
    });
  }

  /**
   * post辅助函数
   * @param  {String} url       请求URL
   * @param  {Object} [body={}] 请求参数
   * @return {Object}           返回结果
   */
  $post(url, body = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, this.generateRequest(body))
        .then(({ data }) => {
          if (data.errcode && data.errcode !== 0) {
            reject(data.errmsg);
          } else {
            resolve(data);
          }
        })
        .catch(reject);
    });
  }

  /**
   * 获取公众号二维码URL
   * @param  {String} mediaId 公众号原始ID或微信号
   * @return {String}         公众号二维码URL
   */
  static getQRCode(mediaId) {
    return config.urls.getQRCodeImage + mediaId;
  }

}
