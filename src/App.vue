<template>
  <div id="app">
    <Header></Header>
    <!-- 路由中间出口 -->
    <router-view></router-view>
    <!-- footer在home search显示，在register login隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 在挂载的时候，就通知vuex的actions到服务器请求数据，只请求一次
    // 这是TypeNav要的数据
    this.$store.dispatch("homeOptions/getCategory");
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
