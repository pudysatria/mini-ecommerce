import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { test } from "../config/apollo/Schema";
import { client } from "../config/apollo/GraphqlProvider";
import Layout from "../components/Layout";
import ColorProvider from "../components/ColorProvider";
import React, { useContext, useReducer } from "react";
import ThemeContextProvider from "../config/context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <ColorProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
