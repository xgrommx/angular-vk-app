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
                    "angular": "angular/angular.min",
                    "ui-router": "angular-ui-router/release/angular-ui-router.min",
                    "angular-animate": "angular-animate/angular-animate.min",
                    "angular-messages": "angular-messages/angular-messages.min",
                    "angular-breadcrumb": "angular-breadcrumb/dist/angular-breadcrumb.min",
                    "jquery": "jquery/dist/jquery.min",
                    "react": "react/react.min"
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
                    {test: /.es6.js$/, loader: '6to5-loader'},
                ]
            },
            output: {
                filename: "bundle.js"
            }
        }))
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task("default", ["webserver", "webpack"]);
