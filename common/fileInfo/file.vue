<template>
  <view class="fileInfoContainer">
     <uni-forms ref="formDataFile" :modelValue="formDataFile" :rules="rules">
			 <uni-forms-item label="applyId" name="applyId" v-show="false">
			     <uni-easyinput type="text" v-model="formDataFile.applyId" />
			 </uni-forms-item>
			 <uni-forms-item label="documentId" name="documentId" v-show="false">
			     <uni-easyinput type="text" v-model="formDataFile.documentId" />
			 </uni-forms-item>
			 <uni-forms-item label="日常经营类种类id" name="dailyDocumentType" v-show="false">
			     <uni-easyinput type="text" v-model="formDataFile.dailyDocumentType" />
			 </uni-forms-item>
			 <uni-forms-item label="合同类种类id" name="dailyDocumentTypeContract" v-show="false">
			     <uni-easyinput type="text" v-model="formDataFile.dailyDocumentTypeContract" />
			 </uni-forms-item>
<!-- 			 <uni-forms-item label="documentStatu" name="documentStatu" v-show="false">
			     <uni-easyinput type="text" v-model="formDataFile.documentStatu" />
			 </uni-forms-item> -->
			 <!-- 项目类 -->
			 <view v-if="documentType == 0">
				 <uni-forms-item label="项目名称" name="projectName">
						 <uni-easyinput type="text" disabled v-model="formDataFile.projectName" />
				 </uni-forms-item>
				 <uni-forms-item label="资产编号" name="assetNumber">
						 <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.assetNumber" />
				 </uni-forms-item>
				 <uni-forms-item label="合同编号" name="contractNo">
						 <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.contractNo" />
				 </uni-forms-item>
			 </view>
			 <!-- end -->
			 <!-- 日常经营类 -->
			 <view v-if="documentType !== '0'">
				 <uni-forms-item label="公司名称" name="companyName">
				     <uni-easyinput type="text" disabled v-model="formDataFile.companyName" />
				 </uni-forms-item>
				 <uni-forms-item label="种类" :name="documentType == 1 ? 'dailyDocumentTypeLable' : 'dailyDocumentTypeContractLable'">
					 <uni-easyinput v-if="documentType == 1" type="text" disabled v-model="formDataFile.dailyDocumentTypeLable" />
				   <uni-easyinput v-else type="text" disabled v-model="formDataFile.dailyDocumentTypeContractLable" />
				 </uni-forms-item>
			 </view>
			 <!-- end -->
			 <uni-forms-item label="文件名称" name="fileName">
			     <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.fileName" />
			 </uni-forms-item>
			 <uni-forms-item required label="附件类型" name="fileTypeLable">
			     <uni-easyinput v-if="showInfo || !documentAdmin" type="text" disabled v-model="formDataFile.fileTypeLable" />
					 <picker v-else :value="formDataFile.fileType" :range="rangeFileType" @change="bindPickerChangeFileType">
					 	<view class="uni-input select-picker">{{formDataFile.fileType == '' || formDataFile.fileTypeLable == '' ? "请选择" : formDataFile.fileTypeLable}}</view>
					 </picker>
			 </uni-forms-item>
			 <uni-forms-item required v-if="showFileScan" label="扫描件类型" name="fileScanTypeLable">
			     <uni-easyinput v-if="showInfo" type="text" disabled v-model="formDataFile.fileScanTypeLable" />
					 <picker v-else :value="formDataFile.fileScanType" :range="rangeFileScanType" @change="bindPickerChangeFileScanType">
					 	<view class="uni-input select-picker">{{formDataFile.fileScanType == '' && formDataFile.fileScanTypeLable == '' ? "请选择" : formDataFile.fileScanTypeLable}}</view>
					 </picker>
			 </uni-forms-item>
			 <uni-forms-item required label="份数" name="counts">
			     <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.counts" />
			 </uni-forms-item>
			 <uni-forms-item required label="页数/时长" name="pages">
			     <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.pages" />
			 </uni-forms-item>	
			 <view v-if="documentAdmin">
				 <uni-forms-item required label="档案状态" name="documentStatuLable">
				     <uni-easyinput v-if="showInfo" type="text" disabled v-model="formDataFile.documentStatuLable" />
						 <picker v-else :value="formDataFile.fileGetType" :range="rangeDocumentStatu" @change="bindPickerChangeDocumentStatu">
						 	<view class="uni-input select-picker">{{formDataFile.documentStatu == '' && formDataFile.documentStatuLable == '' ? "请选择" : formDataFile.documentStatuLable}}</view>
						 </picker>
				 </uni-forms-item>
				 <uni-forms-item label="柜号" name="cabinetNo">
				     <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.cabinetNo" />
				 </uni-forms-item>
				 <uni-forms-item label="档案袋编号" name="bagNo">
				     <uni-easyinput type="text" :disabled="showInfo || !documentAdmin" v-model="formDataFile.bagNo" />
				 </uni-forms-item>
				 <uni-forms-item label="档案类型" name="documentGetTypeLable">
				     <uni-easyinput v-if="showInfo" type="text" disabled v-model="formDataFile.documentGetTypeLable" />
						 <picker v-else :value="formDataFile.documentGetType" :range="rangeDocumentGetType" @change="bindPickerChangeDocumentGetType">
						 	<view class="uni-input select-picker">{{formDataFile.documentGetType == '' && formDataFile.documentGetTypeLable == '' ? "请选择" : formDataFile.documentGetTypeLable}}</view>
						 </picker>
				 </uni-forms-item>
				 <uni-forms-item label="文件类型" name="fileGetTypeLable">
				     <uni-easyinput type="text" v-if="showInfo" disabled v-model="formDataFile.fileGetTypeLable" />
						 <picker v-else :value="formDataFile.fileGetType" :range="rangeFileGetType" @change="bindPickerChangeFileGetType">
						 	<view class="uni-input select-picker">{{formDataFile.fileGetType == '' && formDataFile.fileGetTypeLable == '' ? "请选择" : formDataFile.fileGetTypeLable}}</view>
						 </picker>
				 </uni-forms-item>
				 <uni-forms-item label="档案级别" name="documentLevelLable">
				     <uni-easyinput v-if="showInfo" type="text" disabled v-model="formDataFile.documentLevelLable" />
						 <picker v-else :value="formDataFile.documentLevel" :range="rangeDocumentLevel" @change="bindPickerChangeDocumentLevel">
						 	<view class="uni-input select-picker">{{formDataFile.documentLevel == '' && formDataFile.documentLevelLable == '' ? "请选择" : formDataFile.documentLevelLable}}</view>
						 </picker>
				 </uni-forms-item>
			 </view>
		 </uni-forms>
		 <!-- footer -->
		 <view class="footer">
		 	<button v-if="statu == 0 && applyType == 0 && documentAdmin" type="primary" @click="success">确定</button>
		 </view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-3 3:21:47 ?F10: PM?
