export const resolvers = {
  Query: {
    getBooks: async (_, {}, { dataSources }) => {
      return await dataSources.AsoiafDataSource.getBooks();
    },

    getCharacters: async (_, {}, { dataSources }) => {
      return await dataSources.AsoiafDataSource.getCharacters();
    }
  }
};
