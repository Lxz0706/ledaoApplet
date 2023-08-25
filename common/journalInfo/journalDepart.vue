<template>
	<view class="depart-container">
		<view class="contactTitle">
			项目名称：
		</view>
		<view class="contactsLable">
			<uni-easyinput id="projectName" v-model="projectName" type="text" placeholder="请输入要搜索的项目名称(请输入较为完整的信息)">
			</uni-easyinput>
		</view>
		<view class="contactTitle">
			日志内容查询：
		</view>
		<view class="contactsLable">
			<uni-easyinput id="workDetail" v-model="workDetail" type="text" placeholder="请输入要搜索的日志内容(请输入较为完整的信息)">
			</uni-easyinput>
		</view>
		<view class="contactTitle">
			创建人：
		</view>
		<view class="contactsLable">
			<uni-easyinput id="creator" v-model="creator" type="text" placeholder="请输入要搜索的创建人">
			</uni-easyinput>
		</view>
		<view class="dept-name">
			日期
		</view>
		<view class="uni-list-cell-db">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
		</view>
		<view>
			<button type="primary" @click="searchWorkDetail()">搜索</button>
		</view>
		<view class="cur-list">
			<uni-list v-for="(item,index) in departList" :key="index">
				<uni-list-item link="navigateTo" @click="onClick($event,item)">
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
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				deptNameInput: '',
				departList: [],
				workDetail: '',
				creator: '',
				projectName: '',
				date: currentDate,
				deptIdStr: ''
			}
		},

		mounted() {
			this.getDepartList()
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		methods: {
			// 获取部门列表
			getDepartList() {
				this.$request("/system/journal/deptList", "POST", {}, {
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
						this.departList = resDepart.rows;
						for (var i in this.departList) {
							this.deptIdStr += this.departList[i].deptId + ',';
						}
						if (this.deptIdStr.length > 0) {
							this.deptIdStr = this.deptIdStr.substring(0, this.deptIdStr.length - 1);
						}
					}
				})
			},
			// 选择单个部门进入journal-people
			onClick(e, item) {
				uni.navigateTo({
					url: './journalPeople?deptId=' + item.deptId
				})
			},
			searchWorkDetail() {
				uni.redirectTo({
					url: './journalForWorkDetail?workDetail=' + this.workDetail + "&projectName=" + this
						.projectName + "&creator=" + this.creator + "&date=" + this.date + "&deptIdStr=" + this
						.deptIdStr,
					fail(error) {
						console.log(error);
					}
				})
			},
			bindDateChange(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
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
			flex: 1
		}

		.dept-name {
			margin-right: 20rpx;
		}
	}
</style>
