const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-clean-css`),
    htmlValidator = require(`gulp-html`),
    jsValidator = require(`gulp-eslint`),
    cssValidator = require(`gulp-stylelint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

// launch chrome and serve
async function chrome () {
    browserChoice = `chrome`;
}

let validateHTML = () => {
    return src([
        `*.html`])
        .pipe(htmlValidator());
};

let validateCSS = () => {
    return src([
        `styles/*.css`,
        `styles/**/*.css`])
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let validateJS = () => {
    return src([
        `js/*.js`,
        `js/**/*.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};

let compressHTML = () => {
    return src([`*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src([`styles/*.css`,`styles/**/*.css`])
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/styles`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor({ mangle: false }))
        .pipe(dest(`prod/js`));
};

let copyJSONToProd = () => {
    return src(`json/data.json`)
        .pipe(dest(`prod/json`));
};

let copyImagesToProd = () => {
    return src(`img/*`)
        .pipe(dest(`prod/img`));

};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `.`
            ]
        }
    });

    watch(`*.html`, validateHTML).on(`change`, reload);
    watch(`styles/*.css`, validateCSS).on(`change`, reload);
    watch(`js/*.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);
};

exports.chrome = series(chrome, serve);
exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.copyJSONToProd = copyJSONToProd;
exports.copyImagesToProd = copyImagesToProd;
exports.serve = series(
    validateHTML,
    validateCSS,
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    copyImagesToProd,
    transpileJSForProd,
    copyJSONToProd
);
