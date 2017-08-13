import { ArgumentNotSupportedError } from './arg-not-supported-error';

export interface Options {
  appIndex: number;
  configPath: string;
  environment: string;
  rename: boolean;
  saveTemplates: boolean;
}

const defaultOptions: Options = {
  appIndex: 0,
  configPath: '.angular-cli.json',
  environment: 'dev',
  rename: false,
  saveTemplates: true,
};

export function readArguments(args: string[]): Options {
  return args.reduce<Options>(
    (accum, harg) => {
      switch (harg) {
        case '--no-save':
          accum.saveTemplates = false;
          break;
        case '--prod':
          accum.environment = 'prod';
          break;
        case '--rename':
          accum.rename = true;
          break;
        default:
          const parts = harg.split('=').map(s => s.trim());
          switch (parts[0]) {
            case '--app':
              accum.appIndex = +parts[1];
              break;
            case '--config':
              accum.configPath = parts[1];
              break;
            case '--env':
              accum.environment = parts[1];
              break;
            default:
              throw new ArgumentNotSupportedError(harg);
          }
          break;
      }
      return accum;
    },
    { ...defaultOptions }
  );
}
