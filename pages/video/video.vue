<template>
	<div>
		<view v-show="isShowVideo" style="position:absolute; z-index: 999; background: #000000; top:0;left:0;right:0;bottom:0">
			<video
				id="prew_video"
				autoplay="true"
				direction="0"
				:src="videoSrc"
				@fullscreenchange="bindVideoScreenChange"
				@pause="pause"
				:poster="poster"
				custom-cache="false"
				style="position: absolute; top: 50%; width: 100%; transform: translateY(-50%);"
			></video>
		</view>
		<div class="videolist">
			<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<ul>
					<li class="flex" v-for="(item, itemIndex) in videolist" :key="itemIndex">
						<div class="photo"><image :src="userInfo.logo" mode="aspectFill" /></div>
						<div class="flex-1 ml10">
							<p class="name">{{ userInfo.name }}</p>
							<div class="decript">{{ item.title }}</div>
							<div class="imgbox clearfix ">
								<span v-for="(image, subitemIndex) in item.imglist" :key="subitemIndex">
									<span class="previewimg"><image :src="image" @click="previewImage(item.imglist, image)" mode="aspectFill" :lazy-load="true" /></span>
								</span>
								<span v-if="item.video_url" class="video" @click="playvideo(item.video_url)">
									<image src="/static/images/webwxgetmsgimg.jpg" mode="aspectFill" />
									<div style="position: absolute;top: 0;left: 0; bottom: 0; right: 0; background: rgba(0,0,0,.3);"></div>
									<image src="/static/images/play.png" class="icon" mode="aspectFill"></image>
								</span>
							</div>
							<div class="tip flex flex-pack-justify">
								<span class="time">{{ item.create_time }}</span>
								<span class="red" @tap="delvideo(item.id)">删除</span>
							</div>
						</div>
					</li>
				</ul>
			</mescroll-uni>
		</div>
	</div>
</template>

<script>
let timer = null;
import { api, postajax, getajax } from '@/utils/api.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';

export default {
	components: {},
	mixins: [MescrollMixin],
	data() {
		return {
			videolist: [],
			userInfo: {},
			videoSrc: '',
			poster: '',
			isShowVideo: false
		};
	},
	onLoad() {
		var that = this;
		that.getVideoList();
	},
	created() {
		this.userInfo = {
			logo: '/static/images/webwxgetmsgimg.jpg',
			name: '核桃妈妈'
		};
		// console.log(this.globalData.userInfo.name)
	},

	methods: {
		previewImage: function(imglist, current) {
			wx.previewImage({
				current: current, // 当前显示图片的http链接
				urls: imglist // 需要预览的图片http链接列表
			});
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			this.getVideoList(pageNum, pageSize);
		},
		getVideoList(page, limit) {
			const that = this;
			var param = {
				page: page,
				limit: limit
			};
			console.log(param);
			getajax(api.getvideolist, param).then(res => {
				let da = res;
				if (da.code == 0) {
					let curPageData = da.data.map(item => {
						if (item.images_url) {
							item.imglist = item.images_url.split('|').map(subitem => {
								// return that.host + subitem
								return subitem;
							});
						}
						return item
					});
					if (page == 1) this.videolist = []; //如果是第一页需手动置空列表
					this.videolist = this.videolist.concat(curPageData);
					this.mescroll.endBySize(curPageData.length, da.count);
					console.log(this.videolist);
				}
			});
		},

		showUser(uuid) {
			this.getvideoUserInfo(uuid);
			this.isShow = true;
		},
		hideUser(e) {
			if (e.currentTarget.id == e.target.id) {
				this.isShow = !this.isShow;
			}
		},

		playvideo: function(path, poster) {
			// this.poster = poster;
			let that = this;
			var videoContext = this.videoContext;
			this.videoSrc = path;
			// that.isShowVideo = true;
			videoContext.seek(0);
			videoContext.play();
			if (timer) {
				clearTimeout(timer);
			}
			
			timer = setTimeout(function() {
				console.log('播放视频')
				videoContext.requestFullScreen();
			}, 100);
		},
		pause(e) {
			var videoContext = this.videoContext;
			videoContext.exitFullScreen();
			this.videoSrc = '';
			// this.isShowVideo = false;
		},
		/**
		 * 全屏改变
		 */
		bindVideoScreenChange: function(e) {
			var status = e.mp.detail.fullScreen;
			console.log(status);
			if (!status) {
				var videoContext = this.videoContext;
				videoContext.seek(0);
				videoContext.pause();
				this.videoSrc = '';
				this.isShowVideo = false;
			} else {
				this.isShowVideo = true;
			}
			//this.setData(play);
		},
		delvideo(id){
			let that=this;
			uni.showModal({
				title: '删除',
				content: '确定要删除吗？',
				success: res => {
					if (res.confirm) {
						postajax(api.deletevideo+id).then(da=>{
							uni.showToast({
								title:'删除成功',
								icon:'none'
							})
							that.mescroll.resetUpScroll()
						})
					}
				}
			})
		}
	},
	onReady: function(res) {
		this.videoContext = wx.createVideoContext('prew_video');
	},
	
};
</script>

