import * as fs from 'fs-extra';
import * as path from 'path';
import { AppRangeError } from './app-range-error';
import { EnvNotFoundError } from './env-not-found-error';

interface AngularAppConfig {
  root: string;
  environmentSource: string;
  environments: { [index: string]: string };
}

interface AngularConfig {
  apps: AngularAppConfig[];
}

export class AngularConfigReader {
  private readonly config: AngularConfig;
  constructor(private configPath: string) {
    const json = fs.readFileSync(this.configPath, { encoding: 'utf-8' });
    this.config = JSON.parse(json) as AngularConfig;
  }
  public getEnvironmentPath(appIndex: number, envName: string): string {
    if (this.config.apps.length > appIndex) {
      const app = this.config.apps[appIndex];
      if (envName in app.environments) {
        return path.join(app.root, app.environments[envName]);
      } else {
        throw new EnvNotFoundError(envName);
      }
    } else {
      throw new AppRangeError(appIndex);
    }
  }
}
