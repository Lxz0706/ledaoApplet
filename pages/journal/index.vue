<template>
	<view class="manage-container ct-bg">
		<view class="line"></view>
		<view class="list">
			<view class="curstomer-list" v-for="(item,index) in manageList" :key="index" @click="clickToPage(index)">
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
					text: "日志录入",
					icon: '/static/icon/journal-add'
				},
				{
					text: "日志查看",
					icon: "/static/icon/journal-look"
				}
			]
    }
  },
  mounted() {
	  console.log(1)
  },
	methods: {
		clickToPage(e) {
			console.log("22")
			console.log(e)
			if(e === 0) {
				uni.navigateTo({
					url: '/common/journalInfo/journal?isChat=0'
				})
				// this.menuId = '1'
			} else {
				uni.navigateTo({
					url: '/common/journalInfo/journalDepart'
				})
				// this.menuId = '2'
			}
			// 快捷入口操作习惯
			// this.$request('/system/oper/add',"POST",{
			// 	menuId: this.menuId
			// },{
			// 	"content-type": "application/x-www-form-urlencoded",
			// 	'cookie': uni.getStorageSync("setCookie")
			// })
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