<style scoped>
page {
	background: #fff;
}

.videolist ul li {
	padding: 30px 12px 15px;
	border-bottom: 1px dashed #e8e8e8;
}

.videolist ul li .photo {
	width: 100rpx;
	height: 100rpx;
	overflow: hidden;
}

.videolist ul li .photo image {
	display: block;
	height: 100%;
	width: 100%;
}

.videolist ul li .name {
	font-size: 34rpx;
	color: #576a94;
	margin-bottom: 30rpx;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.videolist ul li .decript {
	font-size: 30rpx;
}

.videolist ul li .imgbox {
	margin-top: 20rpx;
	overflow: hidden;
}

.videolist ul li .imgbox .previewimg {
	display: block;
	width: 28%;
	height: 0;
	padding-bottom: 28%;
	/* padding: 0 4rpx; */
	margin-bottom: 10rpx;
	float: left;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

.videolist ul li .imgbox .previewimg {
	margin: 1%;
}

.videolist ul li .imgbox .previewimg image {
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.videolist ul li .tip {
	color: #434343;
	font-size: 24rpx;
	margin-top: 20rpx;
}

.videolist ul li image {
	width: 32rpx;
	vertical-align: middle;
}

.videolist ul li span {
	vertical-align: middle;
}

.userInfo {
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-size: 28rpx;
	line-height: 60rpx;
}

.userInfo > div {
	position: absolute;
	top: 50%;
	left: 10%;
	width: 80%;
	transform: translateY(-50%);
	background: #fff;
	padding: 60rpx;
	box-sizing: border-box;
	color: #989898;
}

.userInfo .name {
	font-size: 32rpx;
	color: #131510;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-right: 35rpx;
}

.userInfo > div > div {
	border-bottom: 1px solid #f6f6f6;
}

.userInfo .btn {
	background: #ff5355;
	color: #fff;
	border-radius: 5px;
	font-size: 28rpx;
	text-align: center;
	margin-top: 40rpx;
}

.userInfo label {
	color: #131510;
}

.userInfo .icon {
	width: 32rpx;
	height: 32rpx;
}

.userInfo .photo {
	width: 100rpx;
	height: 100rpx;
	border-radius: 5px;
	overflow: hidden;
	display: block;
	margin-left: 10rpx;
}

.userInfo .pb20 {
	padding-bottom: 20px;
}

.video {
	width: 300rpx;
	height: 400rpx;
	overflow: hidden;
	display: block;
	background: #000;
	position: relative;
}

.videolist ul li .video image {
	width: 100%;
	height: 100%;
}

.videolist ul li .video image.icon {
	width: 128rpx;
	height: 128rpx;
	position: absolute;
	left: 86rpx;
	top: 136rpx;
}
.red {
	color: #f00;
}
</style>
