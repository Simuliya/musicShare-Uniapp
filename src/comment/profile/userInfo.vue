<template>
  <div class="container">
    <uni-forms ref="form" :model="user" :rules="rules">
      <uni-forms-item label="用户昵称" name="nickName">
        <uni-easyinput v-model="user.nickName" maxlength="30"/>
      </uni-forms-item>
      <uni-forms-item label="手机号码" name="phonenumber">
        <uni-easyinput v-model="user.phonenumber" maxlength="11"/>
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="email">
        <uni-easyinput v-model="user.email" :disabled="false" maxlength="50"/>
      </uni-forms-item>

      <uni-forms-item label="性别">
        <uni-data-checkbox v-model="user.sex" :localdata="sexSelect"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item>
        <button type="primary" @click="submit">保存</button>
      </uni-forms-item>
    </uni-forms>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import {checkEmailUnique} from "@/api/login";

export default {
  components: {},
  props: {
    user: {},
  },
  data() {
    const checkEmail = (rule, value, data, callback) => {
      //判断用户名是否存在
      checkEmailUnique(value).then((response) => {
        if (response.data !== true) {
          callback(new Error("邮箱已经存在"));

        } else {
          return true
        }
      });
    };
    return {
      sexSelect: [
        {'text': "男", value: '0'},
        {'text': "女", value: '1'},
      ],
      // 表单校验
      rules: {
        nickName: {
          rules: [
            {required: true, message: "用户昵称不能为空"},
            {
              min: 2,
              max: 20,
              message: "用户昵称长度必须介于 2 和 20 之间"
            },
          ]
        },
        phonenumber: {
          rules: [
            {required: true, message: "手机号码不能为空"},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
            },
          ]
        },
        email: {
          rules: [
            {required: true, message: "邮箱地址不能为空"},
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: "请输入正确的邮箱地址",
            },
            {validator: checkEmail}
          ]
        },
      },
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        userInfoApi.updateUserProfile(this.user).then((response) => {
          uni.showToast({
            title: "修改成功",
            icon: "success",
          });
        });
        
      });
    },
  },
};
</script>
<style>
.container {
  padding: 20px;
}
</style>
