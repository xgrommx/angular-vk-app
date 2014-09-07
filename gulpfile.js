var gulp = require("gulp");
var webpack = require("webpack");

var $ = require('gulp-load-plugins')({
    camelize: true
});

gulp.task('webserver', function() {
	gulp.src(['./', '!./node_modules/**', '!./vendors/**'])
		.pipe($.webserver({
			livereload: true,
			directoryListing: false,
			open:false,
			fallback: 'index.html'
		}));
});

// gulp.task('connect', function () {
//     $.connect.server({
//         root: './',
//         port: 8081,
//         livereload: true
//     });
// });

// gulp.task('html', function () {
//     gulp.src('./*.html')
//         .pipe($.connect.reload());
//     $.util.log($.util.colors.green('Has been reloaded a html task'));
// });

// gulp.task('scripts', function () {
//     return gulp.src('./app/dist/*.js')
//         .pipe($.connect.reload());
// });

// gulp.task('watch', function() {
//     gulp.watch(['./*.html'], ['html']);
//     gulp.watch(['./app/dist/*.js'], ['scripts']);
// });

gulp.task("webpack", function() {
    return gulp.src("./app/src/app.es6.js")
        .pipe($.webpack({
            cache: true,
            target: "web",
            debug: true,
            watch: true,
            devtool: "#inline-source-map",
            resolve: {
                modulesDirectories: ["vendors", "node_modules"],
                alias: {
                    "angular": "angular/angular.min.js",
                    "ui-router": "angular-ui-router/release/angular-ui-router.min.js",
                    "angular-animate": "angular-animate/angular-animate.min.js",
                    "angular-messages": "angular-messages/angular-messages.min.js",
                    "angular-breadcrumb": "angular-breadcrumb/dist/angular-breadcrumb.js",
                    "jquery": "jquery/dist/jquery.min.js",
                    "react": "react/react.js",
                    // This hack due to Windows :D If you use Linux or mac you can commented code which located below.
                    "traceur-runtime": "traceur/bin/traceur-runtime.js"
                }
            },
            plugins: [
                new webpack.ResolverPlugin([
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                ])
            ],
            module: {
                loaders: [
                    {test: /angular.min.js$/, loader: "exports?angular"},
                    // If you use Linux you should use "loader: 'webpack-traceur?runtime'" instead of "loader: 'webpack-traceur'".
                    {test: /.es6.js$/, loader: 'webpack-traceur'},
                    {test: /.jsx.js$/, loader: 'webpack-traceur!jsx-loader?harmony'}
                ]
            },
            output: {
                filename: "bundle.js"
            }
        }))
        .pipe(gulp.dest('./app/dist/'));
});

// gulp.task("default", ["connect", "watch", "webpack"]);
gulp.task("default", ["webserver", "webpack"]);
