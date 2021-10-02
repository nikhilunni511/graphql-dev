const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const module_path = process.cwd();
const getModuleNames = (module_path) =>
  fs
    .readdirSync(module_path)
    .filter((f) => fs.statSync(path.join(module_path, f)).isDirectory());
let datasourcetype = 'none';
let name = '';
const fileContents = {
  resolver: `export const resolvers = {
 Query: {
 },
 Mutation: {
 }
}`,
  datasource: {
    rest: (moduleName) => {
      moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);
      return `import { RESTDataSource } from 'apollo-datasource-rest';
export class ${moduleName}DataSource extends RESTDataSource {
 constructor() {
   super();
   this.baseURL = '';
 }
}`;
    },
    none: (moduleName) => {
      moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);
      return `export class ${moduleName}DataSource { }`;
    }
  },
  typedef: `import gql from 'graphql-tag'
    
 export const typeDefs = gql\`
 
   \``
};

const createModule = async (module_path, moduleName) => {
  if (module_path && moduleName) {
    const moduleNameSlash = '/' + moduleName;
    moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);
    const indexContent = `
   export { resolvers } from './resolvers';
   export { typeDefs } from './typeDefs';
   import { ${moduleName}DataSource } from './dataSource'
   export const dataSources = {${moduleName}DataSource}
    `;
    const resolverContent = `export const resolvers = {
       Query: {
       },
       Mutation: {
       }
    }`;

    const typeDefsContent = `import gql from 'graphql-tag'
    
    export const typeDefs =
       gql\`\``;

    const dataSourceContent = `export class ${moduleName}DataSource { }`;
    const path_to_folder = path.join(module_path);
    module_path = path.join(path_to_folder, moduleNameSlash);
    try {
      fs.mkdirSync(path_to_folder + moduleNameSlash);
      fs.appendFileSync(
        path.resolve(module_path + '/index.ts'),
        indexContent + '\n'
      );
      fs.appendFileSync(
        path.resolve(module_path + '/resolvers.ts'),
        resolverContent + '\n'
      );
      fs.appendFileSync(
        path.resolve(module_path + '/typeDefs.ts'),
        typeDefsContent + '\n'
      );
      fs.appendFileSync(
        path.resolve(module_path + '/dataSource.ts'),
        dataSourceContent + '\n'
      );
    } catch (err) {
      console.error(`\x1b[41m'${err.message}\x1b[0m`);
    }
    return true;
  }
};

const createItem = (module_path, type) => {
  if (type === 'datasource') {
    const source = datasourcetype === 'REST' ? 'rest' : 'none';
    fs.appendFileSync(
      path.resolve(module_path + `/${name}.dataSource.ts`),
      fileContents.datasource[source](name) + '\n'
    );
    let data = fs.readFileSync(path.resolve(module_path + `/index.ts`));
    // const fd = fs.openSync(path.resolve(module_path + `/index.ts`), 'w+');
    dataname = name[0].toUpperCase() + name.substring(1);
    newLine = `import {${dataname}DataSource} from './${name}.dataSource'`;
    const re = new RegExp(/export const dataSources.+}/);
    data = data.toString();
    oldExport = data.match(re) ? data.match(re)[0] : '';
    let newExport;
    const atleastOneCharNum = new RegExp(/([a-zA-Z0-9]+)/);
    if (oldExport.length && atleastOneCharNum.test(oldExport)) {
      newExport =
        oldExport.substring(0, oldExport.length - 1) +
        `,${dataname}DataSource}`;
      data = data.replace(re, newExport);
    } else {
      newExport = `\nexport const dataSources = {${dataname}DataSource}`;
      data += newExport;
    }
    const fileContentToWrite = `${newLine}\n${data}\n`;
    fs.writeFileSync(
      path.resolve(module_path + `/index.ts`),
      fileContentToWrite
    ); //write new data
    // fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
    // or fs.appendFile(fd, data);
  } else if (type === 'resolver') {
    fs.appendFileSync(
      path.resolve(module_path + `/${name}.resolvers.ts`),
      fileContents.resolver + '\n'
    );
  } else if (type === 'typedef') {
    fs.appendFileSync(
      path.resolve(module_path + `/${name}.typeDefs.ts`),
      fileContents.typedef + '\n'
    );
  } else if (type === 'module') createModule(module_path, name);
};

const openDir = async (module_path, dir, type) => {
  module_path = module_path + dir + '/';
  const dirs = getModuleNames(module_path);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'item',
      message: 'Where do you want to create?',
      choices: ['confirm', ...dirs]
    }
  ]);
  if (answers.item === 'confirm') createItem(module_path, type);
  else openDir(module_path, answers.item, type);
};

const processCreattion = async (dirs, type) => {
  const readInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'item',
      message: `Give a name for your ${type}`,
      choices: ['confirm', ...dirs]
    }
  ]);
  name = readInput.item;
  if (type === 'datasource') {
    datasourcetype = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'item',
          message: `Choose type of datasource`,
          choices: ['REST', 'none']
        }
      ])
      .then((answers) => answers.item);
  }
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'item',
        message: `Where do yo want to create your ${type}?\nConfrim to select the folder or choose dir to open`,
        choices: ['confirm', ...dirs]
      }
    ])
    .then((answers) => {
      if (answers.item === 'confirm') {
        createItem(module_path, type);
      } else {
        openDir(module_path, answers.item, type);
      }
    });
};

const newModule = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'item',
        message: 'What do yo wuant create?',
        choices: ['module', 'resolver', 'datasource', 'typedef']
      }
    ])
    .then((answers) => {
      const type = answers.item;
      const dirs = getModuleNames(module_path);
      processCreattion(dirs, type);
    });
};

module.exports = { newModule };
