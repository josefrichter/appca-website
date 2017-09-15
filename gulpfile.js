// via https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var connect     = require('gulp-connect');
var nunjucksRender = require('gulp-nunjucks-render');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    // return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    return gulp.src(['assets/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('pages/**/*.+(html|nhtml)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('.'))
});

// Static Server + watching scss/html files
gulp.task('localserve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    // gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch(['assets/sass/**/*.scss'], ['sass']);
    gulp.watch(['pages/**/*.+(html|nhtml)', 'templates/**/*.+(html|nhtml)'], ['nunjucks']);
    // gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build', function() {
  gulp.src(['assets/sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("assets/css"));
  connect.server({
    root: ".",
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

// gulp.task('default', ['js','serve']);
gulp.task('default', ['localserve']);
