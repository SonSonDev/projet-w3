import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

const link = createUploadLink({ uri: process.env.REACT_APP_API_URL })

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  );
};