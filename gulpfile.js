import gulp from "gulp";
import browserSync from "browser-sync";
import csso from "gulp-csso";
import terser from "gulp-terser";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import rev from "gulp-rev";
import revDelete from "gulp-rev-delete-original";
import revRewrite from "gulp-rev-rewrite";
import { deleteAsync as del } from "del";
import fs from "fs";

const sync = browserSync.create();
const isProd = process.env.NODE_ENV === "production";

// Clean dist directory
function clean() {
  return del(["dist/**", "!dist"]);
}

// CSS processing
function css() {
  return gulp
    .src("assets/css/**/*.css", { base: "assets/css" })
    .pipe(csso())
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(sync.stream());
}

// JS processing
function js() {
  return gulp
    .src("assets/js/**/*.js", { base: "assets/js" })
    .pipe(terser())
    .pipe(gulp.dest("dist/assets/js"));
}

// Image optimization
function images() {
  return gulp
    .src(
      "assets/img/**/*.{apng,png,avif,gif,jpg,jpeg,jfif,pjpeg,pjp,svg,webp}",
      {
        base: "assets/img",
        encoding: false,
      }
    )
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("dist/assets/img"));
}

// Copy other assets (manifest, browserconfig, etc.)
function copyAssets() {
  return gulp
    .src(
      [
        "assets/img/site.webmanifest",
        "assets/img/browserconfig.xml",
        // Add other asset patterns if needed
      ],
      { base: "assets/img", encoding: false }
    )
    .pipe(gulp.dest("dist/assets/img"));
}

// HTML processing
function html() {
  return gulp
    .src(["*.html"], { base: "." })
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        quoteCharacter: '"',
        keepClosingSlash: true,
      })
    )
    .pipe(gulp.dest("dist"));
}

// Revision assets
function revision() {
  return gulp
    .src(
      [
        "dist/assets/css/**/*.css",
        "dist/assets/js/**/*.js",
        "dist/assets/img/**/*.{apng,png,avif,gif,jpg,jpeg,jfif,pjpeg,pjp,svg,webp}",
      ],
      {
        base: "dist",
        allowEmpty: true,
        encoding: false,
      }
    )
    .pipe(rev())
    .pipe(revDelete())
    .pipe(gulp.dest("dist"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist"));
}

function revRewriteAll() {
  const manifest = gulp.src("dist/rev-manifest.json");
  return gulp
    .src("dist/**/*.{html,css,js}")
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest("dist"));
}

function serve(done) {
  sync.init({
    server: {
      baseDir: "dist",
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    port: 3000,
    open: false,
    notify: false,
  });
  done();
}

// Watch files
function watch() {
  gulp.watch("assets/css/**/*.css", gulp.series(css, reload));
  gulp.watch("assets/js/**/*.js", gulp.series(js, reload));
  gulp.watch("assets/img/**/*", gulp.series(images, reload));
  gulp.watch("*.html", gulp.series(html, reload));
}

// Reload browser
function reload(done) {
  sync.reload();
  done();
}

const build = gulp.series(
  clean,
  gulp.parallel(css, js, images, copyAssets, html),
  revision,
  revRewriteAll
);

const dev = gulp.series(build, gulp.parallel(serve, watch));

export { clean, build, dev as default };
