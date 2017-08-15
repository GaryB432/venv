import * as index from '../src/index';

test('Should have EnvironmentTemplateHandler available', () => {
  expect(index.EnvironmentTemplateHandler).toBeTruthy();
});

test('Should have ArgumentParser available', () => {
  expect(index.readArguments).toBeTruthy();
});
