var gulp = require('gulp')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')
var cssnext = require('cssnext')
var cssimport = require('postcss-import')
var cssnano = require('cssnano')

gulp.task('process-fontsource', function() {
  return gulp.src('./src/fonts/**')
             .pipe(gulp.dest('./lib/fonts'))
})

gulp.task('process-css', function() {
  var processors = [ autoprefixer, cssnext, cssimport, cssnano ]
  return gulp.src('./src/*.css')
             .pipe(postcss(processors)) // 待压缩
             .pipe(gulp.dest('./lib'))
})

gulp.task('css', ['process-fontsource', 'process-css'])
