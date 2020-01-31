const pug = require('gulp-pug')
const gulp = require('gulp')
const webpackStream = require('webpack-stream')

const webpackConfigDev= require('../webpack')

require('rootpath')()

const views = () => {
    return gulp.src('app/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('app/.'))

}

gulp.task(
    'webpack',
    () => {
        return webpackStream(webpackConfigDev)
            .pipe(gulp.dest('app/.'))
    }
)

gulp.task('views', views)

gulp.task(
    'watch:views',
    () => {
        return gulp.watch(
            ['app/*.pug'],
            gulp.series('views')
        )
    }
);

gulp.task(
    'watch:scripts',
    () => {
        return gulp.watch(
            ['app/app.js'],
            gulp.series('webpack')
        )
    }
);

module.exports = {
    start: gulp.series(
        'views',
        'webpack',
        gulp.parallel(
            'watch:views',
            'watch:scripts'
        )
    )
}