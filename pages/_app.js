import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { test } from '../config/apollo/Schema';
import { client } from '../config/apollo/GraphqlProvider';
import Layout from '../components/Layout';
import ColorProvider from '../components/ColorProvider';





function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ColorProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorProvider>
    </ApolloProvider>
  )
}


export default MyApp
