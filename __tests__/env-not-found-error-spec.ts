import { EnvNotFoundError } from '../src/env-not-found-error';

test('Should greet with message', () => {
  const err = new EnvNotFoundError('stuff');
  expect(err.message).toBe("Environment 'stuff' not found");
});
