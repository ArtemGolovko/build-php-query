# buildPHPQuery

> Generate PHP like URL-encoded query string

[![NPM](https://img.shields.io/npm/v/build-php-query.svg)](https://www.npmjs.com/package/build-php-query) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
```bash
npm install --save build-php-query
```
## Usage

```js
const buildPHPQuery = require('build-php-query')

buildPHPQuery({
  page: 1,
  user: {
    username: 'user1',
    name: 'User 1'
  },
  arrayOfRandomValues: [
    12,
    56,
    78
  ]
})
```
gives:
```js
'page=1&user[username]=user1&user[name]=User%201&arrayOfRandomValues[]=12&arrayOfRandomValues[]=56&arrayOfRandomValues[]=78'
```

This also supports nesting.

## License

MIT © [ArtemGolovko](https://github.com/ArtemGolovko)