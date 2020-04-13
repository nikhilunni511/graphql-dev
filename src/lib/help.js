const commandLineUsage = require('command-line-usage');

exports.help = commandLineUsage([
  {
    header: 'GraphQL server',
    content:
      'GraphQL CLI tool for creating apollo-server, typedefs, resolvers and datasources and more.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ graphql-dev server {bold --type} module ...',
      '$ graphql-dev {bold --help}'
    ]
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: 'Display the usage guide.',
        alias: 'h',
        type: Boolean
      },
      {
        name: 'list',
        description: 'To list all available commands.',
        alias: 'l',
        type: Boolean
      }
      //   {
      //     name: 'src',
      //     description:
      //       'The input files to process. This is some additional text existing solely to demonstrate word-wrapping, nothing more, nothing less. And nothing in between.',
      //     multiple: true,
      //     defaultOption: true
      //   },
    ]
  },
  {
    content:
      'Project home: {underline https://github.com/nikhilunni511/graphql-dev}'
  }
]);
