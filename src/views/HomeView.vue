<template>
  <div>
    <div class="container">
      <div class="container">
        <div class="customPadding">
          <div class="row">
            <div class="col-sm">
              <div class="customCard">
                <h1
                  style="
                    font-size: 3rem;
                    text-align: center;
                    padding-bottom: 6rem;
                  "
                >
                  Blog Post
                </h1>
              </div>
              <p v-if="error">Something went wrong...</p>
              <p v-if="loading">Loading...</p>

              <div v-else>
                <!-- {{ JSON.stringify(result.blogs.data) }} -->

                <div v-for="blog in result.blogs.data" :key="blog.id">
                  <router-link class="nav-link" :to="'/blog/' + blog.id">
                    <div class="container">
                      <div class="customCard">
                        <div
                          class="card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5"
                        >
                          <div class="card-head" style="padding: 4rem">
                            <h1 style="font-size: 6rem">
                               {{ blog.attributes.Title }}
                              <hr />
                            </h1>
                          </div>
                          <div class="card-body text-center">
                            <p style="line-height: 26pt">
                              {{ blog.attributes.Body }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const POSTS_QUERY = gql`
  query {
    blogs {
      data {
        id
        attributes {
          Title
          Body
        }
      }
    }
  }
`;

export default {
  name: "App",
  setup() {
    const { result, loading, error } = useQuery(POSTS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
};
</script>
<style>
.customPadding {
  margin-top: 12rem !important;
  margin-bottom: 12rem !important;
  /* padding: 4rem; */
}
</style>
