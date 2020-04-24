<template>
	<view class="pageview flex flex-v">
		<view class="filterbar">
			<div class="flex align-center justify-between">
				<view class="title">起止时间:</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker inputbox">
						{{date}}
					</view>
				</picker>
				<text>—</text>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker inputbox">
						{{time}}
					</view>
				</picker>

			</div>
			<div class="flex align-center mt20">
				<view class="title">姓名:</view>
				<input class="inputbox flex-sub" type="text" placeholder="请输入姓名">

			</div>
			<view class="btn">查询</view>
		</view>
		<view class="flex-sub list">
			<view class="item">
				<view class="flex item-hd justify-between">
					<text>张三</text>
					<text class="ordernum">12233444</text>
				</view>
				<view class="flex flex-wrap mt20">
					<view class="w50">
						<text class="title">运费:</text>
						<text>10</text>
					</view>
					<view class="w50">
						<text class="title">大件补偿:</text>
						<text>10</text>
					</view>
					<view class="w50 mt20">
						<text class="title">奖励:</text>
						<text>10</text>
					</view>
					<view class="w50 mt20">
						<text class="title">处罚:</text>
						<text>10</text>
					</view>
				</view>
				<!-- <view class="item-ft mt20 flex justify-between">
					<view><text>合计</text>
						<text class="price">10</text></view>
					<text class="state">已支付</text>
				</view> -->
			</view>
			<view class="item">
				<view class="flex item-hd justify-between">
					<text>张三</text>
					<text class="ordernum">12233444</text>
				</view>
				<view class="flex flex-wrap mt20">
					<view class="w50">
						<text class="title">运费:</text>
						<text>10</text>
					</view>
					<view class="w50">
						<text class="title">大件补偿:</text>
						<text>10</text>
					</view>
					<view class="w50 mt20">
						<text class="title">奖励:</text>
						<text>10</text>
					</view>
					<view class="w50 mt20">
						<text class="title">处罚:</text>
						<text>10</text>
					</view>
				</view>
				<!-- <view class="item-ft mt20 flex justify-between">
					<view><text>合计</text>
						<text class="price">10</text></view>
					<text class="state">已支付</text>
				</view> -->
			</view>
		</view>
		<view class="ftbar"><text>合计</text>
			<text class="price">10</text></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '请选择日期',
				time: '请选择时间段'
			};
		},
		methods: {
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	page,
	.pageview{
		height: 100%;
		width: 100%;
		overflow: hidden;
		background: #F5F5F5;
	}

	.filterbar {
		background: #fff;
		padding: 20upx;
		color: #2F2F2F;

		text {
			color: #E3E3E3;
			margin: 0 5upx;
		}

		.title {
			width: 5em;
			text-align: right;
			margin-right: 30upx;
			font-size: 30upx;
			font-weight: blod;
		}

		.inputbox {
			border: 1px solid #eee;
			border-radius: 8upx;
			line-height: 70upx;
			height: 70upx;
			min-width: 250upx;
			padding-left: 20upx;
		}

		.btn {
			width: 600upx;
			height: 80upx;
			background: #19A967;
			box-shadow: 0px 9upx 20upx 0px rgba(25, 169, 103, 0.58);
			border-radius: 12upx;
			margin: 20upx auto 10upx;
			color: #fff;
			text-align: center;
			line-height: 80upx;
			font-size: 30upx;
		}
	}

	.list {
		margin-top: 20upx;

		.item {
			padding: 0 25upx;
			width: 690upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4upx 16upx 0px rgba(213, 213, 213, 1);
			border-radius: 8upx;
			margin: 0 auto 10upx;
			color: #454545;
			font-size: 26upx;
			padding-bottom: 20upx;

			.item-hd {
				line-height: 87upx;
				border-bottom: 1px solid #E3E3E3;
				font-size: 30upx;
			}

			.price {
				color: #FD3C3E;
				font-size: 36upx;
			}

			.state {
				color: #19A967;
			}

			.item-ft {
				line-height: 87upx;
				border-top: 1px solid #E3E3E3;

			}

			.ordernum {
				color: #FD3C3E;
			}

			.title {
				color: #8D8D8D;
				margin-right: 10upx;
			}

			.w50 {
				width: 50%;
			}
		}
	}

	.ftbar {
		background: #19A967;
		line-height: 100upx;
		color: #fff;
		font-size: 30upx;
		text-align: center;
	}
</style>
