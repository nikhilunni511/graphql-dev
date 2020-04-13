const ncp = require('ncp').ncp;
const npm = require('npm');
const moduleRoot = require('app-root-path');
const { serverHelp } = require('./lib/server');
const appRoot = process.cwd();
const npmModules = [
  'apollo-server',
  'apollo-datasource-rest',
  '@apollo/federation'
];

exports.createServer = (arguments) => {
  const args = arguments[1].split('=');
  switch (args[0]) {
    case '--help':
      console.log(serverHelp);
      break;
    case '-h':
      console.log(serverHelp);
      break;
    case '--type':
      if (args[1] === 'module') console.log('\n\nwill update soon');
      else generateServer();
      break;
      break;
    default: {
      generateServer();
      break;
    }
  }
};

function generateServer() {
  ncp.limit = 16;
  source = `${moduleRoot}/samples/`;
  destination = `${appRoot}/src/`;
  ncp(source, destination, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('\n\ndone!');
    npm.load(function (err) {
      // handle errors

      // install module ffi
      npm.commands.install(npmModules, function (er, data) {
        if (er) {
          return console.error(er);
        }
        console.log('Installed needed dependencies');
      });

      npm.on('log', function (message) {
        console.log(message);
      });
    });
  });
}
