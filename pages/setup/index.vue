<template>
  <view class="set-up">
		<view class="item">
			<view class="title">日志提醒<span class="title-tip">&nbsp;工作日21：00</span></view>
			<view class="switch">
				<switch :checked="isChecked" @change="switchChange" color="#3388EC" />
			</view>
		</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-24 11:09:23 ?F10: AM?
* description   
*/


export default {
  name: '',
  data () {
    return {
      isChecked: uni.getStorageSync('isDailyRemind') != 'n' ? true : false
    }
  },
	
	mounted() {
		
	},
	
	methods:{
		switchChange(e) {

			this.isChecked = e.target.value
						console.log(this.isChecked)
			console.log('switch1 发生 change 事件，携带值为', e.target.value)
			this.$request('/system/user/editUser',"POST",{
				isDailyRemind: this.isChecked ? 'y' : 'n'
			},{
				"content-type": "application/x-www-form-urlencoded",
				"cookie": uni.getStorageSync('setCookie')
			}).then(switchRes=> {
				if(switchRes == 'login' || (switchRes.code == 500 && switchRes.msg.includes("Authentication"))) {
					uni.setStorageSync('loginSuccess',false)
					setTimeout(function() {
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
						},3000)
					}, 1000);
					} else {
						if(this.isChecked) {
							uni.setStorageSync('isDailyRemind','y')
						} else {
							uni.setStorageSync('isDailyRemind','n')
						}
					}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20rpx;
}

.title-tip {
 font-size: 14px;
 color: #C0C0C0;
 margin-left: 10px;
}
</style>
