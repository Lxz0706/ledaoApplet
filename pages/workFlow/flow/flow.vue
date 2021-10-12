<template>
  <view class="flow-list">
		<uni-list v-for="(item,index) in toDoList" :key="index">
				<uni-list-item link="navigateTo" @click="onClick($event,item,statu)" >
					<template slot="body">
						<view class="slot-box slot-text lable-text">{{item.applyTypeName}}</view>
						<view class="slot-box slot-text lable-title" v-if="statu == 3">申请人：{{item.applyUserName}}</view>
						<view class="slot-box slot-text lable-title" v-if="item.documentType == 0">项目名称：{{item.projectName}}</view>
						<view class="slot-box slot-text lable-title">公司名称：{{item.companyNameLab}}</view>
						<view class="slot-box slot-text lable-title">测试备注：{{item.remarks}}</view>
						<!-- <view class="slot-box slot-text" v-if="item.applyType == 1">是否归还：{{item.isOut}}</view> -->
						<view v-if="statu == 1" class="slot-box slot-text lable-title">审批结果：{{item.approveStatu}}</view>
					</template>
				</uni-list-item>
				<view class="line"></view>
		</uni-list>
		
		<view v-if="isShowTitle">没有更多了</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-1 11:41:50 ?F10: AM?
* description   
* applyType =>  0:入库申请 1:出库申请
* statu => 0 我的待办，statu 1 我的已办  statu 2 我的申请
* documentType => 0 日常经营类 1 业务类
*/

import loadMore from "../../../common/load-more.vue"
export default {
  name: 'flow',
  data () {
    return {
			toDoList: [],
			isShowTitle: false,
			loadMoretext: ''
		}
  },
	
	components: {
		loadMore
	},
	
	props:{
		statu: {
			type:String,
			default: ''
		}
	},
	
	watch: {
		statu(newVal, oldVal) {
			this.getFlowList()
		}
	},
	
	onShow() {
		// this.getFlowList()
		console.log('flowonShow')
	},
	
	mounted() {
		this.init()
	},
	
	methods: {
		init() {
			this.getFlowList()
		},

		onClick(e,val,statu) {
			var objectVal = JSON.stringify(val)
			uni.navigateTo({
				url: '/common/flowInfo/info?item=' + objectVal + '&statu=' + statu
			})
			console.log('flow',e)
			console.log('flow',val)
		},
		
		getFlowList () {
			const _this = this
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			this.$request("/applyIn/listWorkApplet","POST",{
				type: _this.statu
			},{
				"content-type": "application/x-www-form-urlencoded",
				"cookie": uni.getStorageSync('setCookie')
			}).then(res => {
				if(res.code == 0) {
					if(res.rows.length > 0) {
						_this.toDoList = res.rows
						_this.isShowTitle = false
					} else {
						_this.toDoList = []
						_this.isShowTitle = true
						uni.showToast({
							icon: 'error',
							position: 'bottom',
							title: '没有更多了'
						});
					}
				}
				setTimeout(()=> {
					uni.hideLoading()
				},3000)

				console.log('toDoList',this.toDoList)
				this.flag = true
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.line {
	background-color: #E5E5E5;
	height: 30rpx;
}
</style>

<style>
	@import url("@/css/index.css");
</style>
