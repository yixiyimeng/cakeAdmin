import $http from './request'
import {
	basePath
} from './index'

function JsontoForm(params) {
	let str = [];
	for (let key in params) {
		str.push(key + "=" + params[key])
	}
	return str.join('&');

}
export const api = {
	/* 登录 */
	login: '/wages/userInfo',
	getexpress: 'order/cal/express/get', //快递工资
	getmember: 'api/firm/member/index',
	getAddr: 'api/firm/member_address/get/', //获取默认地址
	upload: basePath + 'content/upload/uploader', //上传图片
	getorderlist: '/api/firm/order/index',
	getgoods: '/api/firm/product/index',
	calc: '/api/firm/order/calc',
	submit: '/api/firm/order/submit',
	paid: 'order/paid/',
	getvideolist: '/content/wechat_zoom/get',
	deletevideo: '/content/wechat_zoom/delete/',
	addvideo: '/content/wechat_zoom/add'

}

// export function getajax(url) {
// 	return $http.get(url)
// }
export function postajax(url, params) {
	params = params || {};
	params.login_code = '5c906ce579857'
	let myparams = JsontoForm(params);
	console.log(myparams)
	return $http.post(url, params)
}
export function getajax(url, params) {
	params = params || {};
	params.login_code = '5c906ce579857'
	let myparams = JsontoForm(params);
	return $http.get(url, myparams)
}
export function postajaxnologin(url, params) {
	params = params || {};
	return $http.post(url, params)
}
export default {
	api,
	getajax,
	postajax,
	postajaxnologin
}
