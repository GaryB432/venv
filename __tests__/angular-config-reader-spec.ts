import { AngularConfigReader } from '../src/angular-config-reader';

test('Should throw on bad config', () => {
  const greeter = new AngularConfigReader(
    './__tests__/fixtures/.angular-cli.json'
  );
  expect(() => {
    greeter.getEnvironmentPath(0, 'N/A');
  }).toThrow();
});

test('Should get config', () => {
  const greeter = new AngularConfigReader(
    './__tests__/fixtures/.angular-cli.json'
  );
  expect(greeter.getEnvironmentPath(0, 'fixture')).toBe(
    '..\\basis-app\\src\\environments\\environment.fixture.ts'
  );
});
