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
