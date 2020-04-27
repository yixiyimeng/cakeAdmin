<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text>订单号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.order_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.rec_name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>电话号码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.rec_phone}}</text>
				</view>
			</view>
			<view class="cu-item margin-bottom ">
				<view class="content padding-tb-sm">
					<view>备注</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>{{info.remark}}</view>
				</view>
			</view>
			<view class="cu-item " v-if="info.is_yy=='on'">
				<view class="content">
					<text>客户预约时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.expected_arrived_begin_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>订单状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.state}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>商品金额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.goods_amount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>运费</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.freight_amount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>总金额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.total_amount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						配送地址</view>
					<view class="text-gray text-sm">
						{{info.province}}{{info.city}}{{info.district}}{{info.address}}
					</view>
				</view>
			</view>

		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">图片</view>
		</view>
		<view class="imglist bg-white">
			<view class="flex align-center solid-bottom padding-sm" v-for="(item,index) in info.info.img" :key="index">
				<view class="imgbox" :data-url="item" @tap="ViewImage">
					<image :src="item" mode="aspectFill" ></image>
				</view>
				<view>{{info.info.text[index]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info);
			console.log(this.info)
		},
		methods:{
			ViewImage(e) {
				uni.previewImage({
					urls: this.info.info.img,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style lang="scss">
.imglist{
	.imgbox{
		width: 200upx;
		height: 200upx;
		image{
			display: block;
			height: 100%;
			width: 100%;
		}
	}
}
</style>
