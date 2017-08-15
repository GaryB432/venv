import { EnvironmentTemplateHandler } from '../src/environment-template-handler';

let sut: EnvironmentTemplateHandler;

const templatePath = './__tests__/fixture.txt.template';

const mockProcess = {
  env: {
    USERNAME: 'friend',
    bad: '}} console.log("no!");',
    planet: 'world',
  },
};

function handlePreRender(path: string, data: string) {}

beforeAll(done => {
  sut = new EnvironmentTemplateHandler({ onPreRender: handlePreRender });
  done();
});

test('escapes env content', () => {
  expect(
    sut.renderEnvContext('This should be ok, <%= env.bad %>!', mockProcess)
  ).toBe('This should be ok, }} console.log(&#34;no!&#34;);!');
});

test('renders env content', () => {
  expect(
    sut.renderEnvContext('Bonjour, <%= env.USERNAME %>!', mockProcess)
  ).toBe('Bonjour, friend!');
});

test('renders from file async', done => {
  sut.renderEnvContextTemplateFile(templatePath, mockProcess, (e, actual) => {
    expect(e).toBeNull();
    expect(actual).toContain('world');
    done();
  });
});

test('renders from file sync', () => {
  expect(
    sut.renderEnvContextTemplateFileSync(templatePath, mockProcess)
  ).toContain('Hello world');
});
