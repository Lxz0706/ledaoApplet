<template>
  <view class="depart-container">
		<view class="cur-list">
			<uni-list v-for="(item,index) in departList" :key="index">
				<uni-list-item link="navigateTo" @click="onClick($event,item)" >
					<template slot="body">
						<view class="slot-box slot-text">{{item.deptName}}</view>
					</template>
				</uni-list-item>
				<view class="line"></view>
			</uni-list>
		</view>
  </view>
</template>

<script>
/**
* author        chenjie
* time          2021-9-26 6:16:13 ?F10: PM?
* description   
*/


export default {
  name: 'journalDepart',
  data () {
    return {
      deptNameInput: '',
			departList: []
    }
  },
	
	mounted() {
		this.getDepartList()
	},
	
	methods:{
		// 获取部门列表
		getDepartList() {
			this.$request("/system/journal/deptList","POST",{},{
				"content-type": "application/x-www-form-urlencoded",
				"cookie": uni.getStorageSync('setCookie')
			}).then(resDepart=> {
				console.log('部门列表',resDepart)
				if(resDepart == 'login' || (resDepart.code == 500 && resDepart.msg.includes("Authentication"))) {
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
						this.departList = resDepart.rows
					}
			})
		},
		// 选择单个部门进入journal-people
		onClick(e,item) {
			uni.navigateTo({
				url: './journalPeople?deptId=' + item.deptId
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.top-search {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
	.dept-input {
		flex:1
	}
	.dept-name {
		margin-right: 20rpx;
	}
}
</style>
