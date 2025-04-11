import { getToken, removeToken } from '@/utils/auth.js'
import { toast } from '@/utils/common'

export const baseUrl = "http://localhost:8160"

export default function ajax(config) {
    const {
        url = '',
        method = 'get',
        data = {},
        header = {},
    } = config

    // 开启加载
    uni.showLoading({
        title: '加载中...',
    })

    // 默认 headers，加上 Authorization
    const isToken = header['isToken'] === false
    const token = getToken()
    const finalHeaders = {
        'Content-Type': 'application/json',
        ...header,
    }

    if (token && !isToken) {
        finalHeaders['Authorization'] = 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method: method.toUpperCase(),
            data,
            header: finalHeaders,
            success: (res) => {
                const code = res.data.code || 200
                const msg = res.data.msg || '请求异常'

                if (code === 401) {
                    removeToken()
                    uni.showModal({
                        title: '提示',
                        content: '登录状态已过期，您可以继续留在该页面，或者重新登录？',
                        confirmText: '登录',
                        success: function (modalRes) {
                            if (modalRes.confirm) {
                                uni.navigateTo({
                                    url: '/pages/me/me',
                                })
                            }
                        },
                    })
                    toast('无效的会话，或者会话已过期，请重新登录。')
                    reject('无效的会话，或者会话已过期，请重新登录。')
                } else if (code === 500) {
                    toast(msg)
                    reject(msg)
                } else if (code !== 200) {
                    toast(msg)
                    reject(msg)
                } else {
                    resolve(res)
                }
            },
            fail: (err) => {
                uni.showToast({
                    icon: 'error',
                    title: '后端接口请求异常',
                })
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            },
        })
    })
}
