<template>
  <view class="qr-code">
    <view class=""></view>
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
      trainId: ''
    }
  },
	
	onLoad(options) {
		this.trainId = options.trainId;
		console.log('trainId',trainId);
	},
	
	mounted() {
		const setCookie = uni.getStorageSync("setCookie")
		if(setCookie.length == 0) {
			uni.showToast({
				title: '请先登录',
				icon: 'error'
			})
		} else {
			this.getTrainId()
		}
	},
	
	methods: {
		getTrainId() {
			this.$request("/system/trainuser/add","POST",{
				trainId: this.trainId //测试数据 id=14
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resSuccess=> {
				uni.showToast({
					title: resSuccess.msg,
					icon: 'success'
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
