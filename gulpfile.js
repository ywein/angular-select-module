var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsConfig = require('./tsconfig.json');

function transpile() {
    var tResult = gulp.src(["./src/**/*.ts"])
        .pipe(ts(tsConfig.compilerOptions));

    return merge([
        tResult.js.pipe(gulp.dest('./dist'))
    ]);
}

gulp.task('tsc', transpile)