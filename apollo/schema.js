import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './type-defs.ts';
import { resolvers } from './resolvers.ts';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  upload: false,
});
