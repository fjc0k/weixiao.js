import crypto from 'crypto';

export default function(params, token) {
  const shasum = crypto.createHash('sha1');
  const arr = [
    token,
    params.timestamp,
    params.nonce
  ].sort();
  shasum.update(arr.join(''));
  return shasum.digest('hex');
}
