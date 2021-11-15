	<template>
  <view class="qr-code">
			<uni-popup ref="popupCode" :mask-click="false" background-color="#fff">
				<view class="popup-class">
					<view class="popup-title">
						<text>{{meetingInfo.trainName}}</text>
					</view>
					<view class="but">
						<button class="confirm-class" @click="confirm">签到</button>
						<button @click="close">关闭</button>
					</view>
				</view>
			</uni-popup>
			<!-- 弹框 -->
			<uni-popup ref="popupTitle" type="center" background-color="#fff">
				<view class="popup-content">
					<view class="icon">
						<uni-icons type="checkmarkempty" size="60"></uni-icons>
					</view>
					<view class="message">{{message}}</view>
				</view>
			</uni-popup>
			<!-- 找不到会议内容显示的信息 -->
			<view class="unfilled-log" v-if="showNullTitle">
				<view class="unfilled-title">未找到该会议</view>
			</view>
		</view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-7 6:51:19 ?F10: PM?
* description   
*/


export default {
  name: 'qrCode',
  data () {
    return {
      trainId: '',
			meetingInfo: {},
			message: '',
			showNullTitle: false
    }
  },
	
	onLoad(options) {
		this.trainId = decodeURIComponent(options.scene)
		console.log('trainId',this.trainId);
	},
	
	mounted() {
		const setCookie = uni.getStorageSync("setCookie")
		if(setCookie.length == 0) {
			uni.showToast({
				title: '请先登录',
				icon: 'error',
				duration: 3000
			})
		} else {
			this.getMeetingInfo()
		}
	},
	
	methods: {
		// 获取会议内容
		getMeetingInfo() {
			this.$request("/activity/trainadmin/selectById","POST",{
				trainId: this.trainId
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resMeetingInfo=> {
				if(resMeetingInfo == 'login' || (resMeetingInfo.code == 500 && resMeetingInfo.msg.includes("Authentication"))) {
					uni.setStorageSync('loginSuccess',false)
					uni.showToast({
						title: '登录已失效！',
						icon: 'error',
						duration: 3000
					})
						setTimeout(function() {
						uni.switchTab({
							url: "/pages/home/index",
							success:function(){
								let page = getCurrentPages().pop()
								if(!page) return
								page.onLoad()
							}
						})
						}, 2000);
					} else {
						if(resMeetingInfo.data) {
							this.$refs.popupCode.open()
							this.meetingInfo = resMeetingInfo.data
						} else {
							this.showNullTitle = true
						}
					}
			})
		},
		
		// 签到成功
		getTrainId() {
			this.$request("/system/trainuser/add","POST",{
				trainId: this.trainId
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resSuccess=> {
				if(resSuccess == 'login' || (resSuccess.code == 500 && resSuccess.msg.includes("Authentication"))) {
					uni.setStorageSync('loginSuccess',false)
					uni.showToast({
						title: '登录已失效！',
						icon: 'error',
						duration: 3000
					})
						setTimeout(function() {
						uni.switchTab({
							url: "/pages/home/index",
							success:function(){
								let page = getCurrentPages().pop()
								if(!page) return
								page.onLoad()
							}
						})
						}, 2000);
					} else {
						this.message = resSuccess.msg
						this.$refs.popupTitle.open()
					}
			})
		},
		
		close() {
			this.$refs.popupCode.close()
			uni.switchTab({
				url: '../home/index'
			})
		},
		
		confirm() {
			this.$refs.popupCode.close()
			this.getTrainId()
			setTimeout(function() {
				uni.switchTab({
					url: '../home/index'
				})
			},1000 * 5)
		}
	}
}
</script>

<style lang="scss" scoped>
.popup-class {
	min-width: 500rpx;
	max-width: 600rpx;
	margin: 40rpx;
}

.popup-title {
	font-size: 50rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 30rpx;
}

.but {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	button {
		width: 200rpx;
		margin: 0;
	}
}

.unfilled-log {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #E5E5E5;
	.unfilled-title {
		padding: 180rpx;
		background: #fff;
		border-radius: 50rpx;
	}
}

.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
}
</style>

<style>
	.uni-popup .uni-popup__wrapper {
		border-radius: 20rpx;
	}
</style>
