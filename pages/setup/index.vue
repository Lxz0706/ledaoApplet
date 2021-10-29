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
      isChecked: uni.getStorageSync('isDailyRemind') !== 'n' ? true : false
    }
  },
	
	mounted() {
		
	},
	
	methods:{
		switchChange(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value)
			this.$request('/system/user/editUser',"POST",{
				isDailyRemind: this.isChecked ? 'n' : 'y'
			},{
				"content-type": "application/x-www-form-urlencoded",
				"cookie": uni.getStorageSync('setCookie')
			}).then(switchRes=> {
				if(this.isChecked) {
					uni.setStorageSync('isDailyRemind','n')
				} else {
					uni.setStorageSync('isDailyRemind','y')
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
