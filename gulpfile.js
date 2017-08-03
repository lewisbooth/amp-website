var gulp = require('gulp');
    include = require('gulp-html-tag-include');
    sass = require('gulp-sass');
    sassFile = 'app/sass/*.scss';
    cleanCSS = require('gulp-clean-css');
    babel = require('gulp-babel');
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
    return gulp.src('./app/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

// Babel convert JS
gulp.task('babel', function() {
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
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
    gulp.watch('app/js/*.js', ['babel']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'serve']);