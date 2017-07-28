var gulp = require('gulp'),
    include = require('gulp-html-tag-include'),
    sass = require('gulp-sass'),
    sassFile = 'app/sass/*.scss',
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

// sass
gulp.task('sass', function() {
  gulp.src(sassFile)
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

// include tags
gulp.task('html-include', function() {
    return gulp.src('./app/index.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

// Bundle JS local scripts
gulp.task('scripts', function() {
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

// Bundle JS libraries
gulp.task('scripts-libs', function() {
    gulp.src('app/js/libs/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

// browserSync
gulp.task('serve', ['sass'], function() {
     browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// Watch
gulp.task('watch', function () {
    gulp.watch('./app/**/*.html', ['html-include']);
    gulp.watch(['dist/**/*.{html,php}', 'dist/js/scripts.js']).on('change', browserSync.reload);
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['scripts', 'scripts-libs']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'serve']);