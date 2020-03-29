const ncp = require('ncp').ncp;
const npm = require('npm')
const moduleRoot = require('app-root-path')
const appRoot = process.cwd()
const npmModules = ['apollo-server','apollo-datasource-rest', '@apollo/federation']
module.exports = function () {
  ncp.limit = 16;
  source = `${moduleRoot}/samples/`
  destination = `${appRoot}/src/`
  ncp(source, destination, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
    npm.load(function(err) {
      // handle errors
    
      // install module ffi
      npm.commands.install(npmModules, function(er, data) {
        if(er){
          return console.error(er)
        }
        console.log('Installed needed dependencies')
      });
    
      npm.on('log', function(message) {
        console.log(message);
      });
    });
  });
}
