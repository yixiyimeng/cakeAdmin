import {
	basePath
} from '@/utils/index.js'
var Fly = require("./wx")
const request = new Fly()

request.config.timeout = 60 * 1000
request.config.withCredentials=true
request.config.baseURL = basePath
request.interceptors.request.use((request) => {
	if (uni.getStorageSync('cookiekey')) {
		request.headers["Cookie"] = uni.getStorageSync('cookiekey')
	}
	uni.showLoading({
		title: '拼命加载中...'
	})
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		console.log(response.headers)
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorage({
				key: 'cookiekey',
				data: response.headers['set-cookie'][0]
			});
		}
		wx.hideLoading();
		console.log(response.data.code == 200)
		if (response.code==200||response.data.code == 200||response.data.code == 0||(response.data.param&&response.data.param.code == 200)) {
			return promise.resolve(response.data)
		} else {
			console.log('发生错误了',response)
			let msg=response.data.message||response.data.msg||(response.data.param&&response.data.param.message)||'发生错误了'
			console.log(msg)
			uni.showToast({
				title:msg,
				icon: 'none'
			})
			return promise.reject()
		}
	},
	(err, promise) => {
		uni.hideLoading();
		console.log(err)
		uni.showToast({
			title: (err.response&&err.response.message)||'发生错误了',
			icon: 'none'
		})
		return promise.reject(err)
	}
)

export default request
