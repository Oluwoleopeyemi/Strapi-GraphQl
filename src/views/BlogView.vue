<template>
  <div>
    <!-- single post blog CODE -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form v-if="blogId">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Title:</label
                >
                <input type="text" v-model="blogTitle" class="form-control" />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Body:</label>
                <textarea class="form-control" v-model="blogContent"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="processEdit(blogId, blogTitle, blogContent)"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- single post blog CODE ends -->

    <!-- MODAL CODE start -->

    <div class="container customPadding">
      <div class="customPadding">
        <div class="card card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5">
          <div v-if="blogId" class="container">
            <div class="card-head" style="padding: 4rem">
              <h1 style="font-size: 6rem">{{ blogTitle }}</h1>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit
              </button>
              <button
                type="button"
                class="ms-2 btn btn-danger"
                @click="processDelete(blogId)"
              >
                Delete
              </button>
            </div>
            <hr />
            <p style="line-height: 26pt">{{ blogContent }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL CODE ENDS -->
  </div>
</template>

<script>
import gql from "graphql-tag";
import { ref, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const blogId = ref(route.params.id);
    const blogTitle = ref("");
    const blogContent = ref("");

    // FETCH POST
    const { result } = useQuery(gql`
      query {
        blog(id: ${blogId.value}) {
          data {
            id
            attributes {
              date
              title
              body
            }
          }
        }
      }
    `);

    // Update blogTitle and blogContent when result changes
    watch(result, (newResult) => {
      if (newResult && newResult.blog) {
        const { title, body } = newResult.blog.data.attributes;
        blogTitle.value = title;
        blogContent.value = body;
      }
    });

    // DELETE POST
    const { mutate: deletePost } = useMutation(gql`
      mutation deleteBlog($id: ID!) {
        deleteBlog(id: $id) {
          data {
            id
          }
        }
      }
    `);

    const processDelete = (blogId) => {
      let check = confirm(
        `Are you sure you want to delete this post ${blogId}`
      );

      if (check) {
        let deleted = deletePost({ id: blogId });
        if (deleted) {
          alert("Post deleted");
        }
      }
    };

    // EDIT POST
    const { mutate: editPost } = useMutation(gql`
      mutation updateBlog($id: ID!, $title: String!, $body: String!) {
        updateBlog(id: $id, data: { title: $title, body: $body }) {
          data {
            id
          }
        }
      }
    `);

    const processEdit = (blogId, title, body) => {
      let check = confirm(`Confirm to edit post? ${blogId}`);

      if (check) {
        let edited = editPost({ id: Number(blogId), title: title, body: body });
        if (edited) {
          alert("Post updated. Refresh!");
        }
      }
    };

    return {
      blogId,
      blogTitle,
      blogContent,
      processDelete,
      processEdit,
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
