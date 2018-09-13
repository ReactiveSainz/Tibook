import User from './UserResolvers';

export default {
  Query: {
    ...User.Query
  },
  Mutation: {
    ...User.Mutation
  }
};
