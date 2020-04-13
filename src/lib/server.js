const commandLineUsage = require('command-line-usage');
const optionDefinitions = [
  {
    name: 'type',
    description:
      'This option defined the type of server to be generated. The available values are {cyan {bold default}} and {cyan {bold module}}. If no argument is specified the {cyan {bold default}} will be the default value',
    type: Boolean,
    multiple: true,
    defaultOption: true
  }
];

const sections = [
  {
    header: 'GraphQL server',
    content:
      'GraphQL CLI tool for creating apollo-server, typedefs, resolvers and datasources and more.'
  },
  {
    header: 'Synopsis',
    content: ['$ graphql-dev server [--type=<default|module>]']
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. A simple example. ',
        example: '$ graphql-dev server --type=default'
      },
      {
        desc: '2. Server with modules for large scale applications. ',
        example: '$ graphql-dev server --type=module'
      }
    ]
  },
  {
    content:
      'Project home: {underline https://github.com/nikhilunni511/graphql-dev}'
  }
];

exports.serverHelp = commandLineUsage(sections);
