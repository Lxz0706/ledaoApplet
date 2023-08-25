<template>
	<view class="container">
		<template>
			<view class="unfilled-log" v-if="showTitle && dateTimeDis">
				<view class="unfilled-title">未填日志</view>
			</view>
			<view v-else>
				<view class="search-bar">
					<view class="contact">
						<view class="contactTitle">
							项目名称：
						</view>
						<view class="contactsLable">
							<uni-easyinput v-model="projectName" type="text" placeholder="请输入项目名称" />
						</view>
					</view>
					<view class="search-but">
						<button @click="getJournalList" size="mini" type="primary">搜索</button>
					</view>
				</view>
				<uni-list v-for="(item,index) in journalList" :key="index">
					<uni-swipe-action>
						<uni-swipe-action-item :right-options="options" :disabled="!journalDelete"
							@click="bindClick(item.id)">
							<uni-list-item link="navigateTo" @click="onClick($event,item)">
								<template slot="body">
									<view class="slot-box slot-text">项目名称：{{item.projectName}}</view>
									<view class="slot-box slot-text">录入日期：{{item.journalTime}}</view>
									<text class="slot-box slot-text">
										日志内容：{{item.workDetail}}
									</text>
									<!-- <view class="slot-box slot-text">日志内容：{{item.workDetail}}</view> -->
								</template>
							</uni-list-item>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</uni-list>
			</view>
		</template>
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
				branch: [{
					id: 1,
					name: ''
				}],
				deptNameInput: '',
				userNameInput: '',
				createBy: '',
				projectName: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				showTitle: false,
				nowDate: '',
				dateTimeDis: false,
				journalDelete: false
			}
		},

		onLoad(options) {
			let loginName = uni.getStorageSync('loginName');
			let date = new Date();
			let seperator1 = "-";
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			const currentdate = year + seperator1 + month + seperator1 + strDate;
			this.date = options.date
			this.createBy = options.createBy
			if (loginName == this.createBy && currentdate == this.date) {
				this.journalDelete = true
			}
			uni.setStorageSync('datePeople', this.date)
		},

		mounted() {
			this.getJournalList()
			//this.getDate();
			this.getJournalTime();
		},

		onShow() {
			//this.getJournalList()
		},

		methods: {
			// 获取当天的日期
			getDate() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				if (month >= 1 && month <= 9) {
					month = "0" + month
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day
				}
				this.nowDate = year + "-" + month + "-" + day
				if (this.nowDate == this.date) {
					this.checkAuditTime();
					if (hour >= 18 && hour < 24) {
						this.dateTimeDis = false
					} else {
						this.dateTimeDis = true
					}
				} else {
					this.dateTimeDis = false
				}
			},
			getJournalList() {
				const beginTime = this.searchData.datetimerange.length > 0 ? this.searchData.datetimerange[0].replace(/-/g,
					'') : ''
				const endTime = this.searchData.datetimerange.length > 0 ? this.searchData.datetimerange[1].replace(/-/g,
					'') : ''
				uni.showLoading({
					title: '加载中...'
				})
				this.$request("/system/journal/list", "POST", {
					createBy: this.createBy,
					createTimeFormat: this.date,
					projectName: this.projectName
				}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(res => {
					if (res == 'login' || (res.code == 500 && res.msg.includes("Authentication"))) {
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
						this.journalList = res.rows
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
							this.showTitle = true
						}
						setTimeout(() => {
							uni.hideLoading()
						}, 4000)
					}
				})
			},

			// 删除日志
			bindClick(id) {
				this.$request("/system/journal/remove", "POST", {
					ids: id
				}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(resRemove => {
					if (resRemove == 'login' || (resRemove.code == 500 && resRemove.msg.includes(
							"Authentication"))) {
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
						if (resRemove.code == 0) {
							uni.showToast({
								title: '删除成功'
							})
							this.getJournalList()
						}
					}
				})
			},

			onClick(e, val) {
				const objVal = JSON.stringify(val)
				uni.navigateTo({
					url: '/common/journalInfo/journal?isChat=1&item=' + objVal + '&createBy=' + this.createBy
				})
			},
			getJournalTime() {
				var _this = this;
				this.$request("/system/journal/getJournalTime", "POST", {}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					_this.journalTimeList = res.data;
					var str = "";
					for (var i in res.data) {
						str = res.data[i].configValue;
						_this.journalTimeMsg = res.data[0].remark;
					}
					var st = "";
					for (var j in str.split(',')) {
						st += str.split(",")[j] + ",";
					}
					var s = st.substring(0, st.lastIndexOf(","));
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let hour = date.getHours();
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 0 && day <= 9) {
						day = "0" + day
					}
					_this.nowDate = year + "-" + month + "-" + day
					if (_this.nowDate == _this.date) {
						_this.dateTimeDis = _this.checkAuditTime(s.split(",")[0].replace(/-/gi, '/'), s.split(",")[1].replace(/-/gi, '/'));
					} else {
						_this.dateTimeDis = false
					}

					uni.hideLoading();
				})
			},
			checkAuditTime(startTime, endTime) {
				// 获取当前时间
				const date = new Date()
				// 获取当前时间的年月日
				const dataStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `
				// 获取开始时间、结束时间、现在时间的时间戳
				let startDate = new Date(startTime).getTime();
				let endDate = new Date(endTime).getTime();
				let nowDate = date.getTime();
				//开始时间不大于结束时间
				const s = startDate < endDate;
				if (nowDate > startDate && nowDate < endDate) {
					return s ? false : true
				} else {
					return s ? true : false
				}
			},
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
