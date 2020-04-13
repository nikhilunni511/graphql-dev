const commandLineUsage = require('command-line-usage');

const sections = [
  {
    header: 'GraphQL server',
    content:
      'GraphQL CLI tool for creating apollo-server, typedefs, resolvers and datasources and more.'
  },
  {
    header: 'Synopsis',
    content: '$ graphql-dev <command> [<options>]'
  },
  {
    header: 'Command List',
    content: [
      {
        name: '{bold server}',
        summary:
          '- Generate an apollo graphql server in your current working directory'
      }
    ]
  },
  {
    content: [
      '',
      'Run graphql-dev <command> --help to learn more about each command. For example:',
      '',
      '$ graphql-dev server --help',
      '',
      '{bold Usage}:',
      '',
      'graphql-dev server [options]'
    ]
  },
  {
    content:
      'Project home: {underline https://github.com/nikhilunni511/graphql-dev}'
  }
];

exports.command = commandLineUsage(sections);
