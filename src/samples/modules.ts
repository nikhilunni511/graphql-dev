import { buildFederatedSchema } from '@apollo/federation';
import {
  resolvers as asoiafResolver,
  typeDefs as asoiafTypeDefs
} from './asoiaf';
import { AsoiafDataSource } from './asoiaf';

export const schema = buildFederatedSchema([
  { resolvers: asoiafResolver, typeDefs: asoiafTypeDefs }
]);

export const dataSources = () => ({
  asoiafAPI: new AsoiafDataSource()
});
