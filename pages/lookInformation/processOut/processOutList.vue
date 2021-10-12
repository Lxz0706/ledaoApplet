<template>
  <view class="outInfo-container">
		<view class="title">出库明细</view>
		<view class="outinfo-list">
			<view class="outInfo-title" v-if="outInfoList.length == 0">无出库信息</view>
			<uni-list v-for="(item,index) in outInfoList" :key="index">
				<uni-list-item link="navigateTo" @click="fileInfoClick($event,item)" >
					<template slot="body">
						<view class="slot-box slot-text">出库人：{{item.applyUserName}}</view>
						<view class="slot-box slot-text">申请时间：{{item.applyTime}}</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-23 10:10:20 ?F10: AM?
* description   
*/


export default {
  name: 'processOutList',
  data () {
    return {
      outInfoList: []
    }
  },
	
	onLoad(options) {
		const file = JSON.parse(options.item)
		this.outInfoList = file
			this.outInfoList.map(item=> {
				if(item.applyTime == null) {
					item.applyTime = '-'
				}
			})
	},
	
	methods: {
		fileInfoClick(e,val) {
			const fileObjectVal = JSON.stringify(val)
			uni.navigateTo({
				url: 'processOut?item=' + fileObjectVal
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 40rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 30rpx;
	background-color: #E5E5E5;
	padding: 16rpx 0;
}

.outInfo-title {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70vh;
	margin: 60rpx;
	background-color: #e5e5e5;
	border-radius: 40rpx;
}
</style>
