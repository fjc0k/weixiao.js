import Weixiao from '../lib/server';
import cfg from './config';

const wx = new Weixiao(cfg);

test('getMediaInfo', async () => {
  expect(
    await wx.getMediaInfo(cfg.mediaId)
  ).toEqual(
    expect.objectContaining(cfg.mediaInfo)
  );
});

test('getMediaKeywords', async () => {
  expect(
    await wx.getMediaKeywords(cfg.mediaId)
  ).toEqual(
    expect.arrayContaining(cfg.mediaKeywords)
  );
});

test('generateRequest', () => {
  const req = wx.generateRequest({ text: 'haha' });
  expect(req).toEqual(
    expect.objectContaining({
      api_key: cfg.key,
      text: 'haha'
    })
  );
  expect(req.sign !== undefined).toBe(true);
  expect(req.nonce_str.length).toBe(32);
});

test('generateResponse', () => {
  expect(Weixiao.generateResponse({
    text1: 'hello',
    text2: 'hi'
  }, 5005)).toEqual(
    expect.objectContaining({
      errcode: 5005,
      errmsg: '公众号未开启应用',
      text1: 'hello',
      text2: 'hi'
    })
  );
});

test('checkInterval', () => {
  const now = Math.floor(Date.now() / 1000);
  expect(Weixiao.checkInterval({})).toBe(false);
  expect(Weixiao.checkInterval({
    timestamp: now - 1
  }, 2)).toBe(true);
  expect(Weixiao.checkInterval({
    timestamp: now - 5
  }, 2)).toBe(false);
  expect(Weixiao.checkInterval({
    timestamp: now - 59
  }, 60)).toBe(true);
  expect(Weixiao.checkInterval({
    timestamp: now - 60
  }, 60)).toBe(true);
  expect(Weixiao.checkInterval({
    timestamp: now - 61
  }, 60)).toBe(false);
});

test('checkSign', () => {
  expect(wx.checkSign({
    type: 'config', // 不参与签名
    media_id: 'gh_2a866851d1f9',
    timestamp: '1504501329',
    nonce_str: 'ABC3081018933336A4B23B231126B51E',
    platform: 'weixiao',
    sign: '74326A740FD55CABF70E8F52780AC7E5'
  })).toBe(true);
  expect(wx.checkSign({
    type: 'hhh', // 不参与签名
    media_id: 'gh_2a866851d1f9',
    timestamp: '1504501329',
    nonce_str: 'ABC3081018933336A4B23B231126B51E',
    platform: 'weixiao',
    sign: '74326A740FD55CABF70E8F52780AC7E5'
  })).toBe(true);
  expect(wx.checkSign({
    type: 'hhh', // 不参与签名
    media_id: 'gh_2a866851d1f9',
    timestamp: '123', // 时间戳变动
    nonce_str: 'ABC3081018933336A4B23B231126B51E',
    platform: 'weixiao',
    sign: '74326A740FD55CABF70E8F52780AC7E5'
  })).toBe(false);
});
