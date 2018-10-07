import { gql } from 'apollo-boost';
import { NAV } from '../../../utilities';

export default {
  Mutation: {
    logOut: async (_, args, { cache, client }) => {
      const data = {
        User: {
          __typename: 'User',
          token: ''
        }
      };
      cache.writeData({ data });
      NAV.default.goAuth();
      return null;
    },

    logIn: async (_, { token }, { cache }) => {
      const data = {
        User: {
          __typename: 'User',
          token
        }
      };
      cache.writeData({ data });
      NAV.default.goHome();
      return null;
    }
  }
};
