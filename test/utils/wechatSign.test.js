import { wechatSign } from '../../src/utils';

test('微信签名 1', () => {
  expect(
    wechatSign({
      timestamp: '123344554455',
      nonce: 'DFGGEss039'
    }, 'test')
  ).toBe('2f5ad65e582c91c0752c4902305e6213af6c53c3');
});

test('微信签名 2', () => {
  expect(
    wechatSign({
      timestamp: '123344554455',
      nonce: 'DFGGEss039',
      ex: 120 // 不会参与签名
    }, 'test')
  ).toBe('2f5ad65e582c91c0752c4902305e6213af6c53c3');
});
