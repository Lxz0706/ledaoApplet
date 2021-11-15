<template>
  <view class="processContainer">
		<view class="line"></view>
		<view class="process-info">
			<uni-forms ref="form" :modelValue="processInfo" label-width="100">
				<uni-forms-item label="出库人" name="applyUserName">
						<uni-easyinput disabled v-model="processInfo.applyUserName" type="text" />
				</uni-forms-item>
				<uni-forms-item label="是否归还" name="isReturn">
						<uni-easyinput disabled v-model="processInfo.isReturn" type="text" />
				</uni-forms-item>
				<uni-forms-item label="已出库" name="isOut">
						<uni-easyinput disabled v-model="processInfo.isOut" type="text" />
				</uni-forms-item>
				<uni-forms-item label="已收到" name="isReceive">
						<uni-easyinput disabled v-model="processInfo.isReceive" type="text" />
				</uni-forms-item>
				<uni-forms-item label="已还" name="isReturned">
						<uni-easyinput disabled v-model="processInfo.isReturned" type="text" />
				</uni-forms-item>
				<uni-forms-item label="归还接受" name="isReceived">
						<uni-easyinput disabled v-model="processInfo.isReceived" type="text" />
				</uni-forms-item>
				<uni-forms-item label="出库原因" name="outReason">
						<uni-easyinput disabled v-model="processInfo.outReason" type="text" />
				</uni-forms-item>
				<uni-forms-item label="计划归还时间" name="planReturnTime">
						<uni-easyinput disabled v-model="processInfo.planReturnTime" type="text" />
				</uni-forms-item>
				<uni-forms-item label="实际归还时间" name="realReturnTime">
						<uni-easyinput disabled v-model="processInfo.realReturnTime" type="text" />
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
						<uni-easyinput disabled v-model="processInfo.remarks" type="text" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<!-- step审批流 -->
    <view class="process-step">
			<view class="bgcolor">操作详情</view>
			<view v-if="stepOption.length == 0">无审批记录</view>
				<uni-steps 
				:options="stepOption"
				direction="column"
				:active="active">
				</uni-steps>
		</view>
		<view class="footer"></view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-9 6:44:12 ?F10: PM?
* description   
*/


export default {
  name: 'processOut',
  data () {
    return {
      processInfo: {},
			stepOption:[],
			active: ''
    }
  },
	
	onLoad(options) {
		const file = JSON.parse(options.item)
		this.processInfo = file
		console.log('options的信息=====',this.processInfo)
	},
	
	mounted() {
		this.getWorkflowList()
	},
	
	methods: {
		// 获取审批流列表
		getWorkflowList() {
			uni.showLoading({
				title: '加载中...'
			})
			this.$request('/activity/workflow/list',"POST",{
				applyId: this.processInfo.applyId // 781
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(res=> {
				console.log('res',res)
				if(res == 'login' || (res.code == 500 && res.msg.includes("Authentication"))) {
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
						this.stepOption = res.rows
						this.stepOption.map((item)=> {
							this.$set(item, 'title', item.approveUserName)
							this.$set(item, 'desc', item.createTime)
						})
						this.active = res.rows.length
						uni.hideLoading()
						console.log('getHistoryList',this.stepOption)
					}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.process-info {
	margin: 0 30rpx;
}

.line {
	background-color: #fff;
	height: 30rpx;
}

.footer {
	height: 100rpx;
}
</style>

<style>
		@import url("@/css/index.css");
</style>
