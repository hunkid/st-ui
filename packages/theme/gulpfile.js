var gulp = require('gulp')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')
var cssnext = require('cssnext')
var cssimport = require('postcss-import')
var bem = require('postcss-bem-fix')
// var cssnano = require('cssnano')

var formFonturl = require('./myplugins/formFonturl.js')
gulp.task('process-fontsource', function() {
  return gulp.src('./src/fonts/**')
             .pipe(gulp.dest('./lib/fonts'))
})

gulp.task('process-css', function() {
  var processors = [
    bem({
      defaultNamespace: undefined, // default namespace to use, none by default
      style: 'suit', // suit or bem, suit by default
      separators: {
        descendent: '__', // overwrite any default separator for chosen style
        namespace: '-',
        modifier: '--'
      },
      shortcuts: {
        component: 'b'
      }
    }),
    cssimport, formFonturl, autoprefixer, cssnext ]
  return gulp.src('./src/*.css')
             .pipe(postcss(processors)) // 待压缩
             .pipe(gulp.dest('./lib'))
})

gulp.task('watch', function() {
  gulp.watch('./src/*.css', ['process-css'])
})

gulp.task('css', ['process-fontsource', 'process-css'])
