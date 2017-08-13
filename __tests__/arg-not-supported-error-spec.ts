import { ArgumentNotSupportedError } from '../src/arg-not-supported-error';

test('Should have proper message', () => {
  const err = new ArgumentNotSupportedError('friend');
  expect(err.message).toBe("Argument 'friend' not supported");
});
