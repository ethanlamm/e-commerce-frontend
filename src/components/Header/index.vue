<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top" v-show="flag">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登录成功 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <!-- 图片 -->
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <!-- 搜索框 -->
      <div class="searchArea" v-show="flag">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.loadUserInfo();
  },
  watch: {
    token: {
      immediate: true,
      handler() {
        this.$nextTick(this.loadUserInfo);
      },
    },
  },
  computed: {
    // 用户信息
    ...mapState("userOptions", ["userInfo", "token"]),
    userName() {
      return this.userInfo.name;
    },
    // 头部第一行的显示隐藏
    flag() {
      let regPath = /^\/(login|register)/;
      if (regPath.test(this.$route.path)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    // 搜索
    goSearch() {
      let keyword = this.keyword.trim();
      // if (!keyword) {
      //   this.keyword = "";
      //   return alert("请输入内容！");
      // }
      let location = { name: "search" };
      let params = { keyword: keyword || undefined };
      location.params = params;
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      this.$router.push(location);
      this.keyword = "";
    },
    async loadUserInfo() {
      try {
        // 登陆后(已有token)获取用户信息
        await this.$store.dispatch("userOptions/getUserInfo");
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        // 退出登陆，清空数据
        await this.$store.dispatch("userOptions/userLogout");
        // 跳转至登陆页面
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>