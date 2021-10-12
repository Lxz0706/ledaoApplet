<template>
  <view class="manage-container ct-bg">
		<view class="line"></view>
		<view class="list">
			<view class="curstomer-list" v-for="(item,index) in manageList" :key="index" @click="curstomerListClick(index)">
				<view class="curstomer-list-img">
					<image class="icon_tu" :src="item.icon + '.svg'"></image>
				</view>
				<view class="curstomer-lit-text">
					<view class="icon_title">{{item.text}}</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-5 10:01:07 ?F10: AM?
* description   
*/


export default {
  name: 'curstomer',
  data () {
    return {
      manageList: [
				{
					text: "客户信息录入",
					icon: "/static/icon/cus-edit"
				},
				{
					text: "客户信息查看",
					icon: "/static/icon/journal-look"
				}
			],
			menuId: ''
    }
  },
	
	methods: {
		curstomerListClick(index) {
			console.log(index)
			if(index == 0) {
				uni.navigateTo({
					url: 'addCurstomer/addAndEdit'
				})
				this.menuId = '3'
			} else {
				uni.navigateTo({
					url: 'addCurstomer/addAndList'
				})
				this.menuId = '4'
			}
			this.$request("/system/oper/add","POST",{
				menuId: this.menuId
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-direction: row;
	background-color: #fff;
	margin: 30rpx;
	border-radius: 40rpx;
	height: 30vh;
	.curstomer-list {
		width: 180rpx;
		text-align: center;
		margin-top: 30rpx;
		.curstomer-list-img {
			.icon_tu {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
}

.line {
	height: 30rpx;
	background-color: #fff;
	margin: 0 0 30rpx 0;
}
</style>

<style>
			@import url("@/css/index.css");
</style>
