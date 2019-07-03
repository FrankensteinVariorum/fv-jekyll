/**
 * Settings
 * Turn on/off build features
 */

var settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	pngs: true,
	jpgs: true,
	fonts: true,
	copy: true,
	reload: true,
};


/**
 * Paths to project folders
 */

var paths = {
	input: '_source',
	output: 'assets',
	viewerapp: {
  	input: '_source/viewer/build/**/*',
  	exclude: '!_source/viewer/build/index.html',
  	output: 'viewer/',
  	extract: '_source/viewer/build/index.html',
  	scriptdest: '_includes/viewer/'
	},
	scripts: {
		input: '_source/js/*',
		polyfills: '.polyfill.js',
		output: 'assets/js/'
	},
	styles: {
		input: '_source/sass/**/*.{scss,sass}',
		output: 'assets/css/'
	},
	svgs: {
		input: '_source/img/svg/**/*.svg',
		output: 'assets/img/svg/'
	},
	pngs: {
		input: '_source/img/png/**/*.png',
		output: 'assets/img/png/'
	},
	jpgs: {
		input: '_source/img/jpg/**/*.jpg',
		output: 'assets/img/jpg/'
	},
	fonts: {
		input: '_source/fonts/**/*',
		output: 'assets/fonts'
	},
	copy: {
		input: '_source/copy/**/*',
		output: 'assets/'
	},
	reload: './_build/',
	agiledev: {
  	jekyll: {
    	localbuildpath: '_site_local'
    }
	}
};


/**
 * Template for banner to add to file headers
 */

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};


/**
 * Gulp Packages
 */

// General
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var extract = require('gulp-html-extract');
var extractText = require('gulp-extract-text');
var replace = require('gulp-replace');
var package = require('./package.json');

// Scripts
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');

// SVGs
var svgmin = require('gulp-svgmin');

// BrowserSync
var browserSync = require('browser-sync');

// Child Process

const cp = require("child_process");
 

/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
var cleanDist = function (done) {

	// Make sure this feature is activated before running
	if (!settings.clean) return done();

	// Clean the build folder
	del.sync([
		paths.output
	]);

	// Signal completion
	return done();
};

// Repeated JavaScript tasks
var jsTasks = lazypipe()
	.pipe(header, banner.full, {package: package})
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, {suffix: '.min'})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, {package: package})
	.pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
var buildScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Run tasks on script files
	return src(paths.scripts.input)
		.pipe(flatmap(function(stream, file) {

			// If the file is a directory
			if (file.isDirectory()) {

				// Setup a suffix variable
				var suffix = '';

				// If separate polyfill files enabled
				if (settings.polyfills) {

					// Update the suffix
					suffix = '.polyfills';

					// Grab files that aren't polyfills, concatenate them, and process them
					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				// Grab all files and concatenate them
				// If separate polyfills enabled, this will have .polyfills in the filename
				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			// Otherwise, process the file
			return stream.pipe(jsTasks());

		}));

};

// Lint scripts
var lintScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Lint scripts
	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

};

// Process, lint, and minify Sass files
var buildStyles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	// Run tasks on all Sass files
	return src(paths.styles.input)
		.pipe(sass({
			outputStyle: 'expanded',
			srcComments: true
		}))
		.pipe(prefix({
			browsers: ['last 2 version', '> 0.25%'],
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.full, { package : package }))
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(minify({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(header(banner.min, { package : package }))
		.pipe(dest(paths.styles.output));

};


// Optimize SVG files
var buildSVGs = function (done) {

	// Make sure this feature is activated before running
	if (!settings.svgs) return done();

	// Optimize SVG files
	return src(paths.svgs.input)
		.pipe(svgmin())
		.pipe(dest(paths.svgs.output));

};

// Copy PNG files
var buildPNGs = function (done) {

	// Make sure this feature is activated before running
	if (!settings.pngs) return done();

	// Optimize SVG files
	return src(paths.pngs.input)
		.pipe(dest(paths.pngs.output));
};

// Copy JPG files
var buildJPGs = function (done) {

	// Make sure this feature is activated before running
	if (!settings.jpgs) return done();

	// Optimize SVG files
	return src(paths.jpgs.input)
		.pipe(dest(paths.jpgs.output));
};

// Copy Font Files
var buildFonts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.jpgs) return done();

	// Optimize SVG files
	return src(paths.fonts.input)
		.pipe(dest(paths.fonts.output));
};



// Copy theme-specific static files into output folder
var copyFiles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy static files
	return src(paths.copy.input)
		.pipe(dest(paths.copy.output));

};

// Move React Viewer component into static site.
// Exludes the index.html file from the build, which is replaced
// by Jekyll

var copyViewerComponent = function (done) {
	return src([paths.viewerapp.input,paths.viewerapp.exclude])
		.pipe(dest(paths.viewerapp.output));
}

var extractViewerScripts = function(done) {
  // Delete the viewer include
	del.sync([
		paths.viewerapp.scriptdest
	]);
  
  // Replace with body content of React component
  
	return src(paths.viewerapp.extract)
		.pipe(extractText({
      pattern_start: "<body>", 
      pattern_end: "</body>"
    }))
    .pipe(replace(/\/static\/js/g,'/viewer/static/js'))
    .pipe(dest(paths.viewerapp.scriptdest));
}


// Build Jekyll

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// Jekyll FV Local
function jekyllLocal() {
  return cp.spawn("bundle", ["exec", "jekyll", "build","-d" + paths.agiledev.jekyll.localbuildpath], { stdio: "inherit" });
}



// Watch for changes to the source directory
var startServer = function (done) {

	// Make sure this feature is activated before running
	if (!settings.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		}
	});

	// Signal completion
	done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

// Watch for changes
var watchSrc = function (done) {
	watch(paths.input, series(exports.default, jekyll, reloadBrowser));
	done();
};


// Watch for changes
var watchLocalSrc = function (done) {
	watch(paths.input, series(exports.default, jekyllLocal, reloadBrowser));
	done();
};




/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		buildSVGs,
		buildPNGs,
		buildJPGs,
		buildFonts,
		copyFiles,
		copyViewerComponent,
		extractViewerScripts
	)
);

exports.buildViewer = series(
  copyViewerComponent,
  extractViewerScripts
);

exports.build = series(
  exports.default,
  jekyll
);

exports.buildLocal = series(
	exports.default,
	jekyllLocal
);

exports.sass = series(
	buildStyles
);

exports.js = series(
	buildScripts,
	lintScripts,
);

// Watch and reload
// gulp watch
exports.watch = series(
	exports.default,
	jekyll,
	startServer,
	watchSrc
);

exports.watchLocal = series(
  exports.default,
  jekyllLocal,
  watchLocalSrc
)