<template>
  <view class="processIn">
		<view class="line"></view>
    <uni-forms ref="form" :modelValue="processInInfo" label-width="100">
			<uni-forms-item label="档案类别" name="documentType">
					<uni-easyinput disabled v-model="processInInfo.documentTypeLab" type="text" />
			</uni-forms-item>
			<uni-forms-item label="种类" name="dailyItem" v-if="processInInfo.documentType != 0">
					<uni-easyinput disabled v-model="dailyItem" type="text" />
			</uni-forms-item>
			<uni-forms-item label="公司名称" name="companyName">
					<uni-easyinput disabled v-model="processInInfo.companyNameLab" type="text" />
			</uni-forms-item>
    	<uni-forms-item label="项目名称" name="projectName">
    			<uni-easyinput disabled v-model="processInInfo.projectName" type="text" />
    	</uni-forms-item>
    	<uni-forms-item label="债务人名称" name="debtorName">
    			<uni-easyinput disabled v-model="processInInfo.debtorName" type="text" />
    	</uni-forms-item>
    	<uni-forms-item label="实际提交人" name="applyUserName">
    			<uni-easyinput disabled v-model="processInInfo.applyUserName" type="text" />
    	</uni-forms-item>
			<uni-forms-item label="申请时间" name="applyTime">
					<uni-easyinput disabled v-model="processInInfo.applyTime" type="text" />
			</uni-forms-item>
    </uni-forms>
		
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
* time          2021-9-9 7:43:20 ?F10: PM?
* description   
* 入库信息
*/


export default {
  name: 'processIn',
  data () {
    return {
      processInInfo: {},
			stepOption:[],
			active: '',
			dailyItem: ''
    }
  },
	
	onLoad(options) {
		const file = JSON.parse(options.item)
		console.log('file',file)
		this.processInInfo = file
		this.dailyItem = options.dailyItem
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
				applyId: this.processInInfo.applyId
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
.processIn {
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
