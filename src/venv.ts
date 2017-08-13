#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as md5 from 'md5';
import * as yargs from 'yargs';
import { AngularConfigReader } from './angular-config-reader';
import { Options } from './argument-parser';
import { EnvironmentTemplateHandler } from './environment-template-handler';

const argv = yargs
  .usage('Usage: $0 <cmd> [options]') // usage string of application.
  .command('ngenv', 'replace angular template environment file')
  .option('f', {
    alias: 'configPath',
    default: '.angular-cli.json',
    description: 'the cli configuration to use',
  })
  .option('a', {
    alias: 'appIndex',
    default: 0,
    description: "the index of the configuration's apps to use",
    type: 'number',
  })
  .option('e', {
    alias: 'env',
    default: 'dev',
    description: 'which enviornment to process',
    nargs: 1,
    type: 'string',
  })
  .option('r', {
    alias: 'rename',
    default: false,
    description: 'use a new name for the processed environment file',
    type: 'boolean',
  })
  .option('s', {
    alias: 'save',
    default: true,
    description: 'save enviornment files before processing',
    type: 'boolean',
  })
  .option('prod', {
    description: 'use the prod environment, equivalent to --e prod',
    type: 'boolean',
  })
  .option('h', {
    alias: 'help',
    description: 'display help message',
  })
  .alias('v', 'version')
  .version(() => require('../package').version)
  .describe('v', 'show version information')
  .help('help')
  .example('venv --prod', 'process your production environment')
  .epilog('for more information visit https://github.com/GaryB432/venv')
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help').argv;

const opts: Options = {
  appIndex: argv.appIndex,
  configPath: argv.configPath,
  environment: argv.prod ? 'prod' : argv.env,
  rename: argv.rename,
  saveTemplates: argv.save,
};

function handlePreRender(pathString: string, data: string) {
  if (opts.saveTemplates) {
    const templatePath = `${pathString}.${md5(data)}.template`;
    fs.writeFileSync(templatePath, data);
  }
}

if (argv._[0] === 'ngenv') {
  const acr = new AngularConfigReader(opts.configPath);

  const envPath = acr.getEnvironmentPath(opts.appIndex, opts.environment);
  const eth = new EnvironmentTemplateHandler({
    onPreRender: handlePreRender,
  });

  eth.renderEnvContextTemplateFile(envPath, process, (_err, data) => {
    const fn = opts.rename ? envPath.concat('.new.ts') : envPath;
    fs.writeFileSync(fn, data);
    console.log(fn); // tslint:disable-line
  });
}
