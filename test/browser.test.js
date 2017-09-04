/**
 * @jest-environment jsdom
 */

import Weixiao from '../lib/browser';
import cfg from './config';

const wx = new Weixiao(cfg);

describe('getMediaInfo', () => {

  test(`by empty mediaId = ''`, async () => {
    await expect(
      wx.getMediaInfo('')
    ).rejects.toMatch('参数错误');
  });

  test(`by nonexistent mediaId = 'haha'`, async () => {
    await expect(
      wx.getMediaInfo('haha')
    ).rejects.toMatch('不存在');
  });

  test(`by existent but unopened mediaId = 'gh_4e7837ae5767'`, async () => {
    await expect(
      wx.getMediaInfo('gh_4e7837ae5767')
    ).rejects.toMatch('未开启');
  });

  test(`by existent and opened mediaId = '${cfg.mediaId}'`, async () => {
    expect(
      await wx.getMediaInfo(cfg.mediaId)
    ).toEqual(
      expect.objectContaining(cfg.mediaInfo)
    );
  });

});
