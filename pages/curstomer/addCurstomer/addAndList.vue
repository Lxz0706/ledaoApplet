<template>
  <view class="curstomer-container">
		<view class="search-bar">
			<view class="contactTime">
				<uni-row>
				 <uni-col :span="3">
					 <view class="contactTitle">
							日期
					 </view>
				 </uni-col>
					 <uni-col :span="21">
						<view class="contactsLable">
							<uni-datetime-picker v-model="searchData.datetimerange" type="daterange" :clear-icon="true"
							rangeSeparator="至" />
						</view>
					</uni-col>
				</uni-row>
			</view>

			 <view class="contact">
				 <view class="contactTitle">
							联系人名称
				 </view>
				 <view class="contactsLable">
					 	<uni-easyinput v-model="contactsLab" type="text" />
				 </view>
				</view>
			 <view class="search-but">
				 <button @click="getCusList" size="mini" type="primary">搜索</button>
			 </view>
		</view>
		<view class="cur-list">
			<uni-list v-for="(item,index) in cusList" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options"  @click="bindClick(item.customerId)">
						<uni-list-item link="navigateTo" @click="onClick($event,item)" >
							<template slot="body">
								<view class="slot-box slot-text">序号：{{index + 1}}</view>
								<view class="slot-box slot-text">联系人：{{item.contacts}}</view>
								<view class="slot-box slot-text">联系电话：{{item.contactNumber}}</view>
								<view class="slot-box slot-text">微信号：{{item.weChatNumber}}</view>
							</template>
						</uni-list-item>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<view class="line"></view>
			</uni-list>
		</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-14 5:15:07 ?F10: PM?
* description   
*/


export default {
  name: 'addAndList',
  data () {
    return {
			searchData: {
				datetimerange: []
			},
			cusList: [],
			contactsLab: '',
			options:[{
						text: '删除',
						style: {
								backgroundColor: '#dd524d'
						}
				}]
    }
  },
	
	mounted() {
		this.getCusList()
	},
	
	methods: {
		// 获取客户list
		getCusList() {
			const beginTime = this.searchData.datetimerange.length > 0 ? this.searchData.datetimerange[0] : '' 
			const endTime = this.searchData.datetimerange.length > 0 ? this.searchData.datetimerange[1] : ''
			setTimeout(()=>{
				uni.showLoading({
					title: '正在加载...'
				})
			},400)
			
			this.$request("/system/customer/list","POST", {
				"params[beginTime]": beginTime,
				"params[endTime]": endTime,
				"contacts": this.contactsLab
			}, {
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resCus=> {
				console.log('resCus',resCus)
				if(resCus == 'login' || (resCus.code == 500 && resCus.msg.includes("Authentication"))) {
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
						this.cusList = resCus.rows
						setTimeout(()=>{
							uni.hideLoading()
						},500)
					}
			}).catch(err => {
				console.log('err',err)
			})
		},
		
		// 删除客户
		bindClick(id) {
			console.log('删除客户')
			this.$request("/system/customer/remove","POST",{
				ids: id
			},{
				"content-type": "application/x-www-form-urlencoded",
				'cookie': uni.getStorageSync("setCookie")
			}).then(resRemove=> {
				if(resRemove == 'login' || (resRemove.code == 500 && resRemove.msg.includes("Authentication"))) {
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
						if(resRemove.code == 0) {
							uni.showToast({
								title: '删除成功'
							})
							this.getCusList()
						}
					}
			})
		},
		
		onClick(e,val) {
			var objectVal = JSON.stringify(val)
			uni.navigateTo({
				url: './curstomerInfoAll?item=' + objectVal
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.search-but {
	text-align: right;
	margin: 40rpx 40rpx 0 0;
}

.line {
	background-color: #E5E5E5;
	height: 30rpx;
}

.contact {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-top: 20rpx;
}

.contactTime {
	margin: 0 56rpx;
}
</style>

<style>
		@import url("@/css/index.css");
</style>
