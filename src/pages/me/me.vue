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
  <view class="header" v-if="isLogin()">
    <view class="user">
      <image :src="handleUrl(avatar)" alt=""></image>
      <p>{{ nickName }}</p>
    </view>
    <button @click='toProfile'>
      <image src="../../static/icon/set-up.svg"></image>
      更改账户信息
    </button>
  </view>
  <button @click='quit' v-if="isLogin()">退出登录</button>
  <button @click='toLogin' v-else>请先登录</button>


</template>

<style lang="scss">
.header {
  width: 100%;
  height: 320rpx;
  background-color: #007aff;
  background-image: url("@/static/background.png");
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .user {
    font-size: 48rpx;
    margin: 0 64rpx;
    color: white;
  }

  button {
    height: 64rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;

    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
.user image{
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}
</style>