* description   
*/


export default {
  name: 'file',
  data () {
    return {
      formDataFile: {},
			documentType: '',
			applyType: '',
			statu: '',
			documentAdmin: false,
			rangeDocumentLevel: [],
			rangeDocumentGetType: [],
			rangeDocumentStatu: [],
			rangeFileGetType: [],
			rangeFileScanType: [],
			rangeFileType: [],
			showFileScan: false,
			rules: {
				fileTypeLable: {
					rules:[{
						required: true,
						errorMessage: '必填'
					}]
				},
				documentStatuLable: {
					rules: [{
						required: true,
						errorMessage: '必填'
					}]
				},
				counts: {
					rules: [{
						required: true,
						errorMessage: '必填'
					}]
				},
				pages: {
					rules: [{
						required: true,
						errorMessage: '必填'
					}]
				},
				fileScanTypeLable: {
					rules: [{
						required: true,
						errorMessage: '必填'
					}]
				}
			}
    }
  },
	
	onLoad: function (options) {
		var file = JSON.parse(options.item)
		console.log('options',file)
		this.formDataFile = file
		this.documentType = options.documentType
		this.applyType = options.applyType
		this.statu = options.statu
		this.formDataFile.companyName = options.companyName
		this.formDataFile.projectName = options.projectName
		if(this.formDataFile.fileType == 0) {
			this.showFileScan = false
		} else {
			this.showFileScan = true
		}
		console.log('this.formDataFile',this.formDataFile)
	},
	
	mounted() {
		this.documentAdmin = uni.getStorageSync("documentAdmin")
		this.getSelectData()
	},
	
	methods:{
		// 获取字典项的值
		getSelectData() {
			this.$request("/applyIn/listDictApply", "POST", {}, {
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(res=> {
				this.rangeFileType = res.data.fileTypeDicts
				this.rangeFileScanType = res.data.fileScanTypeDicts
				this.rangeFileGetType = res.data.fileGetTypeDicts
				this.rangeDocumentStatu = res.data.documentStatuDicts
				this.rangeDocumentGetType = res.data.documentGetTypeDicts
				this.rangeDocumentLevel = res.data.documentLevelDicts
				console.log(res)
			})
		},
		// 附件类型
		bindPickerChangeFileType(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.fileTypeLable = this.rangeFileType[0]
				this.showFileScan = false
				this.formDataFile.fileScanTypeLable = ''
			} else if(ev == 1) {
				this.formDataFile.fileTypeLable = this.rangeFileType[1]
				this.showFileScan = true
			} else {
				this.formDataFile.fileTypeLable = this.rangeFileType[2]
				this.showFileScan = true
			}
			// this.formDataFile.fileType = e.target.value
		},
		// 扫描件类型
		bindPickerChangeFileScanType(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.fileScanTypeLable = this.rangeFileScanType[0]
			} else if(ev == 1) {
				this.formDataFile.fileScanTypeLable = this.rangeFileScanType[1]
			} else if(ev == 2) {
				this.formDataFile.fileScanTypeLable = this.rangeFileScanType[2]
			} else {
				this.formDataFile.fileScanTypeLable = this.rangeFileScanType[3]
			}
			// this.formDataFile.fileScanType = e.target.value
		},
		// 档案状态
		bindPickerChangeDocumentStatu(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.documentStatuLable = this.rangeDocumentStatu[0]
			} else if(ev == 1) {
				this.formDataFile.documentStatuLable = this.rangeDocumentStatu[1]
			} else {
				this.formDataFile.documentStatuLable = this.rangeDocumentStatu[2]
			}
		},
		// 档案类型
		bindPickerChangeDocumentGetType(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.documentGetTypeLable = this.rangeDocumentGetType[0]
			} else if(ev == 1) {
				this.formDataFile.documentGetTypeLable = this.rangeDocumentGetType[1]
			} else {
				this.formDataFile.documentGetTypeLable = this.rangeDocumentGetType[2]
			}
			// this.formDataFile.documentGetType = e.target.value
		},
		// 文件类型
		bindPickerChangeFileGetType(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.fileGetTypeLable = this.rangeFileGetType[0]
			} else if(ev == 1) {
				this.formDataFile.fileGetTypeLable = this.rangeFileGetType[1]
			} else if(ev == 2) {
				this.formDataFile.fileGetTypeLable = this.rangeFileGetType[2]
			} else {
				this.formDataFile.fileGetTypeLable = this.rangeFileGetType[3]
			}
			// this.formDataFile.fileGetType = e.target.value
		},
		// 档案级别
		bindPickerChangeDocumentLevel(e) {
			const ev = e.target.value
			if(ev == 0) {
				this.formDataFile.documentLevelLable = this.rangeDocumentLevel[0]
			} else if(ev == 1) {
				this.formDataFile.documentLevelLable = this.rangeDocumentLevel[1]
			} else if(ev == 2) {
				this.formDataFile.documentLevelLable = this.rangeDocumentLevel[2]
			} else {
				this.formDataFile.documentLevelLable = this.rangeDocumentLevel[3]
			}
			// this.formDataFile.documentLevel = e.target.value
		},
		
		success() {
			this.$refs.formDataFile.validate().then(res=>{
				this.$request("/documentFile/edit","POST",{
					...res
				}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(res=> {
					if(res.code == 0) {
						//获取当前页面的页面栈
						var page = getCurrentPages();
						//获取上一个页面的页面栈
						var lastPage = page[page.length - 2];
						//调用onload事件
						lastPage.onShow();
						uni.navigateBack({
						   delta: 1
						})
					}
				})
			}).catch(err => {
				uni.showToast({
					title: '请输入必填项',
					icon: 'error',
					duration: 2000
				})
			})
		}
	},
	
	computed: {
		// 判断当前是哪个入口 statu 0 待办  1 已办 2 申请
		showInfo() {
			if(this.statu == 0) {
				if(this.applyType == 1) {
					return true
				} else {
					return false
				}
			} else if(this.statu == 1) {
				return true
			} else {
				return true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.fileInfoContainer {
	margin: 30rpx 40rpx;
}
</style>

<style>
	@import url("@/css/index.css");
</style>
