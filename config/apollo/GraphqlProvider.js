import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } from '@apollo/client';
  
  export const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://b2cdemo.getswift.asia/graphql',
      credentials: 'same-origin',
   
    }),
    cache: new InMemoryCache(),
  });
  