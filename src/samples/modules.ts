import { buildFederatedSchema } from '@apollo/federation';
import {
  resolvers as asoiafResolver,
  typeDefs as asoiafTypeDefs
} from './asoiaf';
import { dataSources as AsoiafDataSource } from './asoiaf';

export const schema = buildFederatedSchema([
  { resolvers: asoiafResolver, typeDefs: asoiafTypeDefs }
]);
const datasourcesFromModules = { ...AsoiafDataSource };

const moduleNames = Object.keys(datasourcesFromModules);
let dataSourceObj = {};

export const dataSources = () => {
  for (let i = 0; i < moduleNames.length; i++) {
    dataSourceObj = {
      [moduleNames[i]]: new datasourcesFromModules[moduleNames[i]](),
      ...dataSourceObj
    };
  }
  return dataSourceObj;
};
