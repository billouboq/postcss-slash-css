# postcss-slash-css

[![Build Status](https://travis-ci.org/billouboq/postcss-slash-css.svg?branch=master)](https://travis-ci.org/billouboq/postcss-slash-css)

A [PostCSS](https://github.com/postcss/postcss) plugin that removes duplicates css properties and selector accross multiples css files.

## Installation

```
npm install postcss-slash-css
```

This plugin only supports node v8.0.0 and over.

## Usage

```js
const postcss = require("postcss");
const slashCSS = require("");

postcss([slashCSS({ targets: "**/*.css" })]);
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.

Example with gulp :

```js
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const slashCSS = require("../../index");

const inputFilePath = "../assets/normal.css";
const targetFilePath = "../assets/*.critical.css";
const outputFilePath = "./result.css";

// plugin we will use in postcss
const pluginsUsed = [
  slashCSS({ targets: targetFilePath })
];

gulp.task('css', function () {
  return gulp.src(inputFilePath)
    .pipe(postcss(pluginsUsed))
    .pipe(gulp.dest(outputFilePath));
});
```

## Options

#### targets

- Type: `string` (glob using [fast-glob](https://github.com/mrmlnc/fast-glob))
- Required

CSS files to search duplicates within source file.

#### mode

- Type: `string` (not case sensitive)
- Optional
- Default: `MatchAtleastOne`

Can be `MatchAtleastOne` or `MatchAll`.

If `MatchAll` is used, css will be removed only if it is present in ALL targets files.
If `MatchAtleastOne` is used, css will be removed when it is present ATLEAST in one of targets css files.

## Testing

To test this plugin, just run :

```javascript
npm test
```

## Example

You can see multiples exemples in the [example](https://github.com/billouboq/postcss-slash-css/tree/master/examples) folder.

## License

This software is released under the terms of the MIT license.
