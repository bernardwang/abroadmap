// set up gulp and packages
var gulp					= require('gulp');
var sass					= require('gulp-sass');
var min						= require('gulp-minify-css');
var concat				= require('gulp-concat');
var concatCSS 		= require('gulp-concat-css');
var lint          = require('gulp-jshint');
var uglify 				= require('gulp-uglify');
var watch 				= require('gulp-watch')
var html_replace	= require('gulp-html-replace');
var notify        = require('gulp-notify');
var del           = require('del');
var sync          = require('browser-sync').create();

// location constants
var DIST_HTML			= './dist';
var DIST_JS				= './dist/assets/js/';
var DIST_JS_VEND	= './dist/assets/js/vendor'; ////////////////////////////////
var DIST_CSS			= './dist/assets/css/';
//var DIST_CSS			= './dist/assets/styles/css/';
var DIST_IMG			= './dist/assets/img/';

var	ALL_HTML 			= './src/	**/*.html';
var	ALL_SCSS 			= './src/assets/styles/sass/**/.scss'; 
var	ALL_CSS 			= './src/assets/styles/css/*.css';
var	DEST_CSS 			= './src/assets/styles/css/';

var	ALL_JS_VEND		= './src/assets/js/vendor/*.js'; ////////////////////////////////
var	ALL_JS_CORE		= './src/assets/js/*.js'; ////////////////////////////////
var	DEST_JS_VEND	= './src/assets/js/vendor/'; ////////////////////////////////
var	DEST_JS_CORE	= './src/assets/js/'; ////////////////////////////////

var	ALL_IMG				= './assets/img/**/**';

// convert sass to css
gulp.task('sass', function(){
	gulp.src(ALL_SCSS)
        .pipe(sass())
        .pipe(gulp.dest(DEST_CSS))
	      .pipe(sync.stream())
        .pipe(notify({ message: 'sass complete' }));
});

// concat & min css, pipe to dist/css
gulp.task('css', ['sass'],  function(){
	gulp.src(ALL_CSS)
        .pipe(concatCSS('bundle.min.css'))
        .pipe(min())
        .pipe(gulp.dest(DIST_CSS))
        .pipe(notify({ message: 'dist/css complete' }));
});

// lint js
gulp.task('lint', function(){
    gulp.src(ALL_JS_CORE)
        .pipe(lint())
        .pipe(lint.reporter('default'))
        .pipe(notify({ message: 'lint complete' }));
});

// concat & uglify js, pipe to dist/js
gulp.task('js', ['lint',], function(){
	gulp.src(ALL_JS_CORE) 
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_JS));
    gulp.src(ALL_JS_VEND)
        .pipe(gulp.dest(DIST_JS_VEND))
        .pipe(notify({ message: 'dist/js complete' }));
});

// pipe images to dist/img
gulp.task('img', function(){
	gulp.src(ALL_IMG)
        .pipe(gulp.dest(DIST_IMG));
});

// corrects imports
gulp.task('html-imports', function(){
	gulp.src(ALL_HTML)
    	.pipe(html_replace({
	        'dev_css_index': 'assets/styles/css/bundle.min.css',
	        'dev_js_index': 'assets/js/bundle.min.js',
	    }))
    	.pipe(gulp.dest(DIST_HTML));
});

// setup browser sync
gulp.task('sync', ['sass'], function() {
    sync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(ALL_SCSS , ['sass']).on('change', sync.reload);;
    gulp.watch(ALL_HTML).on('change', sync.reload);
});

// empties dist assets
gulp.task('clean', function(cb) {
    del([DIST_CSS, DIST_JS, DIST_JS_VEND, DIST_IMG, DIST_AUDIO, DIST_FONTS], cb);
});

gulp.task('prod', ['css','js','html-imports','img']); 
gulp.task('serve', ['sync','lint']);
gulp.task('default', function(){});