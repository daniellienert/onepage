const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const merge = require('merge2');
const plumber = require('gulp-plumber');
const ugilfy = require('gulp-uglify');
const sassGlob = require('gulp-sass-glob');
const modernizr = require('gulp-modernizr');

const filesAndDirectories = {
    baseJavaScript: {
        libraries: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery.easing/jquery.easing.js',
            'node_modules/bootstrap/js/dist/util.js',
            'node_modules/bootstrap/js/dist/scrollspy.js',
            'node_modules/bootstrap/js/dist/collapse.js',
            'node_modules/bootstrap/js/dist/tab.js',

            '../../../../Plugins/DL.Gallery/Resources/Private/node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.js',
            '../../../../Plugins/DL.Gallery/Resources/Private/node_modules/photoswipe/dist/photoswipe.js',
            '../../../../Plugins/DL.Gallery/Resources/Private/node_modules/photoswipe/dist/photoswipe-ui-default.js',
            '../../../../Plugins/DL.Gallery/Resources/Private/JavaScript/PhotoSwipe.js'
        ],
        source: [
            'JavaScript/*.js',
            'Fusion/**/*.js'
        ],
        destination: '../Public/JavaScript'
    },
    styles: {
        source: [
            'Styles/**/*.scss',
            'Fusion/**/*.scss'
        ],
        destination: '../Public/Styles',
    },
    fontAwesome: {
        source: [
            'node_modules/font-awesome/fonts/*'
        ],
        destination: '../Public/Styles/Fonts'
    },
    fonts: {
        source: [
        ],
        destination: '../Public/Styles/Fonts'
    }
};

gulp.task('styles', () => {
    gulp
    .src(filesAndDirectories.styles.source)
    .pipe(plumber({errorHandler: console.log}))
    .pipe(sassGlob())
    .pipe(sass({
        includePaths: [
            "node_modules/font-awesome/scss",
            "node_modules/bootstrap/scss"
        ]
    }))
    .pipe(gulp.dest(filesAndDirectories.styles.destination));
});

gulp.task('modernizr', function() {
    gulp.src(filesAndDirectories.baseJavaScript.libraries, filesAndDirectories.baseJavaScript.source)
        .pipe(modernizr({
            options: ['prefixed'],
            tests: ['transition', 'transitionDelay', 'transitionDuration']
        }))
        .pipe(gulp.dest(filesAndDirectories.baseJavaScript.destination))
});

gulp.task('baseJavaScript', ['modernizr'], () => {
    let libraries = gulp.src(filesAndDirectories.baseJavaScript.libraries)
        .pipe(plumber({errorHandler: console.log}))
        .pipe(concat('Main.js'));

let baseJavaScript = gulp.src(filesAndDirectories.baseJavaScript.source)
    .pipe(plumber({errorHandler: console.log}));

return merge(libraries, baseJavaScript)
    .pipe(plumber({errorHandler: console.log}))
    .pipe(concat('Main.min.js'))
    .pipe(gulp.dest(filesAndDirectories.baseJavaScript.destination));
});

gulp.task('copyFonts', () => {
    return gulp
        .src(filesAndDirectories.fonts.source)
        .pipe(plumber({errorHandler: console.log}))
        .pipe(gulp.dest(filesAndDirectories.fonts.destination))
});

gulp.task('copyFontAwesome', function () {
    return gulp.src(filesAndDirectories.fontAwesome.source)
        .pipe(gulp.dest(filesAndDirectories.fontAwesome.destination))
});

gulp.task('default', ['styles', 'baseJavaScript', 'copyFonts', 'copyFontAwesome']);
gulp.task('watch', ['default'], () => {
    gulp.watch([
    filesAndDirectories.baseJavaScript.source
], ['baseJavaScript']);

gulp.watch([
    filesAndDirectories.styles.source
], ['styles']);
});
