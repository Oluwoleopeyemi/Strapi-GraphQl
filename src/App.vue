<template>
  <div id="app">
    <Nav1 />
    <router-view></router-view>
  </div>
</template>
<script>
import Nav1 from "./components/HolaComo.vue";
export default {
  name: "App",
  components: {
    Nav1,
  },
};
</script>
