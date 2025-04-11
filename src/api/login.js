import request from '@/utils/request'

// 登录方法
export function login(userInfo) {
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: userInfo
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


//校验用户名称是否唯一
export function checkUserNameUnique(userName) {
  return request({
    url: '/userNameUnique',
    method: 'get',
    params: { userName }
  })
}

//校验邮箱是否唯一
export function checkEmailUnique(email) {
  return request({
    url: '/emailUnique',
    method: 'get',
    params: { email }
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

