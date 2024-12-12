"use client";

import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";

const link = createHttpLink({ uri: "http://localhost:5000", credentials: "include" });

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link,
});

export const Provider = ({ children }: { children: ReactNode }) => {
   return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
