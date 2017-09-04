import { randomString } from '../../src/utils';

test('randomString', () => {
  for (let i = 0; i <= 50; i++) {
    expect(
      randomString(i).length === i
    ).toBe(true);
  }
});
