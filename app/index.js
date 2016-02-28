var generators = require('yeoman-generator');
var process = require('child_process');
var exec = process.exec;
var path = require('path');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function (args, options, config) {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
    this.option('coffee'); // This method adds support for a `--coffee` flag
  },
  copy: function () {
    var last = exec('cp -r '+ __dirname + "/demo/. " + this.options.env.cwd);
    var test2 = exec('ls');

    last.on('exit', function (code) {
      console.log('文件复制成功！');
    });
  }
});