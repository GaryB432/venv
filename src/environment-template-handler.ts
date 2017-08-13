import * as ejs from 'ejs';
import * as fs from 'fs-extra';

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

export interface ProcessLike {
  env: NodeJS.ProcessEnv;
}

const ef8 = {
  encoding: 'utf-8',
};

export interface TemplateHandlerOptions {
  onPreRender: (path: string, data: string) => void;
}

export class EnvironmentTemplateHandler {
  constructor(private options: TemplateHandlerOptions) {}
  public renderEnvContext(template: string, envContainer: ProcessLike): string {
    const compiled = ejs.compile(template);
    const result = compiled(preprocess(envContainer));
    return result;
  }

  public renderEnvContextTemplateFile(
    path: string,
    envContainer: ProcessLike,
    callback: (err: Error | null, data?: string) => void
  ): void {
    fs.readFile(path, ef8, (err, templatBuffer) => {
      if (err) {
        callback(err);
      } else {
        const template = templatBuffer.toString();
        callback(null, this.renderEnvContext(template, envContainer));
        if (this.options.onPreRender) {
          this.options.onPreRender(path, template);
        }
      }
    });
  }

  public renderEnvContextTemplateFileSync(
    path: string,
    envContainer: ProcessLike
  ): string {
    const template = fs.readFileSync(path, ef8);
    if (this.options.onPreRender) {
      this.options.onPreRender(path, template);
    }
    return this.renderEnvContext(template, envContainer);
  }
}
