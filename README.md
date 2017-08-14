# venv

Make build-time environment variables available to your Angular CLI application.

Venv uses [EJS](https://ejs.co) to transform your Angular CLI project's environment file using Node's `process.env` map. 

> N.B. The default operation will __overwrite__ your environment file. Be sure to run this during a build step and that the change is not accidentally committed.

## Installation

__Local__ (in your project's working directory):

```sh
npm install venv --save-dev
# or
yarn add venv --dev
```

__Global__:

```sh
npm install venv -g
# or
yarn global add venv
```

## CLI Usage

Usage: `venv <cmd> [options]`

Your build steps could be

> npm install venv -g
> venv ngenv --boot

### Commands:

### ngenv

Replaces a template Angular CLI environment file with values from `process.env`. Use this command in your build pipeline to poke values from the build-time environment into your application's environment. 

### Options:

```
-f, --configPath      the cli configuration to use [default: ".angular-cli.json"]
-a, --appIndex        the index of the configuration's apps to use [default: 0]
-e, --env             which environment to process [default: "dev"]
-r, --rename          use a new name for the processed environment file
-s, --save            save environment files before processing
--prod                use the prod environment, equivalent to --e prod
-h, --help            show help
-v, --version         current version
```

#### Example

> venv ngenv --prod

__environment.prod.ts__:
```javascript
export const environment: any = {
  COOL_API_URL: 'https://cool.example.net/api',
  BUILD_BUILDNUMBER: '<%= env.BUILD_BUILDNUMBER %>',
  production: true,
};
```
Asuming your `process.env[BUILD_BUILDNUMBER]` value is as shown on venv's execution, the contents of this file (environment.prod.ts) would get replaced with the following.

```javascript
export const environment: any = {
  COOL_API_URL: 'https://cool.example.net/api',
  BUILD_BUILDNUMBER: '20190402.4',
  production: true,
};
```

## Exit Codes

The CLI process may exit with the following codes:

- `0`: Transform succeeded without errors
- `1`: An invalid command line argument or combination thereof was used
- `2`: Transform failed
