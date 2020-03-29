import { ApolloServer } from "apollo-server";
import {schema, dataSources} from './modules'

const server = new ApolloServer({
  schema,
  dataSources,
  context: ({req, res}) => {return {req, res}}
});

server.listen({port: 3000}).then(({ url }) => {
  console.log(url);
});