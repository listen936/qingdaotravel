// 载入外挂
var gulp = require('gulp'),
    sass = require('gulp-sass'),    
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
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

 

});