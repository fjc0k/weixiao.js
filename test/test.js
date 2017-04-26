/**
 * Created by 方剑成 on 2017/4/22.
 */

mocha.setup('bdd');

const expect = chai.expect;

const api = {
  key: 'yourKey',
  secret: 'yourSecret'
};
const testMedia = { // 开通了应用的一个公众号的信息
  id: 'gh_3daf2618b310',
  name: '腾讯微校',
  school_name: '深圳大学',
  school_code: '950944945943',
  qrcode: 'http://open.weixin.qq.com/qr/code/?username=gh_3daf2618b310',
  media_number: 'iweschool'
};
const wx = new Weixiao(api);

describe('weixiao.js test', () => {

  it('getQRCode', () => {
    expect(Weixiao.getQRCode(testMedia.id)).to.equal(testMedia.qrcode);
  });

  it('getMediaInfo', () => {
    return Promise.all([
      new Promise((resolve, reject) => {
        wx.getMediaInfo(testMedia.id).then(
          res => {
            expect(res).to.contain.all.keys(testMedia);
            expect(res.id).to.equal(testMedia.id);
            expect(res.name).to.equal(testMedia.name);
            expect(res.qrcode).to.equal(testMedia.qrcode);
            resolve();
          }
        );
      }),
      new Promise((resolve, reject) => {
        wx.getMediaInfo(testMedia.id + 'HelloWorld').catch(
          err => {
            expect(err).to.equal('公众号不存在');
            resolve();
          }
        );
      }),
    ]);
  });


  it('getApi', () => {
    expect(wx.getApi()).to.deep.equal(api);
  });

  it('setApi', () => {
    let newApi = {
      key: 1234,
      secret: 5678
    };
    wx.setApi(newApi);
    expect(wx.getApi()).to.deep.equal(newApi);
  });

});

mocha.run();