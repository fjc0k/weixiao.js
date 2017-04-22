/**
 * Created by 方剑成 on 2017/4/22.
 */

export default function (len = 10) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }
  return str;
}