import { getToken, removeToken } from '@/utils/auth.js'
import { toast } from '@/utils/common'

export const baseUrl = "http://localhost:8160"

export default function ajax(config) {
    const {
        url = '',
        method = 'get',
        data = {},
        params = {},  // 增加支持 params
        header = {},
    } = config

    // 拼接 URL 参数
    function buildUrlWithParams(url, paramsObj) {
        if (!paramsObj || Object.keys(paramsObj).length === 0) return url
        const queryString = Object.entries(paramsObj)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&')
        return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`
    }

    uni.showLoading({
        title: '加载中...',
    })

    const isToken = header['isToken'] === false
    const token = getToken()
    const finalHeaders = {
        'Content-Type': 'application/json',
        ...header,
    }

    if (token && !isToken) {
        finalHeaders['Authorization'] = 'Bearer ' + token
    }

    const upperMethod = method.toUpperCase()
    const finalUrl = buildUrlWithParams(baseUrl + url, params)

    return new Promise((resolve, reject) => {
        uni.request({
            url: finalUrl,
            method: upperMethod,
            data: upperMethod === 'POST' ? data : {}, // 非 POST 请求就不传 body
            header: finalHeaders,
            success: (res) => {
                uni.hideLoading()

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
                uni.hideLoading()
                uni.showToast({
                    icon: 'error',
                    title: '后端接口请求异常',
                })
                reject(err)
            },
            complete: () => {
            }
        })
    })
}
