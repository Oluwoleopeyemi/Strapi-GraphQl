import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from './router'

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  //   uri: "https://rickandmortyapi.com/graphql",
  uri: "http://localhost:1337/graphql",
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
}).use(router);

app.mount("#app");
