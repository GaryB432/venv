import * as ejs from 'ejs';
import * as fs from 'fs-extra';

export interface ProcessLike {
  env: NodeJS.ProcessEnv;
}

const ef8 = {
  encoding: 'utf-8',
};

function preprocess(
  envContainer: ProcessLike,
  predicate: (s: string) => string = s => s
): ProcessLike {
  const result = Object.keys(envContainer.env).reduce<ProcessLike>(
    (p, c) => {
      Object.assign(p.env, {
        [c]: predicate(envContainer.env[c]!),
      });
      return p;
    },
    {
      env: {},
    }
  );

  return result;
}

export class EnvironmentTemplateHandler {
  public renderEnvContextTemplateFile(
    path: string,
    envContainer: ProcessLike
  ): Promise<string>;
  public renderEnvContextTemplateFile(
    path: string,
    envContainer: ProcessLike,
    callback: (err: Error | null, data?: string) => void
  ): void;
  public renderEnvContextTemplateFile(
    path: string,
    envContainer: ProcessLike,
    callback?: (err: Error | null, data?: string) => void
  ): void | Promise<string> {
    if (callback) {
      fs.readFile(path, ef8, (err, templatBuffer) => {
        if (err) {
          callback(err);
        } else {
          const template = templatBuffer.toString();
          callback(
            null,
            EnvironmentTemplateHandler.renderEnvContext(template, envContainer)
          );
        }
      });
    } else {
      return fs
        .readFile(path, ef8)
        .then(template => {
          return EnvironmentTemplateHandler.renderEnvContext(
            template,
            envContainer
          );
        })
        .catch(e => {
          throw e;
        });
    }
  }

  public renderEnvContextTemplateFileSync(
    path: string,
    envContainer: ProcessLike
  ): string {
    const template = fs.readFileSync(path, ef8);
    return EnvironmentTemplateHandler.renderEnvContext(template, envContainer);
  }

  public static renderEnvContext(
    template: string,
    envContainer: ProcessLike
  ): string {
    const compiled = ejs.compile(template);
    const result = compiled(preprocess(envContainer));
    return result;
  }
}
