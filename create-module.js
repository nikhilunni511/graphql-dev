const fs = require('fs');
const path = require('path')
const server = process.argv[2].split('=')[0] === 'server' ? process.argv[2].split('=')[1] : null;
const moduleInput = process.argv[3].split('=')[0] === 'module' ? process.argv[3].split('=')[1] : null;
console.log(moduleInput)
const modules = moduleInput.split(',');
if (modules.length) {
  for (let i = 0; i < modules.length; i++) {
    createModule(server, modules[i])
  }
}

function createModule(server, moduleName) {
  if (server && moduleName) {
    const moduleNameSlash = '/' + moduleName
    moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);
    const indexContent = `
    export { resolvers } from './resolvers';
    export { typeDefs } from './typeDefs';
    import { ${moduleName}DataSource } from './dataSource'
    export const dataSources = {${moduleName}DataSource}
     `
    const resolverContent = `export const resolvers = {
        Query: {
        },
        Mutation: {
        }
     }`

    const typeDefsContent = `import gql from 'graphql-tag'
      
     export const typeDefs =
        gql\`\``

    const dataSourceContent = `export class ${moduleName}DataSource { }`
    const path_to_folder = path.join(path.resolve(), '/src/modules', server);
    const module_path = path.join(path_to_folder, moduleNameSlash);
    try {
      console.log(path_to_folder + moduleNameSlash)
      fs.mkdirSync(path_to_folder + moduleNameSlash)
      fs.appendFileSync(path.resolve(module_path + '/index.ts'), indexContent + "\n");
      fs.appendFileSync(path.resolve(module_path + '/resolvers.ts'), resolverContent + "\n");
      fs.appendFileSync(path.resolve(module_path + '/typeDefs.ts'), typeDefsContent + "\n");
      fs.appendFileSync(path.resolve(module_path + '/dataSource.ts'), dataSourceContent + "\n");
    }
    catch (err) {
      console.error(`\x1b[41m'${err.message}\x1b[0m`)
    }
    return true
  }
}