<template>
	<div class="login">
		<div class="loginbox">
			<h4>核桃妹的妈妈后台管理系统</h4>
			<form>
				<div class="group flex flex-align-center">
					<label>账户</label>
					<input class="flex-1" type="text" name="" id="" value="" placeholder="请输入账号" v-model="phone" />
				</div>
				<div class="group flex flex-align-center mt20">
					<label>密码</label>
					<input class="flex-1" type="password" name="" id="" value="" placeholder="请输入密码" v-model="pwd" />
				</div>
				<button class="submitBtn" @click="submit">立即登录</button>
			</form>
			<p class="tip">仅限于核桃妹的妈妈内部人员使用</p>
		</div>
	</div>
</template>

<script>
import { api, postajax } from '@/utils/api.js';
export default {
	data() {
		return {
			phone: '',
			pwd: ''
		};
	},

	created() {
		let logininfo = wx.getStorageSync('logininfo');
		this.phone = logininfo.username;
		this.pwd = logininfo.password;
	},
	methods: {
		submit: function() {
			var $me = this;
			var param = {
				username: $me.phone,
				password: $me.pwd
			};
			postajax(api.login, param).then(da => {
				console.log(da);
				if (da.code == 200) {
					wx.redirectTo({
						url: '/pages/index/index'
					});
					wx.setStorageSync('logininfo', param);
					wx.setStorageSync('userinfo', da.data);
				} else {
					wx.showToast({
						title: da.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
/*登录*/

.mt20 {
	margin-top: 40rpx;
}

.mt15 {
	margin-top: 30rpx;
}

.login {
	position: fixed;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	background: #f9f1ee no-repeat top center;
	background-size: 100% auto;
}

.login a {
	color: #ff5454;
	font-size: 30rpx;
}

.loginbox {
	width: 480rpx;
	margin: 0 auto;
	padding-top: 80rpx;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 80rpx;
}

.loginbox h4 {
	text-align: center;
	color: #049588;
	font-size: 36rpx;
	margin-bottom: 100rpx;
}

.loginbox .tip {
	color: #fa036b;
	font-size: 30rpx;
	text-align: center;
	margin-top: 80rpx;
}

.loginbox form {
}

.loginbox .group {
	height: 80rpx;
	font-size: 30rpx;
}

.loginbox .group i {
	display: block;
	height: 20px;
	width: 36px;
}

.loginbox .group i image {
	display: block;
	width: 100%;
	height: 100%;
}

.loginbox .group input {
	background: none;
	border: none;
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
	border: 1px solid #049588;
	background: #fff;
	margin-left: 10rpx;
	padding-left: 20rpx;
}

.loginbox .submitBtn {
	display: block;
	width: 100%;
	background: #049588;
	color: #fff;
	line-height: 80rpx;
	height: 80rpx;
	text-align: center;
	border-radius: 10rpx;
	border: none;
	margin-top: 40rpx;
	font-size: 30rpx;
}
</style>
