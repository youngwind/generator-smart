var generators = require('yeoman-generator');

// 调用shell命令
var process = require('child_process');
var exec = process.exec;

module.exports = generators.Base.extend({
  constructor: function (args, options, config) {
    generators.Base.apply(this, arguments);
  },
  init: function () {
    // 这里还没想好怎么优化，只能先嵌套了！
    console.log('start copy');
    var copy = exec('cp -r ' + __dirname + "/demo/. " + this.options.env.cwd);
    copy.on('exit', function (code) {
      console.log('copy done!');
      console.log('start install bower dependiences');

      var bowerInstall = exec('bower install');
      bowerInstall.on('exit', function (code) {
        console.log('bower dependiences install done.');
        console.log('start install npm dependiences');

        var npmInstall = exec('npm install');
        npmInstall.on('exit', function (code) {
          console.log('npm dependiences install done.');
          console.log('start gulp');

          var gulp = exec('gulp');
          gulp.on('exit', function (code) {
            console.log('gulp done.');
            console.log('start the app....');

            var start = exec("npm run start");
            console.log("please visit http://localhost:3000");

          })

        })

      });


    });

  }
});