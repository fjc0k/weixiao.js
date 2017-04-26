/**
 * Created by 方剑成 on 2017/4/22.
 */

import assertOk from 'assert-ok';
import jsonp from 'ok-jsonp';
import {
  randomString,
  sign
} from './utils';

const MEDIA_INFO_URL = 'http://weixiao.qq.com/common/get_media_infop';
const QRCODE_URL = 'http://open.weixin.qq.com/qr/code/?username=';

export default class Weixiao {

  constructor(api) {
    if (!!api) this.setApi(api);
  }

  setApi({ key, secret }) {
    assertOk(key && secret, 'both key and secret can not be empty');
    this.api = {
      key,
      secret
    };
  }

  getApi() {
    return this.api;
  }

  getMediaInfo(mediaId) {
    assertOk(mediaId, 'media id can not be empty');
    let params = {
      api_key: this.api.key,
      media_id: mediaId,
      nonce_str: randomString(32),
      timestamp: Math.round(+new Date() / 1000)
    };
    params['sign'] = Weixiao.sign(params, this.api.secret);
    return new Promise((resolve, reject) => {
      jsonp(MEDIA_INFO_URL, params, 'callback_name')
        .then(
          res => {
            if (res.errmsg) reject(res.errmsg);
            else {
              res.id = mediaId;
              res.qrcode = Weixiao.getQRCode(mediaId);
              resolve(res);
            }
          },
          reject
        );
    });
  }

  static sign(params, secret) {
    return sign(params, secret);
  }

  static getQRCode(mediaId) {
    return QRCODE_URL + mediaId;
  }

}