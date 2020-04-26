import $http from './request'
import {basePath} from './index'
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
	upload: basePath+'content/upload/uploader', //上传图片
	getorderlist: '/api/firm/order/index',
	getgoods:'/api/firm/product/index',
	calc:'/api/firm/order/calc',
	submit:'/api/firm/order/submit',
	paid:'order/paid/'
	
}

export function getajax(url) {
	return $http.get(url)
}
export function postajax(url, params) {
	params=params||{};
	params.login_code = '5c906ce579857'
	let myparams = JsontoForm(params);
	return $http.post(url, params)
}
export default {
	api,
	getajax,
	postajax
}
