import * as index from '../src/index';

test('Should have EnvironmentTemplateHandler available', () => {
  expect(index.EnvironmentTemplateHandler).toBeTruthy();
});

test('Should have AngularConfigReader available', () => {
  expect(index.AngularConfigReader).toBeTruthy();
});

test('Should have ArgumentParser available', () => {
  expect(index.readArguments).toBeTruthy();
});

test('Should have EnvNotFoundError available', () => {
  expect(index.EnvNotFoundError).toBeTruthy();
});

test('Should have AppRangeError available', () => {
  expect(index.AppRangeError).toBeTruthy();
});

test('Should have ArgumentNotSupportedError available', () => {
  expect(index.ArgumentNotSupportedError).toBeTruthy();
});
