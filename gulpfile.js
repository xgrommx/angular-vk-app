var gulp = require("gulp");
var webpack = require("webpack");
var gulpWebpack = require("gulp-webpack");

gulp.task("webpack", function() {
    return gulp.src("./app/src/app.es6.js")
        .pipe(gulpWebpack({
            cache: true,
            target: "web",
            debug: true,
            watch: true,
            devtool: "#inline-source-map",
            resolve: {
                modulesDirectories: ["./app/vendors", "node_modules"],
                alias: {
                    "angular": "angular/angular.min.js",
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
                    {test: /.es6.js$/, loader: 'webpack-traceur'}
                ]
            },
            output: {
                filename: "bundle.js"
            }
        }))
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task("default", ["webpack"]);