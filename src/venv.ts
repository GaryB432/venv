#!/usr/bin/env node
import * as fs from 'fs-extra';
import yargs = require('yargs');

import { EnvironmentTemplateHandler } from './environment-template-handler';

import { readArguments } from './argument-parser';

yargs // tslint:disable-line
  .command(
    'process',
    'replace template file with environment variables',
    y => {
      return y.option('t', {
        alias: 'templatePath',
        describe: 'the template file',
        nargs: 1,
        required: true,
      });
    },
    replaceWithTemplate
  )
  .example(
    '$0 process -t foo.js',
    'replace the specified file with its processed .template'
  )
  .demandCommand(1)
  .option('h', {
    alias: 'help',
    description: 'display help message',
  })
  .epilog('for more information see https://github.com/GaryB432/venv')
  .alias('v', 'version')
  .version(() => require('../package').version)
  .describe('v', 'show version information')
  .help().argv;

async function replaceWithTemplate(yav: yargs.Arguments): Promise<void> {
  const opts = readArguments(yav);
  const eth = new EnvironmentTemplateHandler();
  eth
    .renderEnvContextTemplateFile(opts.filePath.concat('.template'), process)
    .then(data => {
      fs.writeFile(opts.filePath, data).then(() => console.log(opts.filePath)); // tslint:disable-line
    })
    .catch(e => {
      console.log(e.message); // tslint:disable-line
    });
}
