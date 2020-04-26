<template>
	<view class="pageview flex flex-v">
		<view class="filterbar">
			<div class="flex align-center justify-between">
				<view class="title">起止时间:</view>
				<picker mode="date" :value="created_at_start" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker inputbox">
						{{created_at_start||'请选择开始时间'}}
					</view>
				</picker>
				<text>—</text>
				<picker mode="date" :value="created_at_end" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker inputbox">
						{{created_at_end||'请选择结束时间'}}
					</view>
				</picker>

			</div>

			<view class="btn">查询</view>
		</view>
		<view class="flex-sub list">
			<mescroll-uni  :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="flex item-hd justify-between">
						<text>{{item.delivery_member_name}}</text>
						<text class="ordernum">{{item.order_no}}</text>
					</view>
					<view class="flex flex-wrap mt20">
						<view class="w50">
							<text class="title">运费:</text>
							<text>￥{{item.freight_amount}}</text>
						</view>
						<view class="w50">
							<text class="title">大件补偿:</text>
							<text>￥{{item.big_amount}}</text>
						</view>
						<view class="w50 mt20">
							<text class="title">奖励:</text>
							<text>￥{{item.jl_amount}}</text>
						</view>
						<view class="w50 mt20">
							<text class="title">处罚:</text>
							<text>￥{{item.cf_amount}}</text>
						</view>
					</view>
					<!-- <view class="item-ft mt20 flex justify-between">
							<view><text>合计</text>
								<text class="price">10</text></view>
							<text class="state">已支付</text>
						</view> -->
				</view>
			</mescroll-uni>


		</view>
		<view class="ftbar"><text>合计</text>
			<text class="price">￥{{total}}</text></view>

	</view>
</template>

<script>
	import {
		api,
		postajax
	} from '@/utils/api.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		data() {
			return {
				created_at_start: '',
				created_at_end: '',
				// page: 1,
				// limit: 20,
				delivery_member_id: '',
				list: [],
				total: 0
			};
		},
		mixins: [MescrollMixin], // 使用mixin
		onLoad() {
			this.delivery_member_id = uni.getStorageSync('userinfo').id
			// this.getexpress(1, 20)
		},
		methods: {
			TimeChange(e) {
				this.created_at_end = e.detail.value
			},
			DateChange(e) {
				this.created_at_start = e.detail.value
			},
			getexpress(page, limit) {
				postajax(api.getexpress, {
					created_at_start: this.created_at_start ? (this.created_at_start + ' :00:00:00') : '',
					created_at_end: this.created_at_end ? (this.created_at_end + ' 23:59:59') : '',
					page: page,
					limit: limit,
					delivery_member_id: this.delivery_member_id,
				}).then(da => {
					let curPageData = da.data;
					this.total = da.heji;
					if (page == 1) this.list = []; //如果是第一页需手动置空列表
					this.list = this.list.concat(curPageData);
					this.mescroll.endBySize(curPageData.length, da.count);
				})
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.getexpress(pageNum,pageSize);
			}

		}
	}
</script>

<style lang="scss">
	page,
	.pageview {
		height: 100%;
		width: 100%;
		overflow: hidden;
		background: #F5F5F5;
		posiion:relative;
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
		overflow: auto;
		margin-top: 20upx;
		-webkit-overflow-scrolling: touch;
		
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
