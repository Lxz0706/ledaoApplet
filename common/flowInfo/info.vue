<template>
  <view class="container">
		    <view class="flow-container">
		        <uni-forms ref="form" :modelValue="formData" :rules="rules" label-width="100">
							<view class="bgcolor">基础信息</view>
							<uni-forms-item label="档案ID" name="applyId" v-show="false">
									<uni-easyinput v-model="formData.applyId" type="text" />
							</uni-forms-item>
							<uni-forms-item label="出/入库" name="applyType" v-show="false">
									<uni-easyinput v-model="formData.applyType" type="text" />
							</uni-forms-item>
							<uni-forms-item label="公司名称id" name="companyName" v-show="false">
							    <uni-easyinput v-model="formData.companyName" type="text" />
							</uni-forms-item>
								<uni-forms-item label="档案类别" name="documentTypeLab">
										<uni-easyinput :disabled="basicInfoDis" v-model="formData.documentTypeLab" type="text" />
								</uni-forms-item>
		            <uni-forms-item label="项目名称" name="projectName" v-if="isShowProjectName">
		                <uni-easyinput :disabled="basicInfoDis" v-model="formData.projectName" type="text" />
		            </uni-forms-item>
		            <uni-forms-item label="公司名称" name="companyNameLab">
		                <uni-easyinput :disabled="basicInfoDis" v-model="formData.companyNameLab" type="text" />
		            </uni-forms-item>
								<uni-forms-item v-if="formData.documentType === '0'" label="债务人名称" name="debtorName">
								    <uni-easyinput :disabled="basicInfoDis" v-model="formData.debtorName" type="text" />
								</uni-forms-item>
								<uni-forms-item label="实际提交人" name="applyUserName">
								    <uni-easyinput :disabled="basicInfoDis" v-model="formData.applyUserName" type="text" />
								</uni-forms-item>
								<!-- 出库申请字段 -->
								<view class="out" v-if="formData.applyType == 1">
									<uni-forms-item label="是否归还" name="isReturn">
										<uni-easyinput v-if="formData.isReturn == ''" value="" disabled type="text" />
									  <uni-easyinput v-else :value="formData.isReturn === '0' ? '是' : '否'" disabled type="text" />
									</uni-forms-item>
									<uni-forms-item name="isOut" label="已出库">
										<picker v-if="documentAdmin && statu == 0" :value="formData.isOut" :range="rangeIsOut" @change="bindPickerChangeIsOut">
											<view class="uni-input">{{formData.isOut == '' ? "请选择" : rangeIsOut[formData.isOut]}}</view>
										</picker>
										<uni-easyinput v-else :value="formData.isOut === '0' ? '是' : '否'" disabled type="text" />
									</uni-forms-item>
									<uni-forms-item name="isReceive" label="已收到">
										<uni-easyinput v-if="formData.isReceive == ''" value="" disabled type="text" />
										<uni-easyinput v-else :value="formData.isReceive === '0' ? '是' : '否'" disabled type="text" />
										<!-- <picker :value="formData.isReceive" :range="rangeIsReceive" disabled @change="bindPickerChangeIsReceive">
											<view class="uni-input">{{formData.isReceive == null ? "请选择" : rangeIsReceive[formData.isReceive]}}</view>
										</picker> -->
									</uni-forms-item>
									<uni-forms-item name="isReturned" label="已还">
										<uni-easyinput v-if="formData.isReturned == ''" value="" disabled type="text" />
										<uni-easyinput  v-else :value="formData.isReturned === '0' ? '是' : '否'" disabled type="text" />
										<!-- <picker :value="formData.isReturned" :range="rangeIsReturned" disabled @change="bindPickerChangeIsReturned">
											<view class="uni-input">{{formData.isReturned == null ? "请选择" : rangeIsReturned[formData.isReturned]}}</view>
										</picker> -->
									</uni-forms-item>
									<uni-forms-item name="isReceived" label="归还接受">
										<picker v-if="documentAdmin && statu == 1 && approveStatuFlag" :value="formData.isReceived" :range="rangeIsReceived" @change="bindPickerChangeIsReceived">
											<view class="uni-input">{{formData.isReceived == '' ? "请选择" : rangeIsReceived[formData.isReceived]}}</view>
										</picker>
										<uni-easyinput v-else :value="formData.isReceived === '0' ? '是' : '否'" disabled type="text" />
									</uni-forms-item>
									<uni-forms-item label="计划归还时间" name="planReturnTime">
										<uni-easyinput disabled v-model="formData.planReturnTime" type="text" />
											<!-- <uni-datetime-picker disabled v-model="formData.planReturnTime" type="date" @change="change" /> -->
									</uni-forms-item>
									<uni-forms-item label="实际归还时间" name="realReturnTime">
									    <uni-easyinput disabled v-model="formData.realReturnTime" type="text" />
									</uni-forms-item>
									<uni-forms-item label="出库原因" name="outReason">
									    <uni-easyinput disabled v-model="formData.outReason" type="text" />
									</uni-forms-item>
								</view>
								<!--    end -->
								<uni-forms-item label="备注" name="remarks">
								    <uni-easyinput :disabled="basicInfoDis" v-model="formData.remarks" type="text" />
								</uni-forms-item>
		        </uni-forms>
						<view class="bgcolor">档案明细</view>
						<view class="file-info">
							<uni-list v-for="(item,index) in fileList" class="uni-list" :key="index">
								<uni-list-item link="navigateTo" @click="fileInfoClick($event,item)">
									<template slot="body">
										<view class="slot-box slot-text lable-title">档案名称：{{item.fileName}}</view>
										<view class="slot-box slot-text lable-title">份数：{{item.counts + ' 份'}}</view>
										<view class="slot-box slot-text lable-title">页数(时长)：{{item.pages + ' 页(时)'}}</view>
										<!-- <view class="slot-box slot-text">类型：{{item.leix}}</view> -->
									</template>
								</uni-list-item>
							</uni-list>
						</view>
						<!-- step审批流 -->
						<view class="steps" v-if="statu !== '0'">
							<view class="bgcolor">操作详情</view>
								<uni-steps 
								:options="stepOption"
								direction="column"
								:active="active">
								</uni-steps>
							</view>
							<!-- footer -->
							<view class="footer">
								<button v-if="statu == 0" type="primary" @click="submit(6)">通过</button>
								<button v-if="statu == 0" type="warn" @click="submit(2)">驳回</button>
								<button v-if="!(statu == 0) && documentAdmin && approveStatuFlag" type="primary" @click="successClick">确定</button>
							</view>
		    </view>
				<!-- 弹框 -->
				<view class="modal">
					<modal v-if="showPop" title="审批意见" confirm-text="确定" cancel-text="取消" @cancel="cancelPop" @confirm="confirmPop"> 
						<input type='text' placeholder="请输入审批意见..." v-model="contentPop" />
					</modal>
				</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-1 2:29:52 ?F10: PM?
