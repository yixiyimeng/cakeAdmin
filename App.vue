<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/*每个页面公共css */
	/*flex 布局*/
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}

	/*垂直显示*/

	.flex-v {
		-webkit-box-orient: vertical;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.flex-1 {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: hidden
	}

	/*垂直对其方式*/

	.flex-align-center {
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	/*左右居中*/

	.flex-pack-center {
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	/*两端对齐*/

	.flex-pack-justify {
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.ml10 {
		margin-left: 10rpx;
	}

	.mt10 {
		margin-top: 10rpx;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.ml20 {
		margin-left: 20rpx;
	}
</style>
