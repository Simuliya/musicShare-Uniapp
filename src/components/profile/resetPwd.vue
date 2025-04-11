<template>
  <view class="container">
    <uni-forms ref="form" :model="user" :rules="rules">
      <uni-forms-item label="旧密码" name="oldPassword">
        <uni-easyinput v-model="user.oldPassword" placeholder="请输入旧密码" type="password"/>
      </uni-forms-item>
      <uni-forms-item label="新密码" name="newPassword">
        <uni-easyinput v-model="user.newPassword" placeholder="请输入新密码" type="password"/>
      </uni-forms-item>
      <uni-forms-item label="确认密码" name="confirmPassword">
        <uni-easyinput v-model="user.confirmPassword" placeholder="请确认新密码" type="password"/>
      </uni-forms-item>
      <uni-forms-item>
        <button type="primary" @click="submit">保存</button>
      </uni-forms-item>
    </uni-forms>
    {{ user.newPassword }}
    {{ user.confirmPassword }}
    {{ user.oldPassword }}
  </view>
</template>
<script>
import userInfoApi from "@/api/userInfo";

export default {
  data() {
    const equalToPassword = (rule, value, data, callback) => {
      if (this.user.newPassword !== value) {
        callback("两次输入的密码不一致");
      } else {
        return true
      }
    };
    return {
      user: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      // 表单校验
      rules: {
        oldPassword: {
          rules: [
            {required: true, errorMessage: "旧密码不能为空"}
          ]
        },
        newPassword: {
          rules: [
            {required: true, errorMessage: "新密码不能为空"},
            {minLength: 6, maxLength: 20, errorMessage: "长度在 6 到 20 个字符"}
          ]
        },
        confirmPassword: {
          rules: [
            {required: true, errorMessage: "确认密码不能为空"},
            {validateFunction: equalToPassword}
          ]
        }
      }
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        userInfoApi.updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
          uni.showToast({
            title: "修改成功",
            icon: "success",
          });
        }).catch(err => {
        })
      }).catch(err => {
      });
    },

  }
}
</script>
<style>
.container {
  padding: 40rpx;
}
</style>
