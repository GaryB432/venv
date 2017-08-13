import { Options, readArguments } from '../src/argument-parser';

test('Should throw', () => {
  expect(() => readArguments(['--snot'])).toThrowError('not supported');
});

test('Should get default options', () => {
  const expected: Options = {
    appIndex: 0,
    configPath: '.angular-cli.json',
    environment: 'dev',
    rename: false,
    saveTemplates: true,
  };
  expect(readArguments([])).toEqual(expected);
});

test('Should get options', () => {
  const expected: Options = {
    appIndex: 3,
    configPath: '.my-cli.json',
    environment: 'tester',
    rename: false,
    saveTemplates: false,
  };
  expect(
    readArguments([
      '--env=tester',
      '--app=3',
      '--config=.my-cli.json',
      '--no-save',
    ])
  ).toEqual(expected);
});
