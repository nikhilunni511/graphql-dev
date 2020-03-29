
export const resolvers = {
  Query: {
    getBooks: async (_, { }, { dataSources }) => {
      return await dataSources.asoiafApi.getFilms();
    },

    getCharacters: async (_, { }, { dataSources }) => {
      return await dataSources.asoiafApi.getCharacters();
    },
  },
};
