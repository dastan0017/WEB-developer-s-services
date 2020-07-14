const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const imagemin = require("gulp-imagemin");

gulp.task("sass-compile", function () {
  return gulp
    .src("./sass/**/*scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"));
});
gulp.task("watch", function () {
  gulp.watch("./sass/**/*scss", gulp.series("sass-compile"));
  gulp.watch("./img/**", gulp.series("img-compress"));
});
gulp.task("img-compress", function () {
  return gulp
    .src("./img/**")
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest("./img-not-compressed/"));
});

// tasks default, it will run watch
gulp.task("default", gulp.parallel("sass-compile", "img-compress", "watch"));
