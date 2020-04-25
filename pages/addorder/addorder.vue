<template>
	<view class="flex-v flex">
		<form class="flex-sub">
			<view class="cu-form-group margin-top">
				<view class="title">客户电话</view>
				<input placeholder="请输入客户电话" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">客户姓名</view>
				<input placeholder="请输入客户姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">选择地址</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker" style="text-align: left;">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入客户姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">客服人员</view>
				<input disabled="true" name="input" value="1223"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">下单商品</view>
				<view>
					<view class="imgbox">
						<image src="../../static/images/1.jpg" mode="widthFix"></image>
					</view>
					<view>邮费差</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">购买数量</view>
				<input placeholder="请输入购买数量" name="number"></input>
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
					<view class="upload-item flex">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<textarea value="123" placeholder="" class="flex-sub" />
						</view>
					<view class="solids uploadimg"  @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd flex justify-center align-center'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group align-start margin-top">
				<view class="title">备注</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">商品金额</view>
						<input disabled="true" name="input" value="1223"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">运费</view>
						<input disabled="true" name="input" value="1223"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">总计</view>
						<input disabled="true" name="input" value="1223"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">是否预约</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
					<view class="cu-form-group">
						<view class="title">配送时间</view>
						<view>
							<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker inputbox">
									{{date}}
								</view>
							</picker>
						<!-- 	<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
								<view class="picker inputbox">
									{{time}}
								</view>
							</picker> -->
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">支付方式</view>
						<input disabled="true" name="input" value="微信转账"></input>
					</view>
		</form>
		<view class="applybtn">计算金额</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: [],
				imgList: ['/static/images/1.jpg'],
				switchA: true,
				date:'请选择日期',
				time:'请选择时间'
			};
		},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
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
	.applybtn{
		width:690upx;
		height:100upx;
		background:rgba(25,169,103,1);
		box-shadow:0px 9upx 27upx 0px rgba(25,169,103,0.58);
		border-radius:12upx;
		color: #fff;
		font-size: 30upx;
		text-align: center;
		line-height: 100upx;
		margin: 20upx auto;
	}
</style>
