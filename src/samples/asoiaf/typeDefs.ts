import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    getBooks: [Book]
    getCharacters: [Character]
  }
  type Book {
    name: String
    publiser: String
    releases: String
  }
  type Character {
    name: String
    culture: String
    born: String
  }
`;
