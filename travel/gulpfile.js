// 载入外挂
var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    // scss = require('gulp-scss'),
    sass = require('gulp-sass'),    
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    // notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    webpack = require('gulp-webpack'),
    connect = require("gulp-connect"),
    fileinclude = require('gulp-file-include') ;


// 样式
gulp.task('styles', function() {
  return gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// 脚本
gulp.task('scripts', function(callback) {
  return gulp.src('src/entry.js')
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
});
//gulp.task('scripts', function() {
//  return gulp.src(['src/**/*.js'])
//      .pipe(order([
//        "lib/jquery-2.0.3.min.js",
//        "lib/*.js",
//        "js/*.js"
//      ]))
//      .pipe(jshint('.jshintrc'))
//      .pipe(jshint.reporter('default'))
//      .pipe(concat('main.js'))
//      .pipe(gulp.dest('dist/js'))
//      .pipe(rename({ suffix: '.min' }))
//      .pipe(uglify())
//      .pipe(gulp.dest('dist/js'))
//      .pipe(notify({ message: 'Scripts task complete' }));
//});

// 图片
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/images'))
      .pipe(connect.reload());
});
//html
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(connect.reload());
});
//数据
gulp.task("data", function(){
	return gulp.src(["xml/*.xml", "json/*.json", "!json/1.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})
// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
      .pipe(clean());
});
//服务器
gulp.task("server", function(){
	connect.server({
        root: "dist",  //声明服务器的根目录
        port:"8090",
		livereload: true   //开启直播
	})
})
// 预设任务
gulp.task('default', ["server","watch"], function() {
  gulp.start('styles', 'scripts', 'images', 'html','data');
});


gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch('src/css/**/*.scss', ['styles']);

  // 看守所有.js档
  gulp.watch('src/js/**/*.js', ['scripts']);

  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);

  //看守html
  gulp.watch('src/**/*.html', ['html']) ;

  gulp.watch(["xml/*.xml", "json/*.json", "!json/1.json"], ['data']) ;

  // livereload.listen();
  // gulp.watch(['dist/**']).on('change', livereload.changed);

});