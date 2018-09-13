import { gql } from 'apollo-boost';

export default {
  Query: {
    me: async (_, args, { cache }) => {
      const me = await cache.readQuery({
        query: gql`
          query User @client {
            token
            email
            username
          }
        `
      });
      return me;
    },
    token: async (_, args, { cache }) => {
      const token = await cache.readQuery({
        query: gql`
          query User @client {
            token
          }
        `
      });

      return token;
    }
  },
  Mutation: {}
};
