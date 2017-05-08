/**
 * Created by 方剑成 on 2017/4/22.
 */

import assertOk from 'assert-ok';
import md5 from 'blueimp-md5';

export default function (params, key) {

  assertOk(typeof params === 'object', 'params must be Object type');

  assertOk(key, 'key can not be empty');

  let queryString =
    Object.keys(params).sort()
    .map(key => key + '=' + params[key])
    .join('&');

  return md5(queryString + '&key=' + key).toUpperCase();

}