#!/usr/bin/env node
const chalk = require('chalk');
const figlet = require('figlet');
const createModule = require('./create-module');
const { createServer } = require('./create-server');
const { help } = require('./lib/help');
const { command } = require('./lib/commands');
const arguments = process.argv.splice(2);
console.log(
  chalk.yellow(figlet.textSync('graphql-dev', { horizontalLayout: 'default' }))
);
switch (arguments[0]) {
  case 'server':
    createServer(arguments.splice(0));
    break;
  case '--help':
    console.log(help);
    break;
  case '-h':
    console.log(help);
    break;
  case '--list':
    console.log(command);
    break;
  case '-l':
    console.log(command);
    break;
  default: {
    console.log('Invalid argument');
    process.exit(0);
  }
}
