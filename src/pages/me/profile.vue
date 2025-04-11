<template>
  <view class="user">
    <image :src="handleUrl(user.avatar)" alt=""></image>  
  </view>
  <view class="profile-button">
    <view :class="{ active: profileType === 0 }" @click="profileType = 0">个人信息</view>
    <view :class="{ active: profileType === 1 }" @click="profileType = 1">修改密码</view>
  </view>
  <user-info v-if="profileType === 0" :user="user"></user-info>
  <reset-pwd v-else></reset-pwd>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import {handleUrl} from "@/utils/musicShare";
import resetPwd from "@/components/profile/resetPwd.vue";
import userInfo from "@/components/profile/userInfo.vue"
export default {
  name: "Profile",
  components: {
    userInfo,
    resetPwd
  },
  data() {
    return {
      user: {},
      profileType: 0,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    handleUrl,
    async getUserInfo() {
      try {
        const {data} = await userInfoApi.getUserInfo()
        this.user = data.user
        return "success"
      } catch (error) {
        throw error
      }
    }
  },
};
</script>


<style scoped lang="scss">
.user {
  display: flex;
  justify-content: center;
  align-items: center;

  image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
  }
}

.profile-button {
  display: flex;

  view {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
  }
}
.active {
  background-color: #007aff;
  color: #fff;
}

</style>
