const gulp = require('gulp'),
      include = require('gulp-html-tag-include'),
      inject = require('gulp-inject-string'),
      sass = require('gulp-sass'),
      sassFile = 'app/sass/*.scss',
      cleanCSS = require('gulp-clean-css'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      htmlmin = require('gulp-htmlmin'),
      removeHtmlComments = require('gulp-remove-html-comments');

const timestamp = new Date().getTime()

// sass + prefix
gulp.task('sass', function() {
  gulp.src(sassFile)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

// include tags and minify HTML
gulp.task('html-include', function() {
    return gulp.src('./app/*.html')
        .pipe(include())
        .pipe(removeHtmlComments())
        .pipe(inject.afterEach('.js', `?ver=${timestamp}`))
        .pipe(inject.afterEach('.css', `?ver=${timestamp}`))
        .pipe(gulp.dest('./dist/'));
});

// Babel convert JS
gulp.task('babel', function() {
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// Concatenate JS
gulp.task('concat', function() {
    return gulp.src(['app/js/libs/1_jquery.js', 'app/js/libs/2_tweenmax.js', 'app/js/libs/3_modernizr.js', 'dist/js/scripts.js', 'dist/js/contact-form.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/'));
});

// Concatenate Index and Canvas JS
gulp.task('concatIndex', function() {
    return gulp.src(['dist/js/canvas.js', 'dist/js/index-scripts.js'])
        .pipe(concat('index-scripts.js'))
        .pipe(gulp.dest('dist/js/'))
        .on('change', browserSync.reload);
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
    gulp.watch(['dist/**/*.{html,php}', 'dist/js/']).on('change', browserSync.reload);
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['babel', 'concat']);
    gulp.watch('dist/js/index-scripts.js', ['concatIndex']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'serve', 'babel', 'concat', 'html-include', 'sass']);