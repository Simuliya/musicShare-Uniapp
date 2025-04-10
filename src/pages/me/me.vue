<script>
import {isLogin, removeToken, setUserId} from "@/utils/auth";
import {handleUrl} from "@/utils/musicShare";
import userInfoApi from "@/api/userInfo";

export default {
  name: "me",
  data() {
    return {
      //用户
      user: {},
      nickName: "",
      avatar: "",
    }
  },
  onLoad() {
    this.getUserInfo()
  },
  methods: {
    isLogin,
    handleUrl,
    toLogin() {
      uni.reLaunch({
          url: '/pages/login/login'
      })
    },
    toProfile() {
      uni.navigateTo({
        url: '/pages/me/profile'
      })
    },
    quit() {
      removeToken()
      this.toLogin()
    },
    async getUserInfo() {
      try {
        const {data} = await userInfoApi.getUserInfo()
        //console.log(data)
        this.user = data.user
        this.nickName = data.user.nickName
        this.avatar = handleUrl(data.user.avatar)
        //console.log(handleUrl(this.avatar))
        setUserId(data.user.userId)
        return "success"
      } catch (error) {
        console.error("获取用户信息失败：", error)
        throw error
      }
    }

  }
}
</script>

<template>
  <div class="header" v-if="isLogin()">
    <div class="user">
      <img :src="handleUrl(avatar)" alt="">
      <p>{{ nickName }}</p>
    </div>
    <button @click='toProfile'>
      <image src="../../static/icon/set-up.svg"></image>
      更改账户信息
    </button>
  </div>
  <button @click='quit' v-if="isLogin()">退出登录</button>
  <button @click='toLogin' v-else>请先登录</button>


</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 10rem;
  background-color: #007aff;
  background-image: url("@/static/background.png");
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .user {
    font-size: 1.5rem;
    margin: 0 2rem;
    color: white;
  }

  button {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    image {
      width: 1rem;
      height: 1rem;
    }
  }
}
.user img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
</style>