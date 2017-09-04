import md5 from 'blueimp-md5';

const defaultExcludeKeys = ['type', 'sign', 'keyword'];

export default function(params, secret, excludeKeys = []) {
  excludeKeys = [ ...defaultExcludeKeys, ...excludeKeys ];
  const signStrings = Object
                            .keys(params)
                            .filter(key => excludeKeys.indexOf(key) === -1 && params[key] !== '')
                            .sort()
                            .map(key => `${key}=${params[key]}`);
  signStrings.push(`key=${secret}`);
  return md5(signStrings.join('&')).toUpperCase();
}
