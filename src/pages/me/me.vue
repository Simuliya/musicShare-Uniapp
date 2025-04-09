<script>
import {removeToken} from "@/utils/auth";
export default {
  name: "me",
  data() {
    return {
      
    }
  },
  methods: {
    toLogin() {
     uni.reLaunch({
       url: '/pages/login/login'
     })
    },
    quit() {
      removeToken()
      this.toLogin()
    }
  }
}
</script>

<template>
<button @click='toLogin'>登录</button>
<button @click='quit'>退出登录</button>
</template>

<style scoped>

</style>