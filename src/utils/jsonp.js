/**
 * Created by 方剑成 on 2017/4/22.
 */

import assertOk from 'assert-ok';
import randomString from './randomString';

const objectToQueryString = obj => (
  typeof obj === 'object' ? Object.keys(obj).map(
    key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  ).join('&') : String(obj)
);

export default function (url, data = {}, jsonp = 'callback') {
  return new Promise((resolve, reject) => {

    assertOk(url, 'url can not be empty');

    let callback, script;

    if (typeof data === 'string') {
      jsonp = data;
      data = {};
    }

    callback = 'jsonp' + randomString(6);

    data[jsonp] = callback;

    url += (url.indexOf('?') === -1 ? '?' : '&') + objectToQueryString(data);

    window[callback] = (obj) => {
      resolve(obj);
      try {
        delete window[callback];
        document.body.removeChild(script);
      } catch (e) {
        console.log(e);
      }
    };

    script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = reject;

    document.body.appendChild(script);

  });
}