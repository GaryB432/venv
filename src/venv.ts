#!/usr/bin/env node
import * as fs from 'fs-extra';
import yargs = require('yargs');

import { EnvironmentTemplateHandler } from './environment-template-handler';

import { readArguments } from './argument-parser';

const yargsVar = yargs
  .command(
  'process',
  'replace template file with environment variables',
  y => {
    return y.option('t', {
      alias: 'templatePath',
      required: true,
      nargs: 1,
      describe: 'the template file',
    });
  },
  replaceWithTemplate
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

function replaceWithTemplate(yav: yargs.Arguments) {
  const opts = readArguments(yav);
  const eth = new EnvironmentTemplateHandler();
  eth.renderEnvContextTemplateFile(
    opts.filePath.concat('.template'),
    process,
    (err, data) => {
      if (err) {
        throw err;
      }
      fs.writeFileSync(opts.filePath, data);
      console.log(opts.filePath); // tslint:disable-line
    }
  );
}

console.log(yargsVar.$0);
