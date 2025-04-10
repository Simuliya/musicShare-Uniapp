<script>
import {getCodeImg, register, checkUserNameUnique} from "@/api/login";
import {getToken} from "@/utils/auth";

export default {
  name: "Register",
  data() {
    const equalToPassword = (rule, value, data, callback) => {
      if (this.registerForm.password !== value) {
        callback("两次输入的密码不一致");
      }
      return true

    };
    const checkUserName = (rule, value, data, callback) => {
      //判断用户名是否存在
      checkUserNameUnique(value).then((response) => {
        if (response.data !== true) {
          callback("用户名已经存在");
        }
        return true

      });
    };

    return {
      codeUrl: "",
      captchaEnabled: false,
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: "",
      },
      registerRules: {
        username: {
          rules: [
            {required: true, errorMessage: "请输入您的账号"},
            {
              minLength: 2,
              maxLength: 20,
              errorMessage: "用户账号长度必须介于 2 和 20 之间",
            },
            {validateFunction: checkUserName},
          ]
        },
        password: {
          rules: [
            {required: true, errorMessage: "请输入您的密码"},
            {
              minLength: 5,
              maxLength: 20,
              errorMessage: "用户密码长度必须介于 5 和 20 之间",
            },
          ]
        },
        confirmPassword: {
          rules: [
            {required: true, errorMessage: "请再次输入您的密码"},

            {required: true, validateFunction: equalToPassword},
          ]
        },
        code: {
          rules: [{required: true, errorMessage: "请输入验证码"}],
        }
      }
    }
  },

  onLoad() {
    if (getToken() !== "") {
      uni.reLaunch({
        url: '/pages/me/me',
      })
    }
    this.getCode();
  },
  onReady() {
    this.$refs.form.setRules(this.registerRules);
  },
  methods: {
    //获取验证码
    getCode() {
      getCodeImg().then(({data}) => {
        this.captchaEnabled = data.captchaEnabled === undefined ? true : data.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + data.img;
          this.registerForm.uuid = data.uuid;
        }
      });
    },
    toLogin() {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    },
    handleRegister() {
      this.$refs.form.validate().then(res => {
        //注册接口
        register(this.registerForm).then(({data}) => {
          //console.log(data)
          uni.showToast({
            title: '注册成功！',
            icon: 'none'
          });
          //跳转到登录
          uni.reLaunch({
            url: '/pages/login/login',
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
        this.registerForm.code = ""
      }).catch(errors => {
      })

    },
  },
};
</script>

<template>
  <div class="register">
    <h1>加入我们吧！</h1>
    <uni-forms :model="registerForm" ref="form">
      <!--      账号-->
      <uni-forms-item name="username">
        <uni-easyinput prefixIcon="auth" type="text" placeholder="请输入账号" v-model="registerForm.username"/>
      </uni-forms-item>
      <!--      密码-->
      <uni-forms-item name="password">
        <uni-easyinput prefixIcon="locked" type="password" placeholder="请输入密码" v-model="registerForm.password"/>
      </uni-forms-item>
      <!--      确认密码-->
      <uni-forms-item name="confirmPassword">
        <uni-easyinput prefixIcon="locked" type="password" placeholder="请确认密码"
                       v-model="registerForm.confirmPassword"/>
      </uni-forms-item>
      <!--      验证码-->
      <uni-forms-item name="code" v-if="captchaEnabled">
        <div class="login-code">
          <uni-easyinput v-model="registerForm.code" auto-complete="off" placeholder="验证码"
                         @keyup.enter.native="handleRegister"/>
          <img :src="codeUrl" @click="getCode" class="login-code-img" alt=""/>
        </div>
      </uni-forms-item>
      <button @click="handleRegister()">注 册</button>
      <p style="color: blue;text-align: right " @click="toLogin">已有账号？去登录</p>

    </uni-forms>
  </div>
</template>
<style scoped>
.register {
  margin: 20% auto;
  width: 80%;

  h1 {
    text-align: center;
    font-size: 20px;
    margin: 3rem auto;
  }
}

.login-code {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-code-img {
  margin-left: 1rem;
  width: 5rem;
  height: 2.4rem;
}
</style>