import { Options, readArguments } from '../src/argument-parser';

test('Should get options', () => {
  const expected: Options = {
    filePath: '__tests__\\fixture.txt',
  };
  expect(
    readArguments({
      _: ['process'],
      version: false,
      v: false,
      help: false,
      h: false,
      t: '__tests__\\fixture.txt',
      templatePath: '__tests__\\fixture.txt',
      $0: 'venv.js',
    })
  ).toEqual(expected);
});
