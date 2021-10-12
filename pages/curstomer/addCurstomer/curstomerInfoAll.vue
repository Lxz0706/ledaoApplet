<template>
  <view class="all">
    <uni-forms ref="form" :modelValue="customerData" :rules="rules" label-width="100">
			<uni-forms-item label="联系人" name="contacts">
					<uni-easyinput v-model="customerData.contacts" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="联系电话" name="contactNumber">
					<uni-easyinput v-model="customerData.contactNumber" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="微信号" name="weChatNumber">
					<uni-easyinput v-model="customerData.weChatNumber" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="所属机构" name="customerName">
					<uni-easyinput v-model="customerData.customerName" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="职务" name="duties">
					<uni-easyinput v-model="customerData.duties" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="客户标签" name="customerLable">
					<uni-data-checkbox :wrap="true" disabled multiple v-model="customerData.customerLable" :localdata="customerLables"/>
			</uni-forms-item>
			<!-- 城市选择器 -->
			<uni-forms-item label="所在省" name="province">
					<uni-easyinput v-model="customerData.province" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="所在市" name="city">
					<uni-easyinput v-model="customerData.city" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="所在区" name="county">
					<uni-easyinput v-model="customerData.county" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="详细地址" name="contactAddress">
					<uni-easyinput v-model="customerData.contactAddress" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="资源优势" name="resources">
					<uni-easyinput v-model="customerData.resources" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="备注" name="remarks">
					<uni-easyinput v-model="customerData.remarks" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="共享人" name="shareUserName">
					<uni-easyinput v-model="customerData.shareUserName" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="所属部门" name="deptName">
					<uni-easyinput v-model="customerData.deptName" disabled type="text" />
			</uni-forms-item>
			<uni-forms-item label="实际提交者" name="creator">
					<uni-easyinput v-model="customerData.creator" disabled type="text" />
			</uni-forms-item>
		</uni-forms>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-15 1:39:10 ?F10: PM?
* description   
*/


export default {
  name: '',
  data () {
    return {
      customerData: {
				
			},
			customerLables: []
    }
  },
	
	onLoad(options) {
		var customer = JSON.parse(options.item)
		this.customerData = customer
		this.customerData.customerLable = this.customerData.customerLable.split(",").map(Number)
	},
	
	mounted() {
		this.getDictApply()
	},
	
	methods:{
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
		}
	}
}
</script>

<style lang="scss" scoped>
.all {
	margin: 30rpx 40rpx;
}
</style>
