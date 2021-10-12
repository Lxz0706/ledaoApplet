<template>
  <view class="">
		<view class="bg">
		    <view class="headIcon">
		      <image src="../../static/icon/ledao.png" style="width:70px;height:70px;"></image>
		    </view>
		    <view class="login">
		      {{userName}}
		    </view>
		</view>
		
		<view class="line"></view>
		<view class="item" @click="setUp">
		  <view class="title">设置</view>
		  <view class="detail2">
		    <text> ></text>
		  </view>
		</view>
		<view class="line"></view>
		<view class="outLogin" v-if="setCookie.length>0" @click="outLoginClick">退出登录</view>
  </view>
	
</template>

<script>
/**
* author        chenjie
* time          2021-9-1 10:02:54 ?F10: AM?
* description   
*/


export default {
  name: '',
  data () {
    return {
      userName: '',
			setCookie: ''
    }
  },
	
	mounted() {
		const that = this
		that.userName = uni.getStorageSync('userName')
		that.setCookie = uni.getStorageSync('setCookie')
	},
	
	methods:{
		login() {
			// uni.switchTab({
			// 	url: "/pages/home/index"
			// })
			
			uni.switchTab({
				url: '/pages/home/index',
				success:function(e){
					var page = getCurrentPages().pop();
					if (page == undefined || page == null) return;
					page.onLoad();
				}
			})
		},
		
		outLoginClick(){
			this.$request("/weChatLoginOut","POST",{},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			})
			// uni.removeStorageSync('setCookie');
			this.userName = "";
			// uni.removeStorageSync('userName')
			// uni.removeStorageSync('getOpenids')
			// uni.removeStorageSync('getUnionId')
			uni.clearStorage()
			this.login()
		},
		
		setUp() {
			uni.navigateTo({
				url: '/pages/setup/index'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.bg {
  height: 300rpx;
  background-color: #3388EC;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.headIcon {
  display: flex;
  justify-content: center;
}

.login {
  display: flex;
  color: #fff;
  font-size: 15px;
  margin-top: 15rpx;
  justify-content: center;
}

.button {
  margin: 10px;
  font-size: 14px;
}

.bg image {
  border-radius: 50%;
	background-color: #fff;
}

.item {
  display: flex;
  flex-direction: row;
}

.title {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  font-size: 15px;
}

.detail2 {
  font-size: 15px;
  position: absolute;
  right: 10px;
  height: 50px;
  line-height: 50px;
  color: #888;
}

.line {
  width: 100%;
  height: 30rpx;
  background-color: #E5E5E5;
}

.outLogin{
	display: flex;
	background-color: #3388EC;
	margin: 80rpx 75rpx;
	color: #FFFFFF;
	justify-content: center;
	height: 44px;
	line-height: 44px;
	border-radius: 22px;
}

</style>
