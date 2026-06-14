import gulp from "gulp";
import csso from "gulp-csso";
import terser from "gulp-terser";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import rev from "gulp-rev";
import revDelete from "gulp-rev-delete-original";
import revRewrite from "gulp-rev-rewrite";
import { deleteAsync as del } from "del";
import fs from "fs";
import http from "http";
import path from "path";

const DEV_PORT = 3000;
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

// Clean dist directory
function clean() {
  return del(["dist/**", "!dist"]);
}

// CSS processing
function css() {
  return gulp
    .src("assets/css/**/*.css", { base: "assets/css" })
    .pipe(csso())
    .pipe(gulp.dest("dist/assets/css"));
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
      "assets/img/**/*.{apng,png,avif,gif,jpg,jpeg,jfif,pjpeg,pjp,svg,webp,ico}",
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

// Copy documents (CV, etc.) — kept at a stable path, not revisioned
function copyDocs() {
  return gulp
    .src("assets/cv/**/*", { base: "assets", encoding: false, allowEmpty: true })
    .pipe(gulp.dest("dist/assets"));
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
        "dist/assets/img/**/*.{apng,png,avif,gif,jpg,jpeg,jfif,pjpeg,pjp,svg,webp,ico,json,webmanifest,xml}",
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
    .src("dist/**/*.{html,css,js,json,webmanifest}")
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest("dist"));
}

function rewriteManifestIcons(done) {
  const manifestPath = "dist/rev-manifest.json";
  if (!fs.existsSync(manifestPath)) return done();

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  // Rewrite site.webmanifest
  const webmanifestFiles = fs
    .readdirSync("dist/assets/img")
    .filter((f) => f.endsWith(".webmanifest"));
  webmanifestFiles.forEach((file) => {
    const filePath = path.join("dist/assets/img", file);
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (json.icons) {
      json.icons.forEach((icon) => {
        const iconFile = icon.src.replace(/^\//, "assets/img/");
        if (manifest[iconFile]) {
          icon.src = "/" + manifest[iconFile].replace(/^dist\//, "");
        }
      });
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    }
  });

  // Rewrite browserconfig.xml
  const xmlFiles = fs
    .readdirSync("dist/assets/img")
    .filter((f) => f.endsWith(".xml"));
  xmlFiles.forEach((file) => {
    const filePath = path.join("dist/assets/img", file);
    let xml = fs.readFileSync(filePath, "utf8");
    Object.keys(manifest).forEach((orig) => {
      const revved = manifest[orig];
      // Replace all occurrences of the original filename
      const origShort = orig.replace(/^assets\/img\//, "");
      xml = xml.replace(new RegExp(origShort, "g"), revved);
      xml = xml.replace(new RegExp(orig, "g"), revved);
    });
    fs.writeFileSync(filePath, xml);
  });

  done();
}

function serve(done) {
  const root = path.resolve("dist");

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://localhost:${DEV_PORT}`);
    const requestedPath =
      requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const filePath = path.resolve(root, `.${decodeURIComponent(requestedPath)}`);

    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("Not found");
        return;
      }

      const type =
        MIME_TYPES[path.extname(filePath).toLowerCase()] ||
        "application/octet-stream";
      res.writeHead(200, {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Content-Type": type,
        Expires: "0",
        Pragma: "no-cache",
      });
      res.end(content);
    });
  });

  server.on("error", done);
  server.listen(DEV_PORT, "127.0.0.1", () => {
    console.log(`Serving dist at http://127.0.0.1:${DEV_PORT}`);
    done();
  });
}

// Watch files
function watch(done) {
  gulp.watch("assets/css/**/*.css", gulp.series(css, reload));
  gulp.watch("assets/js/**/*.js", gulp.series(js, reload));
  gulp.watch("assets/img/**/*", gulp.series(images, reload));
  gulp.watch("assets/cv/**/*", gulp.series(copyDocs, reload));
  gulp.watch("*.html", gulp.series(html, reload));
  done();
}

// Reload browser
function reload(done) {
  done();
}

const compile = gulp.series(
  clean,
  gulp.parallel(css, js, images, copyAssets, copyDocs, html)
);

const build = gulp.series(
  compile,
  revision,
  revRewriteAll,
  rewriteManifestIcons
);

const dev = gulp.series(compile, gulp.parallel(serve, watch));

export { clean, build, dev as default };
