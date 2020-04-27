<template>
	<div>
		<textarea name="" rows="" cols="" placeholder="请输入2-100备注信息" class="txt" v-model="content"></textarea>
		<div class="imgbox">
			<div class="videobox" v-for="(item, itemIndex) in srclist" :key='itemIndex'>
				<div class="close" @click="del(itemIndex)">×</div>
				<image :src="item.path" v-if="item.type=='0'" class="img" mode='aspectFit'></image>
				<div class="video" v-else><img src="/static/images/camera.png" @click="playvideo(item.path)" mode='aspectFit' /></div>
			</div>
			<div @click="showActionSheet" class="addimg"><img src="/static/images/camera.png" mode='aspectFit' /></div>
		</div>
		<div class="send" @click="addVideolist">发布</div>
		<video id="prew_video" autoplay="true" direction="0" :src="videoSrc" style="display: none;" @fullscreenchange="bindVideoScreenChange"></video>
	</div>
</template>

<script>
	import {
		api,
		postajax,
		postajaxnologin
	} from '@/utils/api.js';
	export default {
		data() {
			return {
				content: '',
				type: '',
				isImg: '',
				srclist: [],
				videoContext: '',
				playVideo: false,
				videoSrc: ''
			}
		},

		created() {

		},
		onShow() {
			var that = this;
			that.videoSrc = '';
			
		},
		onHide() {
			/*	*/
		},
		methods: {
			/*选择视频*/
			chooseVideo: function() {
				var that = this
				wx.chooseVideo({
					maxDuration: 60,
					compressed: true,
					sourceType: ['album', 'camera'],
					success: function(res) {
						that.srclist.push({
							path: res.tempFilePath,
							type: 1
						});
						that.uploadfile(res.tempFilePath, that.srclist.length - 1);

					}
				})
			},
			/*选择图片*/
			chooseImage: function() {
				var that = this
				wx.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					count: 9 - that.srclist.length,
					success: function(res) {

						for (var i = 0; i < res.tempFiles.length; i++) {
							that.srclist.push({
								path: res.tempFiles[i].path,
								type: 0
							});
							that.uploadfile(res.tempFiles[i].path, that.srclist.length - 1);
						}
					}
				})
			},
			showActionSheet: function() {
				var that = this;
				if (that.isImg == "") {
					wx.showActionSheet({
						itemList: ['上传图片', '上传视频'],
						success(res) {
							console.log(res.tapIndex)
							if (res.tapIndex == 0) {
								that.chooseImage();
								//that.isImg = 1;
							} else {
								that.chooseVideo();
								//that.isImg = 2;
							}
						},
						fail(res) {
							console.log(res.errMsg)
						}
					})
				} else if (that.isImg == 1) {
					that.chooseImage();
				} else {
					wx.showToast({
						icon: "none",
						title: "只能添加一个视频"
					});
				}

			},
			del: function(index) {
				var that = this;
				that.srclist.splice(index, 1);
				if (that.srclist.length == 0) {
					that.isImg = '';
				}
			},

			uploadfile: function(imgpath, index) {
				var that = this;
				wx.showToast({
					icon: "loading",
					title: "正在上传"
				});
				uni.uploadFile({
					url: api.upload,
					filePath: imgpath,
					name: 'file',
					success: function(uploadFileRes) {
						let img = JSON.parse(uploadFileRes.data).data.src;
						console.log(img);
						console.log(that.srclist[index])
						that.srclist[index].path = img;
						if (that.srclist[index].type == 0) {
							that.isImg = '1';
						} else {
							that.isImg = '2';
						}
					}
				});
			},

			/*添加实拍*/
			addVideolist: function() {
				var that = this;
				var param = {
					title: that.content,
				}
				if (this.isImg == 1) {
					let images_url = [];
					if (that.srclist.length > 0) {
						that.srclist.forEach(item => {
							if (item.type == 0) {
								images_url.push(item.path)
							}
						})
					}
					param.images_url = images_url;
				} else if (this.isImg == 2) {
					param.video_url = that.srclist[0].path
				}
				postajaxnologin(api.addvideo, param).then(da => {
					if (da.code == 200) {
						wx.showToast({
							icon: "none",
							title: da.msg
						});
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/video/video'
							})
						}, 500);
						that.content = '';
						that.srclist = [];
						that.isImg = '';
						that.videoSrc = '';
					}
				})


			},

			playvideo: function(path) {
				this.videoSrc = path;
				var videoContext = this.videoContext;
				videoContext.seek(0);
				videoContext.play();
				videoContext.requestFullScreen();
			},
			/**
			 * 全屏改变
			 */
			bindVideoScreenChange: function(e) {
				var status = e.mp.detail.fullScreen;

				if (!status) {
					var videoContext = this.videoContext;
					videoContext.pause();
					this.videoSrc = '';
				} else {

				}
				//this.setData(play);
			}

		},
		onReady: function(res) {
			this.videoContext = wx.createVideoContext('prew_video');
		},
	}
</script>

<style>
	.txt {
		font-size: 24rpx;
		padding: 10rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.imgbox {
		background: #ebebeb;
		padding: 20rpx;
		overflow: hidden;
	}

	.imgbox>div {
		float: left;
		margin: 10rpx;
	}

	.imgbox .img {
		height: 140rpx;
		width: 140rpx;
		background: #fff;
	}

	.imgbox .video {
		height: 140rpx;
		width: 140rpx;
		background: #000;
		position: relative;
	}

	.imgbox .video img {
		display: block;
		position: absolute;
		height: 64rpx;
		width: 64rpx;
		left: 38rpx;
		top: 38rpx;
	}

	.imgbox .videobox {
		position: relative;
		height: 140rpx;
		width: 140rpx;
	}

	.imgbox .videobox .close {
		position: absolute;
		color: #fff;
		background: #f00;
		border-radius: 100%;
		height: 40rpx;
		width: 40rpx;
		top: -10rpx;
		right: -10rpx;
		line-height: 35rpx;
		font-weight: bold;
		text-align: center;
		z-index: 99;
	}

	.imgbox .addimg {
		height: 140rpx;
		width: 140rpx;
		border: 2rpx dashed #8d8d8d;
		text-align: center;
		padding-top: 40rpx;
	}

	.imgbox .addimg img {
		width: 60rpx;
		height: 60rpx;
	}

	.send {
		background: #049588;
		border-radius: 50rpx;
		color: #fff;
		text-align: center;
		font-size: 40rpx;
		margin: 40rpx auto;
		width: 420rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
</style>
