<template>
  <view class="addCurstomer">
    <view class="bgcolor">客户管理
			<image class="bgcolor-icon" :src="cusIcon + '.svg'" @click="curstomerIcon"><div style="font-size: 12px;" >名片扫描</div></image>
		</view>
				<uni-forms ref="form" class="cur-forms" :modelValue="curstomerForm" :rules="rules" label-width="75">
					<view>
					<uni-forms-item required label="姓名" name="contacts">
							<uni-easyinput v-model="curstomerForm.contacts" type="text" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="联系电话" name="contactNumber">
							<uni-easyinput v-model="curstomerForm.contactNumber" type="text" placeholder="请输入联系电话" />
							<div style="font-size: 12px;color: #C0C0C0;margin-bottom: -12px;">多个手机号之间用"/"分隔</div>
					</uni-forms-item>
					<uni-forms-item label="微信号" name="weChatNumber">
							<uni-easyinput v-model="curstomerForm.weChatNumber" type="text" placeholder="请输入微信号" />
					</uni-forms-item>
					<uni-forms-item label="所属机构" name="customerName">
							<uni-easyinput v-model="curstomerForm.customerName" type="text" placeholder="请输入所属机构" />
					</uni-forms-item>
					<uni-forms-item label="职务" name="duties">
							<uni-easyinput v-model="curstomerForm.duties" type="text" placeholder="请输入职务" />
					</uni-forms-item>
					<uni-forms-item required name="customerLable" label="客户标签">
							<uni-data-checkbox :wrap="true" multiple v-model="curstomerForm.customerLable" :localdata="customerLables"/>
					</uni-forms-item>
					<uni-forms-item required label="所在省" name="province">
							<uni-easyinput v-model="curstomerForm.province" type="text" placeholder="请输入所在省" />
					</uni-forms-item>
					<uni-forms-item required label="所在市" name="city">
							<uni-easyinput v-model="curstomerForm.city" type="text" placeholder="请输入所在市" />
					</uni-forms-item>
					<uni-forms-item label="所在区" name="county">
							<uni-easyinput v-model="curstomerForm.county" type="text" placeholder="请输入所在区" />
					</uni-forms-item>
					<uni-forms-item label="详细地址" name="contactAddress">
							<uni-easyinput v-model="curstomerForm.contactAddress" type="text" placeholder="请输入详细地址" />
					</uni-forms-item>
					<uni-forms-item label="资源优势" name="resources">
							<uni-easyinput v-model="curstomerForm.resources" type="text" placeholder="请输入资源优势" />
					</uni-forms-item>
					<uni-forms-item label="备注" name="remarks">
							<uni-easyinput v-model="curstomerForm.remarks" type="text" placeholder="请输入备注" />
					</uni-forms-item>
					<uni-forms-item label="共享人" name="shareUserName">
							<!-- <uni-easyinput v-model="curstomerForm.sharer" type="text" /> -->
							<view class="choose_css" @click="showSharerProRight()">
								<block v-if="curstomerForm.shareUserName.length == 0">请选择</block>
								<block v-else v-for="(item,index) in curstomerForm.shareUserName" :key="index">{{item + ','}}</block>
								<uni-icons type="forward" size="30"></uni-icons>
							</view>
					</uni-forms-item>
					<uni-forms-item label="实际提交者" name="creator">
							<view class="choose_css" @click="showProRight()">	
								<block v-if="curstomerForm.creator == ''">请选择</block>
								<block v-else>{{curstomerForm.creator}}</block>
								<uni-icons type="forward" size="30"></uni-icons>
							</view>
					</uni-forms-item>
					<uni-forms-item v-show="false" label="createBy" name="createBy">
						<uni-easyinput v-model="curstomerForm.createBy" type="text" />
					</uni-forms-item>
				</view>
				</uni-forms>

		<!-- 弹框 -->
		<uni-drawer ref="showProRight" mode="right" :mask-click="true" :width="300">
			<scroll-view style="height: 100%;" scroll-y="true">
				<uni-row class="demo-uni-row" style="margin-top: 20rpx; margin-bottom: 20rpx;">
				    <uni-col :span="8">
						<view class="menu_text" @click="closeProDrawer"><uni-icons type="back" size="30">返回</uni-icons></view>
				    </uni-col>
				    <uni-col :span="9">
						<view class="menu_text">选择提交人</view>
				    </uni-col>
					<uni-col :span="7">
						<view class="menu_text_close" @click="closeProDrawer"><uni-icons type="closeempty" size="30"></uni-icons></view>
					</uni-col>
				</uni-row>
				<view class="top-search">
					<view>提交人</view>
					<view class="personnel-title">
						<uni-easyinput v-model="personnel" type="text" />
					</view>
					<view class="but">
						<button @click="searchProShare" size="mini" type="primary">搜索</button>
					</view>
				</view>
				<uni-row class="demo-uni-row" v-for="(item,index) in applyUserNameList" :key="index" @click.native="choosePro(item)">
					<uni-col :span="24">
					   <view class="content">提交人:{{item.userName}}</view>
					</uni-col>
				</uni-row>
			</scroll-view>
		</uni-drawer>
		<!-- 共享人 -->
		<uni-drawer ref="showSharerProRight" mode="right" :mask-click="true" :width="300">
			<scroll-view style="height: 100%;" scroll-y="true">
				<uni-row class="demo-uni-row" style="margin-top: 20rpx; margin-bottom: 20rpx;">
				    <uni-col :span="6">
						<view class="menu_text" @click="closeProDrawerShare"><uni-icons type="back" size="30">返回</uni-icons></view>
				    </uni-col>
				    <uni-col :span="18">
						<view class="menu_text">选择共享人</view>
				    </uni-col>
				</uni-row>
				<uni-row class="demo-uni-row">
					<uni-col :span="8">
						<view>用户名称</view>
					</uni-col>
					<uni-col :span="8">
						<view class="personnel-title">
							<uni-easyinput v-model="personnel" type="text" />
						</view>
					</uni-col>
					<uni-col :span="8">
							<button @click="searchProShare" size="mini" type="primary">搜索</button>
					</uni-col>
				</uni-row>
				<checkbox-group @change="checkChange">
					<uni-row class="demo-uni-row" v-for="(item,index) in applyUserNameList" :key="index" >
						<uni-col :span="2">
							 <view></view>
						</uni-col>
						<uni-col :span="12">
							 <view class="content">{{item.userName}}</view>
						</uni-col>
						<uni-col :span="4">
							 <checkbox :value="item.userName" :checked="false" color="#FFCC33" style="transform:scale(0.8)" />
						</uni-col>
					</uni-row>
				</checkbox-group>
			</scroll-view>
		</uni-drawer>
		<!-- footer -->
		<view class="footer">
			<button type="primary" @click="submit">确认</button>
			<button type="warn" @click="resetForm">重置</button>
		</view>
		
	<!-- 手机重复弹框 -->
	<uni-popup ref="popupPhone" type="center" background-color="#fff">
		<view class="popup-content" >
			<view class="message" v-if="resPhoneTitle!=''">{{'联系电话' + resPhoneTitle + '重复了！'}}</view>
			<view class="message" v-if="resWeChatTitle!=''" >{{'微信号' + resWeChatTitle + '重复了！'}}</view>
		</view>
	</uni-popup>
	<!-- 微信号弹框 -->
	<uni-popup ref="popupWeChat" type="bottom" background-color="#fff">
		<view class="popup-content">
			<view class="message">{{'微信号' + resWeChatTitle + '重复了！'}}</view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-9 9:25:16 ?F10: PM?