* description   
*/


export default {
  name: 'info',
  data () {
    return {
			// 简单信息表单数据
      formData: {
				
			},
			rangeIsOut: ['是','否'],
			rangeIsReceive: ['是','否'],
			rangeIsReturned: ['是','否'],
			rangeIsReceived: ['是','否'],
			rules: {
    },
		stepOption:[],
		fileList: [],
		applyId: '',
		applyType: '',
		isShowProjectName: false,
		statu: '',
		active: '',
		flagEdit: false,
		flagSuccess: false,
		basicInfoDis: false,
		documentType: '',
		documentAdmin: false,
		approveStatuFlag: false,
		showPop:false, //弹窗
		contentPop: '',
		num: ''
  }
},

	onShow() {
		this.getFileList()
	},

	onLoad(options) {
		const op = JSON.parse(options.item)
		this.statu = options.statu
		console.log('options',op)
		this.formData = op
		this.applyId = op.applyId
		this.applyType = op.applyType
		this.documentType = op.documentType
		this.approveStatu = op.approveStatu
		if(op.documentType == 0) {
			this.isShowProjectName = true
		}
		if(this.approveStatu == '已发送归还申请') {
			this.approveStatuFlag = true
		}
		uni.showLoading({
			title: '加载中...'
		})
		setTimeout(function(){
			uni.hideLoading()
		},1000 * 2)
		console.log('------------',this.formData)
	},
	
	mounted() {
		this.documentAdmin = uni.getStorageSync("documentAdmin")
		this.init()
	},
	
	methods: {
		// 初始化
		init() {
			if(this.statu == 0) {
				this.basicInfoDis = true
			} else if(this.statu == 1) {
				this.basicInfoDis = true
			} else {
				this.basicInfoDis = true
			}
			this.getFileList()
			this.getHistoryList()
		},

		// 获取档案列表
		getFileList() {
			this.$request('/applyIn/listDocument',"POST",{
				applyId: this.applyId,
				applyType: this.applyType
			},{
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(res=> {
			this.fileList = res.rows
			})
		},
		
		// 获取审批流列表
		getHistoryList() {
			this.$request('/applyIn/applyProcess/historyProcessLit',"POST",{
				applyId: this.applyId
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(res=> {
				this.stepOption = res.data
				this.stepOption.map((item)=> {
					this.$set(item, 'title', item.approveUserName)
					this.$set(item, 'desc', item.createTime)
				})
				this.active = res.data.length
				console.log('getHistoryList',this.stepOption)
			})
		},

		submit(val) {
			this.showPop = true
			this.num = val
		},
		// 审批按钮确定
		confirmPop() {
			if(this.contentPop == '') {
				uni.showToast({
					title: '请输入审批意见',
					icon: 'error'
				})
			} else {
				uni.showLoading({
					title: '加载中...'
				})
				this.$refs.form.validate().then(res=>{
					this.$request("/applyIn/edit","POST",{
						...res
					},{
						"content-type": "application/x-www-form-urlencoded",
						'cookie': uni.getStorageSync("setCookie")
					}).then(res=> {
						console.log('修改信息',res);
						if(res.code === 0) {
							this.flagEdit = true
							this.$request("/applyIn/applyEditSave","POST",{
								applyId: this.applyId,
								approveStatu: this.num,
								applyType: this.applyType,
								remarks: this.contentPop
							}, {
								"content-type": "application/x-www-form-urlencoded",
								'cookie': uni.getStorageSync("setCookie")
							}).then(res=> {
								if(res.code == 0) {
									this.flagSuccess = true
									uni.showToast({
										title: res.msg,
										icon: 'success',
										mask: true
									})
									if(this.flagEdit && this.flagSuccess) {
										this.showPop = false
										uni.switchTab({
											url: '../../pages/workFlow/index',
											success:function(e){
												var page = getCurrentPages().pop();
												if (page == undefined || page == null) return;
												page.onShow();
											}
										})
									}
									uni.hideLoading()
								} else if(res.code == 500) {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										mask: true
									})
									uni.hideLoading()
								}
							})
						}
					})
				})
			}
		},
		//取消
		cancelPop() {  
			this.contentPop = ''
			this.showPop = false
		},
		// 已发送归还申请 确定按钮
		successClick() {
			this.$refs.form.validate().then(res=>{
				this.$request("/applyIn/edit","POST",{
					...res
				}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(res=> {
					if(res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							mask: true
						})
						uni.switchTab({
							url: '../../pages/workFlow/index',
							success:function(e){
								var page = getCurrentPages().pop();
								if (page == undefined || page == null) return;
								page.onShow();
							}
						})
					}
				})
			})
		},
		// 已出库
		bindPickerChangeIsOut(e) {
			this.formData.isOut = e.target.value
		},
		// 已收到
		bindPickerChangeIsReceive(e) {
			this.formData.isReceive = e.target.value
		},
		// 已还
		bindPickerChangeIsReturned(e) {
			this.formData.isReturned = e.target.value
		},
		// 归还接受
		bindPickerChangeIsReceived(e) {
			this.formData.isReceived = e.target.value
		},
		
		fileInfoClick(e,val) {
				const fileObjectVal = JSON.stringify(val)
				uni.navigateTo({
					url: '../../common/fileInfo/file?item=' + fileObjectVal + '&documentType=' + this.documentType + '&applyType=' + this.applyType + '&statu=' + this.statu + '&companyName=' + this.formData.companyNameLab + '&projectName=' + this.formData.projectName
				})
				console.log('flow',e)
				console.log('flow',val)
		}
	}
}
</script>

<style lang="scss" scoped>

.file-info {
	max-height: 30vh;
	overflow: scroll;
}

.flow-container {
	margin: 0 40rpx;
}

.footer {
	display: flex;
	flex-direction: row;
	margin: 40rpx 0;
	justify-content: center;
	button {
		width: 300rpx;
	}
}

.disabledClass {
	
}
</style>

<style>
	@import url("@/css/index.css");
</style>
