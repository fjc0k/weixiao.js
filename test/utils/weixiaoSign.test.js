import { weixiaoSign } from '../../src/utils';

test('微校签名 1', () => {
  expect(
    weixiaoSign({
      author: 'funch',
      email: 'fjc0kb@gmail.com',
      age: 22
    }, '4FB9AEC06428D4AF37516827F9FFD905')
  ).toBe('AE7D604861A0AE2B8332356E367EFB8A');
});

test('微校签名 2', () => {
  expect(
    weixiaoSign({
      a: 'b',
      c: 'd',
      e: 'f',
      o: 0,
      type: 'haha' // type 默认会被排除
    }, 'test')
  ).toBe('39EB938A6E76887D6D6516D206690891');
});

test('微校签名 3', () => {
  expect(
    weixiaoSign({
      x: 'y',
      yoyo: 1,
      xixi: 2,
      sign: 'XSSDFFEE' // sign 默认会被排除
    }, 'papa', [
      'yoyo', // 会被排除
      'xixi' // 会被排除
    ])
  ).toBe('C639A68BB3CAF156B271F152FDF15ED9');
});