* description   
*/

export default {
  name: 'addAndEdit',
  data () {
    return {
      curstomerForm: {
				contacts: '',// 姓名
				contactNumber: '',// 联系电话
				weChatNumber: '',// 微信号
				customerName: '',// 所属机构
				duties: '',// 职务
				customerLable: [], //客户标签
				contactAddress: '',// 详细地址
				resources: '', // 资源优势
				remarks: '',// 备注
				shareUserName: [],// 共享人
				shareUserId: '',// 共享人id
				province: '',// 省
				city: '',// 市
				county: '',// 区
				creator: '',// 实际提交者
				createBy: ''
			},
			customerLables: [],
			chooseProVal: {},
			applyUserNameList: [],
			personnel: '',
			cusIcon: '/static/icon/scan',
			rules: {
				contacts: {
					rules:[{
						required: true,
						errorMessage: '必填'
					}]
				},
				customerLable: {
					rules:[{
						required: true,
						errorMessage: '请至少选择一项'
					}]
				},
				province: {
					rules:[{
						required: true,
						errorMessage: '必填'
					}]
				},
				city: {
					rules:[{
						required: true,
						errorMessage: '必填'
					}]
				}
			},
			UserNameArray: [],
			flagPhoneNumber: false,
			resPhoneTitle: '',
			resWeChatTitle: ''
    }
  },
	
	onLoad(options) {
		if(options.ocrData) {
			const ocrList = JSON.parse(options.ocrData)
			console.log('editOp----ocr',ocrList)
			// 匹配所属字段，待优化
			ocrList.map(item=> {
				// const reg = /.+?(省|市|自治区|自治州|县|区|街道)/g
					if(item.Name == '姓名') {
						this.curstomerForm.contacts = item.Value
					} else if(item.Name == '职位') {
						this.curstomerForm.duties = item.Value
					} else if(item.Name == '公司') {
						this.curstomerForm.customerName = item.Value
					} else if(item.Name == '微信') {
						this.curstomerForm.weChatNumber = item.Value
					} else if(item.Name == '手机') {
						if(item.Value.length > 11) {
							this.curstomerForm.contactNumber = item.Value.substring(item.Value.length - 11, item.Value.length);
						} else {
							this.curstomerForm.contactNumber = item.Value
						}
						return
						if(item.Name == '电话') {
							this.curstomerForm.contactNumber = item.Value
						}
					} else if(item.Name == '地址') {
						this.curstomerForm.contactAddress = item.Value
						if(this.curstomerForm.contactAddress.indexOf("省") != -1) {
							this.curstomerForm.province = this.curstomerForm.contactAddress.split('省')[0] + '省'
						}
						if(this.curstomerForm.contactAddress.indexOf("市") != -1) {
							this.curstomerForm.city = this.curstomerForm.contactAddress.split('市')[0] + '市'
						}
						if(this.curstomerForm.contactAddress.indexOf("区") != -1) {
							if(this.curstomerForm.contactAddress.indexOf("市") != -1) {
								this.curstomerForm.county = this.curstomerForm.contactAddress.split('市')[1].split('区')[0] + '区'
							} else {
								this.curstomerForm.county = this.curstomerForm.contactAddress.split('区')[0] + '区'
							}
						}
					}
			})
		}
	},
	
	mounted() {
		this.curstomerForm.creator = uni.getStorageSync('userName')
		this.curstomerForm.createBy = uni.getStorageSync('loginName')
		this.getDictApply()
	},
	
	methods: {
		// 获取客户标签字典项
		getDictApply() {
			this.$request("/applyIn/listDictApply","POST",{},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resDict =>{
				this.customerLables = resDict.data.sysCustomerDicts.map((item,index) => {
					return {text: item,value:index}
				})
			}) 
			
		},
		// 获取用户列表
		getApplyUserNameList() {
			this.$request("/system/user/list","POST",{
				userName: this.personnel
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(res => {
				this.applyUserNameList = res.rows
			})
		},
		
		checkboxChange(e) {
			console.log('e',e)
		},
		// 提交
		submit() {
			var flagPhone = false
			var flagWeChat = false
			this.$refs.form.validate().then(res=>{
				this.applyUserNameList.map(itemList => {
					this.curstomerForm.shareUserName.map(itemName => {
						if(itemList.userName == itemName) {
							this.UserNameArray.push(itemList.userId)
							this.curstomerForm.shareUserId = this.UserNameArray.toString()
						}
					})
				})
				if(this.curstomerForm.contactNumber == '' && this.curstomerForm.weChatNumber == '') {
					wx.showToast({
						title: "联系电话和微信号必须填写其中一个！",
						icon: 'none',
						duration: 4000
					})
					return;
				} else if(this.curstomerForm.contactNumber != '') { // 判断手机号是否正确
					const newArray = this.curstomerForm.contactNumber.split('/')
					for(var i =0; i < newArray.length; i++) {
						console.log(newArray[i])
						if(!/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(newArray[i])) {
							wx.showToast({
								title: "请输入正确的手机号！",
								icon: 'none',
								duration: 4000
							})
							return true;
						}
					}
				}
				
				// 手机号码去重
				this.$request("/system/customer/checkPhoneUnique","POST",{
					...this.curstomerForm
				}, {
						"content-type": "application/x-www-form-urlencoded",
						'cookie': uni.getStorageSync("setCookie")
				}).then(resPhone=> {
					console.log('手机号码去重',resPhone)
					if(resPhone == '') {
						flagPhone = true
					} else {
						this.resPhoneTitle = resPhone.slice(0, resPhone.length - 1);
						this.$refs.popupPhone.open()
						setTimeout(() => {
							 this.$refs.popupPhone.close()
							 	this.resPhoneTitle=''
						 }, 5000)
						return;
					}
				})
				
				// 微信号去重
				this.$request("/system/customer/checkWeChatNumberUnique","POST",{
					...this.curstomerForm
				}, {
						"content-type": "application/x-www-form-urlencoded",
						'cookie': uni.getStorageSync("setCookie")
				}).then(resWeChat=> {
					console.log('微信号去重',resWeChat)
					if(resWeChat == '') {
						flagWeChat = true
					} else {
						this.resWeChatTitle = resWeChat.slice(0, resWeChat.length - 1);
						this.$refs.popupPhone.open()
						setTimeout(() => {
							 this.$refs.popupPhone.close()
							 this.resWeChatTitle =''
						 }, 5000)
						return;
					}
				})

				// 新增客户信息
				setTimeout(()=>{
					if(flagPhone && flagWeChat) {
						uni.showLoading({
							title: '提交中...'
						})
						this.$request("/system/customer/add","POST",{
							...this.curstomerForm
						},{
							"content-type": "application/x-www-form-urlencoded",
							'cookie': uni.getStorageSync("setCookie")
						}).then(resCur => {
							uni.hideLoading()
							uni.redirectTo({
								url: '../index'
							})
							console.log('客户接口',resCur)
						}).catch(err => {
							console.log('表单错误信息：', err);
						})
					}
				},1000)
			})
		},
		// 重置
		resetForm() {
			this.$refs.form.resetFields()
			this.curstomerForm.shareUserName = []
			this.curstomerForm.shareUserId = ''
		},
		
		showProRight() {
			this.personnel = ''
			this.getApplyUserNameList()
			this.$refs.showProRight.open();
		},
		
		showSharerProRight() {
			this.personnel = ''
			this.getApplyUserNameList()
			this.$refs.showSharerProRight.open();
		},
		
		choosePro(e) {
			console.log(e)
			this.curstomerForm.creator = e.userName;
			this.curstomerForm.createBy = e.loginName
			this.$refs.showProRight.close();
		},
		// 共享人多选框
		checkChange(e) {
			this.curstomerForm.shareUserName = e.target.value
		},
		
		closeProDrawer() {
			this.$refs.showProRight.close();
		},
		
		closeProDrawerShare() {
			this.$refs.showSharerProRight.close();
		},
		
		searchProShare() {
			this.getApplyUserNameList()
		},
		
		curstomerIcon() {
			uni.redirectTo({
				url: '../../ocr/index'
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.bgcolor {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.bgcolor-icon {
	width: 100rpx;
	height: 100rpx;
	margin-left: 50rpx;
}

.icon {
	margin-left: 30rpx;
}

.footer {
	display: flex;
	flex-direction: row;
	margin: 40rpx 0;
	button {
		width: 300rpx;
	}
}

.addCurstomer {
	margin: 0 30rpx;
}

.choose_css{
	justify-content: flex-end; 
	display: flex; 
	align-items: center;
}
.menu_text{
	padding-left: 30rpx;
	font-weight: 900
}
.content{
	padding-left: 30rpx;
	padding-top: 20rpx;
	padding-right: 30rpx;
	display: flex;
	justify-content: flex-start;
}
.flow-container{
	padding:30rpx
}
.menu_text_close{
	padding-left: 30rpx;
	font-weight: 900;
	display: flex;
	justify-content: flex-end;
	text-align: right;
	float: right;
	padding-right: 30rpx;
}

.cur-forms {
	.uni-forms-item__inner {
		padding-bottom: 5rpx;
	}
}

.top-search {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin: 20rpx 0;
}

.uni-list-cell {
	display: flex;
	align-items: center;
	.checkbox {
		
	}
}

.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
	font-size: 13px;
}
	.message{
		margin: 10px 0;
	}
</style>

<style>
	@import url("@/css/index.css");
	.uni-popup .uni-popup__wrapper {
		border-radius: 20rpx;
	}

</style>
