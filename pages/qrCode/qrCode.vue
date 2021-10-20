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
			meetingInfo: {}
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
			this.$refs.popupCode.open()
			this.$request("/activity/trainadmin/selectById","POST",{
				trainId: this.trainId
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resMeetingInfo=> {
					this.meetingInfo = resMeetingInfo.data
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
				uni.showToast({
					title: resSuccess.msg,
					icon: 'success',
					duration: 3000
				})
			})
		},
		
		close() {
			this.$refs.popupCode.close()
			uni.switchTab({
				url: '../home/index'
			})
		},
		
		confirm() {
			this.getTrainId()
			this.$refs.popupCode.close()
			setTimeout(function() {
				uni.switchTab({
					url: '../home/index'
				})
			},1000 * 3)
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
</style>

<style>
	.uni-popup .uni-popup__wrapper {
		border-radius: 20rpx;
	}
</style>
