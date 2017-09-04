import jsonp from 'ok-jsonp';
import time from './utils/time';
import randomString from './utils/randomString';
import weixiaoSign from './utils/weixiaoSign';
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
   * 获取公众号信息
   * @param  {String} mediaId 公众号原始ID
   * @return {Object}         公众号信息
   */
  getMediaInfo(mediaId) {
    const params = {
      api_key: this.api.key,
      media_id: mediaId,
      nonce_str: randomString(32),
      timestamp: time.unixNow()
    };
    params['sign'] = weixiaoSign(params, this.api.secret);
    return new Promise((resolve, reject) => {
      jsonp(config.urls.getMediaInfoJSONP, params, 'callback_name')
        .then(res => {
          if (res.errmsg) {
            reject(res.errmsg);
          } else {
            res.qrcode = Weixiao.getQRCode(mediaId);
            resolve(res);
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
