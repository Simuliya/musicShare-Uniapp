<script>
import {getCodeImg, login} from "@/api/login";
import {getToken, setToken} from "@/utils/auth";

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
        uuid: "",
      },
      codeUrl: "",
      loginRules: {
        username: {
          rules: [{
            required: true,
            errorMessage: "请输入您的账号"
          }],
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "请输入您的密码"
          }],
        },
        code:{
          rules: [{
            required: true,
            errorMessage: "请输入验证码"
          }],
        }
      },
      // 验证码开关
      captchaEnabled: false,
    };
  },
  onLoad() {
    if (getToken() !== "") {
      uni.reLaunch({
        url: '/pages/me/me',
      })
    }
    this.getCode();
  },
  methods: {
    //获取验证码
    getCode() {
      getCodeImg().then(({data}) => {
        this.captchaEnabled = data.captchaEnabled === undefined ? true : data.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + data.img;
          this.loginForm.uuid = data.uuid;
        }
      });
    },
    // 用户登录
    handleLogin() {
      this.$refs.loginForm.validate().then(res => {
        //登录接口
        login(this.loginForm).then(({data}) => {
          //console.log(data)
          uni.showToast({
            title: '登录成功！',
            icon: 'none'
          });
          // 登录成功 设置cookie
          this.setCookies(data);
          //跳转到我的页面
          uni.reLaunch({
            url: '/pages/me/me',
            fail: function (e) {
            }
          })
        }).catch((response) => {
          if (this.captchaEnabled) {
            setTimeout(() => {
              this.getCode()
            }, 2000)
          }
        });
        this.loginForm.code = ""
      }).catch(errors => {
      })

    },
    //设置token
    setCookies(res) {
      setToken(res.token);
    },
    toRegister() {
      uni.navigateTo({
        url: '/pages/login/register',
      })
    },
  }
};
</script>

<template>
  <view class="login">
    <text class="title">欢迎来到音乐分享论坛</text>
    <uni-forms :model="loginForm" :rules="loginRules" ref="loginForm">
      <!--      账号-->
      <uni-forms-item name="username">
        <uni-easyinput prefixIcon="auth" type="text" placeholder="请输入账号" v-model="loginForm.username"/>
      </uni-forms-item>
      <!--      密码-->
      <uni-forms-item name="password">
        <uni-easyinput prefixIcon="locked" type="password" placeholder="请输入密码" v-model="loginForm.password"/>
      </uni-forms-item>
      <!--      验证码-->
      <uni-forms-item name="code" v-if="captchaEnabled">
        <view class="login-code">

        <uni-easyinput v-model="loginForm.code" auto-complete="off" placeholder="验证码" @confirm="handleLogin"/>
          <img :src="codeUrl" @click="getCode" class="login-code-img" alt=""/>
        </view>
      </uni-forms-item>
      <button @click="handleLogin()">登 录</button>
      <p style="color: blue;text-align: right " @click="toRegister">还没有账户？先去注册</p>

    </uni-forms>
  </view>
</template>

<style lang="scss">
.login {
  margin: 20% auto;
  width: 80%;

  .title {
    display: block;
    text-align: center;
    font-size: 40rpx;
    margin: 96rpx auto;
  }
}

.login-code {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-code-img {
  margin-left: 32rpx;
  width: 180rpx;
  height: 75rpx;
}

</style>