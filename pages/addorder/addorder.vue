<template>
	<view class="flex-v flex">
		<form class="flex-sub">
			<view class="cu-form-group margin-top">
				<view class="title">客户电话</view>
				<input placeholder="请输入客户电话" name="input" @input="changeCellphone" v-model.lazy="cellphone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">客户姓名</view>
				<input placeholder="请输入客户姓名" name="input" v-model.lazy="info.rec_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">选择地址</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker" style="text-align: left;">
						{{region.length==3?(region[0]+'，'+region[1]+'，'+region[2]):'请选择地址'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入客户姓名" name="input" v-model.lazy='address'></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">客服人员</view>
				<input disabled="true" name="input" value="1223"></input>
			</view> -->
			<view class="cu-form-group">
				<view class="title">下单商品</view>
				<view>
					<view class="imgbox">
						<image :src="goods.pic" mode="widthFix"></image>
					</view>
					<view>{{goods.name}}</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">购买数量</view>
				<!-- <input placeholder="请输入购买数量" name="number" v-model=""></input> -->
				<tui-numberbox :value="num" @change="changenum"></tui-numberbox>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}
				</view>
			</view>

			<view class="cu-form-group">
				<view class="upload flex-sub">
					<view class="upload-item flex" v-for="(item,index) in imgList" :key="index">
						<view class="bg-img" @tap="ViewImage" :data-url="item.img">
							<image :src="item.img" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<textarea placeholder="" class="flex-sub" v-model.lazy="item.text" placeholder="请输入图片备注信息" />
						</view>
					<view class="solids uploadimg"  @tap="ChooseImage" >
						<text class='cuIcon-cameraadd flex justify-center align-center'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group align-start margin-top">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="info.remark" placeholder="请输入备注"></textarea>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">商品金额</view>
						<input disabled="true" name="input" :value="orderInfo.goods_amount"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">运费</view>
						<input disabled="true" name="input" :value="orderInfo.freight_amount"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">总计</view>
						<input disabled="true" name="input" :value="orderInfo.total_amount"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">是否预约</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
					<view class="cu-form-group" v-if="switchA">
						<view class="title">配送时间</view>
						<view @tap="choosetime" class="inputbox">
							{{date}}
							<!-- <picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker inputbox">
									{{date}}
								</view>
							</picker> -->
							<!-- 	<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
								<view class="picker inputbox">
									{{time}}
								</view>
							</picker> -->
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">支付方式</view>
						<view class="inputbox">{{memberid?'小程序内部支付':'微信转账'}}</view>
						<!-- <input disabled="true" name="input" value="微信转账"></input> -->
					</view>
		</form>
		<view class="applybtn" @tap="calc">计算金额</view>
		<view class="applybtn" @tap="submit">确认订单</view>
		<tui-datetime ref="dateTime" type="1" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index.js'
	import tuiDatetime from "@/components/dateTime/dateTime"
	import tuiNumberbox from "@/components/numberbox/numberbox"

	import {
		api,
		postajax
	} from '@/utils/api.js'
	export default {
		data() {
			return {
				region: [],
				cellphone: '',
				imgList: [],
				switchA: false,
				info: {
					service_order_flag: 1,
					self_distribution_flag: 1,
					order_type: 1,
					remark: '',
					rec_name: ''
				},
				goods: {},
				address: '',
				date: '请选择日期',
				time: '请选择时间',
				memberid: '',
				num: 1,
				orderInfo: {},
				total_amount: 0,
				goods_amount: 0,
				freight_amount: 0

			};
		},
		components: {
			tuiDatetime,
			tuiNumberbox
		},
		onLoad() {
			this.getgoods();
			let userinfo = uni.getStorageSync('userinfo');
			this.info.service_member_name = userinfo.realname;
			this.info.service_member_id = userinfo.id;
		},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			getmember() {
				postajax(api.getmember, {
					cellphone: this.cellphone
				}).then(res => {
					let da = res.param;

					if (da.code == 200 && da.data && da.data.list.length > 0) {
						console.log(da.data.list)
						this.info.rec_name = da.data.list[0].username
						this.memberid = da.data.list[0].id;
						this.getAddr(da.data.list[0].id)
					} else {
						this.memberid = '';
					}
				})
			},
			changeCellphone(e) {
				this.cellphone = e.detail.value;
				var reg = /^1[3-9]\d{9}$/;
				if (reg.test(this.cellphone)) {
					/* 查询是否是会员 */
					this.getmember()
				}
			},
			getAddr(memberid) {
				postajax(api.getAddr + memberid).then(res => {
					let da = res.param;
					if (da.code == 200 && da.data.length > 0) {
						this.region = [da.data[0].province, da.data[0].city, da.data[0].district];
						this.address = da.data[0].address
					}
				})
			},
			ChooseImage() {
				let that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {

						if (res.tempFilePaths.length > 0) {

							for (var i = 0; i < res.tempFilePaths.length; i++) {
								console.log(res.tempFilePaths)
								that.uploadFile(res.tempFilePaths[i])
							}
						}

					}
				});
			},
			uploadFile(tempFilePaths) {
				let that = this;
				console.log(tempFilePaths)
				uni.uploadFile({
					url: api.upload,
					filePath: tempFilePaths,
					name: 'file',
					success: function(uploadFileRes) {
						console.log(JSON.parse(uploadFileRes.data).data);
						let img = JSON.parse(uploadFileRes.data).data.src
						console.log(img)
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat({
								img: img,
								text: ''
							})
						} else {
							that.imgList = [{
								img: img,
								text: ''
							}]
						}
						console.log(that.imgList)
					}
				});
			},
			getgoods() {
				postajax(api.getgoods, {
					take_out_flag: 1,
					limit: 1,
					up_down: 1,
					login_code: '5c906ce579857',
					page: 1,
					cate_id: 6
				}).then(res => {
					let da = res.param;
					if (da.code == 200 && da.data && da.data.list.length > 0) {
						this.goods = da.data.list[0].goods_list[0]
						this.goods.pic = da.data.list[0].pic;
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除这段回忆吗？',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			getparam() {
				if (this.cellphone) {
					this.info.rec_phone = this.cellphone;
				} else {
					uni.showToast({
						title: '请填写客户手机号码',
						icon: 'none'
					})
					return false
				}
				if (!this.info.rec_name) {
					uni.showToast({
						title: '请填写客户姓名',
						icon: 'none'
					})
					return false
				}
				let goodslist = [{
					goods_id: this.goods.id,
					qty: this.num
				}]
				this.info.goodsList = goodslist
				if (this.region.length >= 3 && this.address) {
					this.info.province = this.region[0];
					this.info.city = this.region[1];
					this.info.district = this.region[2];
					this.info.address = this.address;
				} else {
					uni.showToast({
						title: '请完善地址信息',
						icon: 'none'
					})
					return false
				}

				/* 如果是会员 */
				if (this.memberid) {
					this.info.belong_member_id = this.memberid;
					this.info.use_balance_flag = true;
					this.info.pay_id = -1;
				} else {
					this.info.pay_id = 6;
				}
				if (this.switchA) {
					this.info.is_yy = 'on';
					this.info.expected_arrived_begin_time = this.date + ':00';
					this.info.expected_arrived_end_time = this.date + ':00'
				} else {
					this.info.is_yy = 'off';
					this.info.expected_arrived_begin_time = '';
					this.info.expected_arrived_end_time = '';
				}
				this.info.images_text = [];
				this.info.images_url = [];
				if (this.imgList.length > 0) {
					console.log(this.imgList.length)
					for (var i = 0; i < this.imgList.length; i++) {
						console.log(this.imgList[i].img)
						if (this.imgList[i].img && this.imgList[i].text) {
							this.info.images_url.push(this.imgList[i].img);
							this.info.images_text.push(this.imgList[i].text)
						} else {
							uni.showToast({
								title: '请完善图片的备注信息',
								icon: 'none'
							})
							return false
						}
					}
					// this.info.images_text = this.imgList.map(item => {
					// 	return item.text
					// })
					// this.info.images_url = this.imgList.map(item => {
					// 	return item.img
					// })
				}
				return true
			},
			calc() {
				/* 计算订单 */
				if (this.getparam()) {
					console.log(this.info)
					postajax(api.calc, this.info).then(da => {
						console.log(da)
						this.orderInfo = da.data.orderInfo
					})
				}

			},
			submit() {
				postajax(api.submit, this.info).then(da => {
					// console.log(da)
					if (!this.memberid) {
						this.confirmOrder(da.data.id)
					} else {
						uni.showToast({
							title: '提交订单成功',
							icon: 'none'
						})
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/order/order'
							})
						}, 500);
					}

				})
			},
			confirmOrder(orderid) {
				postajax(api.paid + orderid, {
					pay_id: 6
				}).then(da => {
					console.log(da)
					uni.showToast({
						title: '提交订单成功',
						icon: 'none'
					})
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/order/order'
						})
					}, 500);
				})
			},
			choosetime() {
				this.$refs.dateTime.show()
			},
			change: function(e) {
				console.log(e)
				this.date = e.result
			},
			changenum: function(e) {
				this.num = e.value
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.imgbox {
		width: 120upx;
	}

	.upload {
		.upload-item {
			.bg-img {
				width: 160upx;
				height: 160upx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					position: absolute;

				}

			}

			.cu-tag {
				position: absolute;
				right: 0;
				top: 0;
				border-bottom-left-radius: 6rpx;
				padding: 6rpx 12rpx;
				height: auto;
				background-color: rgba(0, 0, 0, 0.5);

			}

		}

		.uploadimg {
			width: 160upx;
			height: 160upx;

			[class*="cuIcon-"] {
				font-size: 52rpx;
				position: absolute;
				color: #8799a3;
				margin: auto;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
	}

	.applybtn {
		width: 690upx;
		height: 100upx;
		background: rgba(25, 169, 103, 1);
		box-shadow: 0px 9upx 27upx 0px rgba(25, 169, 103, 0.58);
		border-radius: 12upx;
		color: #fff;
		font-size: 30upx;
		text-align: center;
		line-height: 100upx;
		margin: 20upx auto;
	}
</style>
