<template>
	<view class="pageview flex flex-v">
		<view class="filterbar">
			<div class="flex align-center justify-between">
				<view class="title">订单编号:</view>
				<input class="inputbox flex-sub" type="text" placeholder="请输入订单编号" v-model.layz="order_no">

			</div>
			<div class="flex align-center mt20">
				<view class="title">手机号码:</view>
				<input class="inputbox flex-sub" type="text" placeholder="请输入手机号码" v-model.layz="rec_phone">

			</div>
			<div class="flex align-center mt20">
				<view class="title">订单状态:</view>
				<picker class="flex-sub" @change="PickerChange" :value="state" :range="picker" range-key='name'>
					<view class="picker inputbox">
						{{picker[state].name}}
					</view>
				</picker>
			</div>
			<view class="flex justify-between">
				<view class="btn" @tap="downCallback">查询</view>
				<navigator url="/pages/addorder/addorder" class="btn addbtn">添加</navigator>
			</view>
		</view>
		<view class="flex-sub list">
			<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="flex item-hd justify-between">
						<text>{{item.rec_name}}({{item.rec_phone}})</text>
						<text class="ordernum">{{item.order_no}}</text>
					</view>
					<view class="flex flex-wrap mt20">
						<view class="imgbox" v-for="(subitem,subindex) in item.info.img" :key="subindex">
							<image :src="subitem" mode="widthFix"></image>
						</view>
						<!-- <view class="imgbox">
							<image src="../../static/images/1.jpg" mode="widthFix"></image>
						</view>
						<view class="imgbox">
							<image src="../../static/images/1.jpg" mode="widthFix"></image>
						</view> -->
					</view>
					<view class="item-ft mt20 flex justify-between align-center">
						<!-- <view><text>总金额</text>
						<text class="price">10</text></view> -->
						<text class="state">{{item.kitchen_state}}</text>
						<view class="btn">查看</view>
					</view>
				</view>
				<!-- <view class="item">
				<view class="flex item-hd justify-between">
					<text>张三(13720257591)</text>
					<text class="ordernum">NO.12233444</text>
				</view>
				<view class="flex flex-wrap mt20">
					<view class="imgbox">
						<image src="../../static/images/1.jpg" mode="widthFix"></image>
					</view>
				</view>
				<view class="item-ft mt20 flex justify-between align-center">
					<text class="state">已支付</text>
					<view class="btn">查看</view>
				</view>
			</view> -->
			</mescroll-uni>
		</view>
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
				date: '请选择日期',
				time: '请选择时间段',
				state: 0,
				order_no: '',
				rec_phone: '',
				picker: [{
						id: '1,2,3,4',
						name: '全部'
					},
					{
						id: '0',
						name: '取消'
					},
					{
						id: '1',
						name: '新建'
					}, {
						id: '2',
						name: '支付完成'
					},
					{
						id: '3',
						name: '发货'
					},
					{
						id: '4',
						name: '完成'
					}
				],
				list: []
			};
		},
		mixins: [MescrollMixin],
		methods: {
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			getorderlist(page, limit) {
				postajax(api.getorderlist, {
					order_no: this.order_no,
					rec_phone: this.rec_phone,
					page: page,
					limit: limit,
					order_type: '1,3,4',
					service_order_flag: 1,
					state: this.picker[this.state].id
				}).then(res => {
					let da=res.param;
					if (da.code == 200) {
						let curPageData = da.data.list;
						/* info中的图片 */
						if(curPageData.length>0){
							curPageData=curPageData.map(item=>{
								item.info=JSON.parse(item.info);
								return item
							})
						}
						if (page == 1) this.list = []; //如果是第一页需手动置空列表
						this.list = this.list.concat(curPageData);
						this.mescroll.endBySize(curPageData.length, da.data.totalCount);
						console.log(this.list)
					}
				})
			},
		
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.getorderlist(pageNum, pageSize);
			},
			PickerChange(e){
				console.log(e)
				this.state=e.detail.value
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
			width: 100%;
			padding-left: 20upx;
		}

		.btn {
			height: 80upx;
			background: #19A967;
			box-shadow: 0px 9upx 20upx 0px rgba(25, 169, 103, 0.58);
			border-radius: 12upx;
			margin: 20upx auto 10upx;
			color: #fff;
			text-align: center;
			line-height: 80upx;
			font-size: 30upx;
			width: 250upx;

			&.addbtn {

				margin-left: 20upx;
				background: #FB595F;
				box-shadow: 0px 9upx 20upx 0px rgba(251, 89, 95, 0.17);
			}
		}
	}

	.list {
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		height: 200upx;
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

			.btn {
				width: 134upx;
				height: 59upx;
				background: rgba(25, 169, 103, 1);
				border-radius: 8upx;
				color: #fff;
				font-size: 26upx;
				text-align: center;
				line-height: 59upx;
			}

		}
	}

	.imgbox {
		width: 30%;
		border-radius: 10upx;
		overflow: hidden;

		image {
			display: block;
			width: 100%;
		}

		&+.imgbox {
			margin-left: 5%;
		}
	}
</style>
