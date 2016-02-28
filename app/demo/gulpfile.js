"use strict";

// 引用
var gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var changed = require("gulp-changed");
var merge = require("merge-stream");


// 错误监听
var errorHandler = function (err) {
  console.error(err);
};

// 复制文件（包括第三方插件以及图片）
gulp.task("copy", function () {
  return merge(
    gulp.src([
      "bower_components/jquery/jquery.js",
    ])
      .pipe(gulp.dest("public/js/third")),

    gulp.src([
      "node_modules/normalize.css/normalize.css",
      "src/styles/third/*.css"
    ])
      .pipe(gulp.dest("public/css/third")),

    gulp.src("src/images/**/*")
      .pipe(gulp.dest("public/images"))


  );
});

// scss编译压缩
gulp.task("css", ["copy"], function () {
  return merge(
    gulp.src("src/styles/**/*.scss")
      .pipe(changed("public/css"))
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", errorHandler))
      .pipe(cssnano())
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest("public/css"))
  );
});

// js编译压缩
gulp.task("js", ["copy"], function () {
  return gulp.src("src/scripts/**/*.js")
    .pipe(changed("public/js"))
    .pipe(sourcemaps.init())
    .pipe(browserify().on("error", errorHandler))
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("public/js"));
});


// 清理文件
gulp.task("clean", function () {
  return del([
    'public'
  ]);
});

// 监听变动
gulp.task("watch", function () {
  gulp.watch([
    "src/styles/**/*.scss"
  ], [
    "css"
  ]);

  gulp.watch([
    "src/scripts/**/*.js"
  ], [
    "js"
  ]);

  gulp.watch([
    "src/images/**/*.*"
  ], [
    "copy"
  ]);

});

// 默认任务
gulp.task("default", ["copy", "css", "js"]);
