import path from 'path';
import gulp from 'gulp';
import webpack from 'webpack-stream';
import AngularPlugin from 'angular-webpack-plugin';
import NgAnnotatePlugin from 'ng-annotate-webpack-plugin';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({
    camelize: true
});

gulp.task('webserver', () =>
	gulp.src(['./', '!./node_modules/**', '!./vendors/**'])
		.pipe($.webserver({
			livereload: true,
			directoryListing: false,
			open:false,
			fallback: 'index.html'
		}))
);

gulp.task('webpack', () =>
    gulp.src('./app/src/app.js')
        .pipe(webpack({
            cache: true,
            target: 'web',
            debug: true,
            watch: true,
            devtool: '#inline-source-map',
            resolve: {
                modulesDirectories: ['node_modules'],
                alias: {
                    app: path.resolve('app', 'src'),
                    app$: 'app/app',
                    ngAnimate$: 'angular-animate',
                    'ui.router$': 'angular-ui-router/release/angular-ui-router',
                    'ncy-angular-breadcrumb$': 'angular-breadcrumb/dist/angular-breadcrumb',
                    'app.controllers$': 'app/controllers/main',
                    'app.animations$': 'app/animations/main',
                    'app.directives$': 'app/directives/main',
                    'app.services$': 'app/services/main'
                }
            },
            plugins: [
                new AngularPlugin(),
                new NgAnnotatePlugin({
                    add: true
                })
            ],
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
                ]
            },
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('./app/dist/'))
);

gulp.task('default', ['webserver', 'webpack']);
