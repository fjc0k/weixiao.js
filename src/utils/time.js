export default {
  now() {
    return Date.now();
  },
  unixNow() {
    return Math.floor(Date.now() / 1000);
  }
}
