# venv

[![Build Status](https://travis-ci.org/GaryB432/venv.svg?branch=master)](https://travis-ci.org/GaryB432/venv)
[![npm version](https://badge.fury.io/js/venv.svg)](https://badge.fury.io/js/venv)

Make build-time environment variables available to your application.

Venv uses [EJS](https://ejs.co) to transform a template file using Node's `process.env` map.

## CLI Usage

Usage: `venv <cmd> [options]`

Your build or deploy pipeline could include

```
npm install venv -g
venv process -t src\environments\environment.prod.ts
```

### Commands:

### process

 - appends `.template` to the filename passed as argument `t`
 - transforms that file using `process.env` as the context
 - saves the result to the original name supplied on the command line

### Options:

```
-t, --templatePath    the path to the template file
-h, --help            show help
-v, --version         current version
```

#### Example

> venv process --templatePath assets\env.js

__assets\env.js.template__:
```javascript
(function (window) {
  window.__env = window.__env || {};
  window.__env.BUILD_BUILDNUMBER = '<%= env.BUILD_BUILDNUMBER %>';
}(this));
```

```html
<html>

<head>
  <meta charset="utf-8">
  <script src="assets/env.js"></script>
</head>

<body>
  <script>
    console.log(__env.BUILD_BUILDNUMBER);
  </script>
</body>

</html>
```

## Exit Codes

The CLI process may exit with the following codes:

- `0`: Transform succeeded without errors
- `1`: An invalid command line argument or combination thereof was used
- `2`: Transform failed
