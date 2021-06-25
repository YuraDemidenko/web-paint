let gulp   = require('gulp');
let less   = require('gulp-less');
let server = require('browser-sync');
let browserify  = require('browserify');
let sourse      = require('vinyl-source-stream');
let vueify      = require('vueify');


gulp.task('server', function () {
    server({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(server.reload({
            stream: true
        }));
});

gulp.task('less', function () {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(server.reload({
            stream: true
        }));
});


gulp.task('js', function () {
    browserify('./src/js/index.js')
        .transform(vueify)
        .bundle()
        .pipe(sourse('index.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(server.reload({
            stream: true
        }));
       
});

gulp.task('img', function(){
    gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./dist/img'))
        .pipe(server.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/img/*.*', ['img']);
    gulp.watch('./src/less/*.less', ['less']);
    gulp.watch('./src/vue/**/*.vue', ['js']);
    gulp.watch('./src/js/**/*.js', ['js']);
});


gulp.task('build', ['html', 'less', 'js', 'img']);

gulp.task('default', ['server', 'build', 'watch']);
