import gulp from "gulp";
import {spawn} from "child_process";
import cp from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import watch from "gulp-watch";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import replace from "gulp-replace";
import cssnano from "cssnano";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";


const browserSync = BrowserSync.create();


// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];


// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));


// Build/production tasks
gulp.task("build", ["sass", "fonts", "js", "cms"], (cb) => buildSite(cb, [], "production"));
gulp.task("build-preview", ["sass", "fonts", "js"], (cb) => buildSite(cb, hugoArgsPreview, "production"));


// Compile CMS
gulp.task("cms", () => {
  const match = process.env.REPOSITORY_URL ? process.env.REPOSITORY_URL : cp.execSync("git remote -v", {encoding: "utf-8"});
  let repo = null;
  match.replace(/github.com[:/](\S+)(\.git)?/, (_, m) => {
    repo = m.replace(/\.git$/, "");
  });
  gulp.src("./src/cms/*")
    .pipe(replace("<% GITHUB_REPOSITORY %>", repo))
    .pipe(gulp.dest("./dist/admin"))
    .pipe(browserSync.stream());
  gulp.src(["./node_modules/netlify-cms/dist/*.*", "!./node_modules/netlify-cms/dist/*.html"])
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream())
});


// Complile SCSS
gulp.task("sass", () => (
  gulp.src("./src/scss/*.scss")
  .pipe(sass({
    outputStyle : "compressed",
    includePaths: ["node_modules/susy/sass"]
  }))
  .pipe(autoprefixer({
    browsers : ["last 20 versions"]
  }))
  .pipe(gulp.dest("./dist/css"))
  .pipe(browserSync.stream())
));


// Compile Javascript
gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});


// Complile Fonts
gulp.task("fonts", () => (
  gulp.src("./node_modules/font-awesome/fonts/**.*")
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(browserSync.stream())
));


// Complile SVGs
gulp.task("svg", () => {
  const svgs = gulp
    .src("site/static/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("site/layouts/partials/"));
});


// Development server with browsersync
gulp.task("server", ["hugo", "sass", "js", "fonts", "svg", "cms"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch("./src/js/**/*.js", () => { gulp.start(["js"]) });
  watch("./src/cms/*", () => { gulp.start(["cms"]) });
  watch("./src/scss/**/*.scss", () => { gulp.start(["sass"]) });
  watch("./site/**/*", () => { gulp.start(["hugo"]) });
  watch("./site/static/img/icons/*.svg", ["svg"]); 
});


/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
