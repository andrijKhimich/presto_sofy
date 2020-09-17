'use strict';

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    libs: 'build/libs/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    libs: 'src/libs/**/*.*',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    libs: 'src/libs/**/*.*',
    js: 'src/js/**/*.js',
    css: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'srs/fonts/**/*.*'
  },
  clean: './build/*'
};

var config = {
  server: {
    baseDir: './build'
  },
  notify: false
};

var gulp = require('gulp'),
  webserver = require('browser-sync'),
  plumber = require('gulp-plumber'),
  rigger = require('gulp-rigger'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  jpegrecompress = require('imagemin-jpeg-recompress'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename');

gulp.task('webserver', function () {
  webserver(config);
});

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(webserver.reload({
      stream: true
    }));
});

gulp.task('css:build', function () {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.build.css))
    .pipe(webserver.reload({
      stream: true
    }));
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.build.js))
    .pipe(webserver.reload({
      stream: true
    }));
});

gulp.task('libs:build', function () {
  return gulp.src(path.src.libs)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.libs))
    .pipe(webserver.reload({
      stream: true
    }));
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img)
    .pipe(cache(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ])))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
  return gulp.src(path.clean, {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('cache:clear', function () {
  cache.clearAll();
});

gulp.task('build',
  gulp.series('clean:build',
    gulp.parallel(
      'html:build',
      'css:build',
      'js:build',
      'libs:build',
      'fonts:build',
      'image:build'
    )
  )
);

gulp.task('watch', function () {
  gulp.watch(path.watch.html, gulp.series('html:build'));
  gulp.watch(path.watch.css, gulp.series('css:build'));
  gulp.watch(path.watch.libs, gulp.series('libs:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('default', gulp.series(
  'build',
  gulp.parallel('webserver', 'watch')
));