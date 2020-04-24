<template>
	<view class="content">
		<ul class="menulist">
			<li>
				<navigator url="/pages/ordermenu/main">
					<div><img src="/static/images/3.png" mode='aspectFit' /></div>
					<p>预约订单</p>
				</navigator>
			</li>
			<li>
				<navigator url="/pages/reportlist/main">
					<div><img src="/static/images/4.png" mode='aspectFit' /></div>
					<p>快递工资</p>
				</navigator>
			</li>
			<li>
				<navigator url="/pages/video/main">
					<div><img src="/static/images/5.png" mode='aspectFit' /></div>
					<p>发布实拍</p>
				</navigator>
			</li>
			<li>
				<navigator url="/pages/videolist/main">
					<div><img src="/static/images/6.png" mode='aspectFit' /></div>
					<p>实拍管理</p>
				</navigator>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pt20 {
		padding-top: 20px;
	}

	

	.menulist {
		margin-top: 20px;
		background: #fff;
		overflow: hidden;
		padding-top: 12px;
	}

	.menulist li {
		float: left;
		width: 33.33%;
		text-align: center;
		margin-bottom: 15px;
		font-size: 12px;
	}

	.menulist li div {
		display: block;
		height: 70px;
		width: 70px;
		background: #f7f7f7;
		border-radius: 5px;
		margin: 0 auto 8px;
		padding-top: 25rpx;
		box-sizing: border-box;
	}

	.menulist li div p {
		font-size: 6px;
	}

	.menulist img {
		width: 90rpx;
		height: 90rpx;
		margin: 0 auto;
		display: block;
	}
</style>
