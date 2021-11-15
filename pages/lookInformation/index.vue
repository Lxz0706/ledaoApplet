<template>
  <view class="lookContainer">
		<view class="title flex">
			<span class="text">基础信息</span>
			<span class="btn" @click="InClick">入库信息查看</span>
		</view>
		<view class="basic-info">
			<uni-forms ref="form" :modelValue="baseInfo" label-width="100">
				<uni-forms-item label="公司名称" name="companyName">
						<uni-easyinput disabled v-model="baseInfo.companyName" type="text" />
				</uni-forms-item>
				<uni-forms-item label="项目名称" name="projectName">
						<uni-easyinput disabled v-model="baseInfo.projectName" type="text" />
				</uni-forms-item>
				<uni-forms-item label="实际提交者" name="applyUserName">
						<uni-easyinput disabled v-model="inInfo.applyUserName" type="text" />
				</uni-forms-item>
				<uni-forms-item label="项目所属部门" name="roleType">
						<uni-easyinput disabled v-model="inInfo.roleType" type="text" />
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
						<uni-easyinput disabled v-model="inInfo.remarks" type="text" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="file-details">
			<view class="title">档案明细</view>
			<view class="detailInfo" @click="fileInfoClick">
				<view class="list-text">
					<view>档案名称：{{baseInfo.fileName == undefined ? '-' : baseInfo.fileName}}</view>
					<view>份数：{{baseInfo.counts == undefined ? '-' : baseInfo.counts}}</view>
					<view>页数(时长)：{{baseInfo.pages == undefined ? '-' : baseInfo.pages}}</view>
					<view>档案级别： {{baseInfo.documentLevelLable == undefined ? '-' : baseInfo.documentLevelLable}}</view>
				</view>
				<view class="icon"><uni-icons type="arrowright" size="24"></uni-icons></view>
			</view>
		</view>
		<view class="footer"></view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-9 4:27:42 ?F10: PM?
* description  
* 二维码进入查看档案入库出库	基本信息
*/


export default {
  name: 'lookInformation',
  data () {
    return {
			// 基本信息
			baseInfo: {},
			// 出库信息list
			outInfo: [],
			// 入库信息
			inInfo: {},
			documentId: ''
    }
  },
	
	onLoad(options) {
		this.documentId = decodeURIComponent(options.scene)
		console.log('二维码进入查看档案入库出库	基本信息---',this.documentId)
	},
	
	mounted() {
		const setCookie = uni.getStorageSync("setCookie")
		if(setCookie.length == 0) {
			uni.showToast({
				title: '请先登录',
				icon: 'error',
				duration: 3000
			})
		} else {
			this.getListInOutDetail()
		}
	},
	
	methods: {
		getListInOutDetail() {
			uni.showLoading({
				title: '加载中...'
			})
			this.$request('/applyIn/listInOutDetail', 'POST', {
				documentId: this.documentId
			}, {
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resList => {
				console.log('resList',resList)
				if(resList == 'login' || (resList.code == 500 && resList.msg.includes("Authentication"))) {
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
						if(resList.code != 500) {
							this.baseInfo = resList.data.baseInfo
							this.outInfo = resList.data.outInfo
							this.inInfo = resList.data.inInfo
							setTimeout(()=> {
								uni.hideLoading()
							},3000)
						} else {
							uni.showToast({
								title: '未搜索到相关信息！',
								icon: 'error'
							})
						}
					}
			})
		},
		// 出库档案明细
		fileInfoClick() {
			const fileOut = JSON.stringify(this.outInfo)
			uni.navigateTo({
				url: 'processOut/processOutList?item=' + fileOut
			})
		},
		// 入库信息查看
		InClick() {
			const fileIn = JSON.stringify(this.inInfo)
			const dailyItem = this.baseInfo.documentType == '1' ? this.baseInfo.dailyDocumentTypeLable : this.baseInfo.dailyDocumentTypeContractLable
			uni.navigateTo({
				url: 'processIn/processIn?item=' + fileIn + '&dailyItem=' + dailyItem
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

.flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.line {
	height: 2rpx;
	background-color: #E5E5E5;
	margin: 20rpx 0;
}

.btn {
	background-color: #12adf7;
	border-radius: 25px;
	font-size: 25rpx;
	padding: 5px;
}

.text {
	margin-right: 135rpx;
	flex: 1;
	text-align: right;
}

.basic-info {
	margin: 0 30rpx;
}

.detailInfo {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0 30rpx;
		view {
			margin: 10rpx 0;
		}
}

.footer {
	height: 100rpx;
}
</style>

<style>
	@import url("@/css/index.css");
</style>
