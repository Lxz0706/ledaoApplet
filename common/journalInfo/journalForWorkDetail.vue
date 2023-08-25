<template>
	<view class="cur-list">
		<view v-if="showList">
			<uni-list v-for="(item,index) in journalList" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options">
						<uni-list-item link="navigateTo">
							<template slot="body">
								<view class="slot-box slot-text">项目名称：{{item.projectName}}</view>
								<view class="slot-box slot-text">录入日期：{{item.journalTime}}</view>
								<view class="slot-box slot-text">录入人： {{item.creator}}</view>
								<text class="slot-box slot-text">
									日志内容：{{item.workDetail}}
								</text>
							</template>
						</uni-list-item>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</uni-list>
		</view>
		<view v-else>
			<view>
				<text
					style="text-align: center;display: flex;align-items: center;justify-content: center">暂未查询到相关数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'info',
		data() {
			return {
				journalList: [],
				index: 0,
				searchData: {
					datetimerange: []
				},
				workDetail: '',
				creator: '',
				projectName: '',
				date: '',
				showList: true,
				deptIdStr: ''
			}
		},


		onLoad(options) {
			let loginName = uni.getStorageSync('loginName');
			this.workDetail = options.workDetail;
			this.projectName = options.projectName;
			this.creator = options.creator;
			this.date = options.date;
			this.deptIdStr = options.deptIdStr;
			this.getJournalList();
		},

		mounted() {
			this.getJournalList()
		},

		methods: {
			getJournalList() {
				this.$request("/system/journal/searchWorkDetail", "POST", {
					workDetail: this.workDetail,
					creator: this.creator,
					projectName: this.projectName,
					createTimeFormat: this.date,
					deptIdStr: this.deptIdStr
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(resDepart => {
					if (resDepart == 'login' || (resDepart.code == 500 && resDepart.msg.includes(
							"Authentication"))) {
						uni.setStorageSync('loginSuccess', false)
						setTimeout(function() {
							uni.showToast({
								title: '登录已失效！',
								icon: 'error',
								duration: 3000
							})
							setTimeout(function() {
								uni.switchTab({
									url: "/pages/home/index",
									success: function() {
										let page = getCurrentPages().pop()
										if (!page) return
										page.onLoad()
									}
								})
							}, 3000)
						}, 1000);
					} else {
						this.journalList = resDepart.rows
						if (this.journalList.length > 0) {
							this.journalList.map(item => {
								if (item.createTime == null) {
									item.createTime = ''
								}
								if (item.workDetail == null) {
									item.workDetail = '无进展'
								}
								if (item.projectName == null) {
									item.projectName = '无项目'
								}
								if (item.journalTime == null) {
									item.journalTime = ''
								}
							})
						} else {
							this.showList = false;
						}
						setTimeout(() => {
							uni.hideLoading()
						}, 4000)
					}
				})
			},

			// 删除日志
			// bindClick(id) {
			// 	this.$request("/system/journal/remove", "POST", {
			// 		ids: id
			// 	}, {
			// 		"content-type": "application/x-www-form-urlencoded",
			// 		'cookie': uni.getStorageSync("setCookie")
			// 	}).then(resRemove => {
			// 		if (resRemove == 'login' || (resRemove.code == 500 && resRemove.msg.includes(
			// 				"Authentication"))) {
			// 			setTimeout(function() {
			// 				uni.showToast({
			// 					title: '登录已失效！',
			// 					icon: 'error',
			// 					duration: 3000
			// 				})
			// 				setTimeout(function() {
			// 					uni.switchTab({
			// 						url: "/pages/home/index",
			// 						success: function() {
			// 							let page = getCurrentPages().pop()
			// 							if (!page) return
			// 							page.onLoad()
			// 						}
			// 					})
			// 				}, 3000)
			// 			}, 1000);
			// 		} else {
			// 			if (resRemove.code == 0) {
			// 				uni.showToast({
			// 					title: '删除成功'
			// 				})
			// 				this.getJournalList()
			// 			}
			// 		}
			// 	})
			// },

			// onClick(e, val) {
			// 	const objVal = JSON.stringify(val)
			// 	uni.navigateTo({
			// 		url: '/common/journalInfo/journal?isChat=1&item=' + objVal + '&createBy=' + this.createBy
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.flow-container {
		padding: 30rpx;
	}

	.search_css {
		display: flex;
	}

	.but {
		text-align: right;
		margin: 20rpx 20rpx 0 0;
	}

	.example-body {
		margin-bottom: 20rpx;
	}

	.top-search {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.dept-input {
			flex: 1
		}

		.dept-name {
			margin-right: 20rpx;
		}
	}

	.unfilled-log {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #E5E5E5;

		.unfilled-title {
			padding: 180rpx;
			background: #fff;
			border-radius: 50rpx;
		}
	}

	.contact {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 15rpx;
	}

	.search-but {
		text-align: right;
		margin: 40rpx 40rpx 0 0;
	}
</style>
<style>
	@import url("@/css/index.css");
</style>
