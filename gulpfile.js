const del = require('del');
const path = require('path');
const paths = require('./config').paths;

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const tsServer = typescript.createProject(paths.config.tsServer);

gulp.task('clean', () => {
    return del(paths.dest.build)
});

gulp.task('typescript-server', () => (
    gulp.src(path.join(paths.source.server, '**/*.ts'))
        .pipe(tsServer())
        .pipe(gulp.dest(paths.dest.build))
));

gulp.task('default', ['clean'], () => {
    gulp.start([
        'typescript-server'
    ])
});