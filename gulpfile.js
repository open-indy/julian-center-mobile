var gulp    = require('gulp');
var del     = require('del');
var sass    = require('gulp-ruby-sass');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

gulp.task('clean', function () {
    del(['dist/js/*', 'dist/css/*', 'dist/index.html'], function (err, paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
});

gulp.task('sass', function() {
    return sass('src/css/main.scss', { style: 'expanded' })
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/main.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('move', ['clean', 'sass', 'scripts'], function(){

    gulp.src('src/css/flipclock.css')
        .pipe(gulp.dest('dist/css'));

    gulp.src('src/js/flipclock.min.js')
        .pipe(gulp.dest('dist/js'));

    gulp.src('src/js/img/**/*.*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('sass', 'scripts', 'move');
});




