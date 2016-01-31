'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var sourcePath = path.join(__dirname, '../..');

module.exports = yeoman.Base.extend({
  paths: function() {
    this.sourceRoot(sourcePath);
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the dandy ' + chalk.red('React Isomorphic Starterkit') + ' generator!'
    ));
  },

  writing: function () {
    this.fs.copy(this.templatePath('configs'), this.destinationPath('configs'));
    this.fs.copy(this.templatePath('dist'), this.destinationPath('dist'));
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('static'), this.destinationPath('static'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'));
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
  },

  install: function () {
    this.npmInstall();
  }
});
