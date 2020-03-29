#!/usr/bin/env node
const createModule = require('./create-module')
const createServer = require('./create-server')
switch (process.argv[2]) {
    case 'server': createServer();
        break;
    default: {
        console.log('Invalid argument')
        process.exit(0)
    }
}
