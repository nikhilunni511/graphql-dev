const appRoot = require('app-root-path')
const createModule = require('./create-module')
console.log(appRoot)
if(process.argv[2] === 'create-module'){
createModule()
}
else{console.log('invalid argument')
process.exit(0)}