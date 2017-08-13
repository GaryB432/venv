import { AppRangeError } from '../src/app-range-error';

test('Should greet with message', () => {
  const err = new AppRangeError(98);
  expect(err.message).toBe("App '98' is out of range");
});
