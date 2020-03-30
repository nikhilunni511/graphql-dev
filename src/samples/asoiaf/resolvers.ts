
export const resolvers = {
  Query: {
    getBooks: async (_, { }, { dataSources }) => {
      return await dataSources.asoiafApi.getBooks();
    },

    getCharacters: async (_, { }, { dataSources }) => {
      return await dataSources.asoiafApi.getCharacters();
    },
  },
};
