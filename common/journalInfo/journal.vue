<template>
	<view class="container">
		<template>
			<view class="flow-container">
				<uni-forms ref="form" :modelValue="formData" :rules="rules" label-width="100">
					<uni-forms-item required label="项目名称" name="projectName">
						<view class="choose_css" @click="!showAdd && !(isChat == 1) && showProRight()">
							<view class="isNotShow">
								<uni-easyinput v-show="false" v-model="formData.projectName" />
							</view>
							<block v-if="formData.projectName == ''">请选择</block>
							<block v-else>{{formData.projectName}}</block>
							<uni-icons type="forward" size="30"></uni-icons>
						</view>
					</uni-forms-item>
					<uni-forms-item required label="日志填写" name="workDetail">
						<view class="work-input" @click="inputFocus">
							<uni-easyinput maxlength="-1" :autoHeight="true" v-model="formData.workDetail"
								:disabled="dateTimeDis || showAdd || isChat == 1" placeholder="请填写日志..."
								type="textarea" />
						</view>
					</uni-forms-item>
					<view class="chatAll" v-if="isChat == 1 && showChatAll">
						<view class="chatDetailAll" v-for="(item,index) in chatDetailA" :key="index">
							<view v-if="item.remarks1 == 0"
								@click="huifuClick(index,item.id,item.createBy,item.userName)">
								<view class="list-title">
									<view style="color: #3B9DEC;">{{item.userName}}</view>
									<uni-dateformat class="right" :date="item.createTimeComment"
										format="yyyy/MM/dd hh:mm" :threshold="[60000, 3600000]"></uni-dateformat>
								</view>
								<view class="list-title">
									{{item.chatDetail}}
								</view>
							</view>
							<view v-else @click="huifuClick(index,item.id,item.createBy,item.userName)">
								<view class="list-title">
									<view style="text-align: left;color: #3B9DEC;">{{item.userName}}</view>
									<uni-dateformat class="right" :date="item.createTimeComment"
										format="yyyy/MM/dd hh:mm" :threshold="[60000, 3600000]"></uni-dateformat>
								</view>
								<view class="list-title" v-if="item.replyName !=null">
									回复 {{item.replyName}} ：{{item.chatDetail}}
								</view>
								<view class="list-title" v-else>
									回复 ：{{item.chatDetail}}
								</view>
							</view>
							<view class="hr"></view>
						</view>
					</view>
					<view class="line"></view>
					<uni-forms-item label="评论填写" v-if="isChat == 1" name="chatDetail">
						<uni-easyinput ref="chatDetail" v-model="formData.chatDetail" placeholder="请填写评论..."
							type="textarea" />
					</uni-forms-item>
				</uni-forms>
				<view class="footer">
					<button v-if="isChat == 1" type="primary" @click="submitIsChat()">提交</button>
					<button v-else type="primary" :disabled="showAdd" @click="submit()">提交</button>
				</view>
				<view class="fab-but" v-if="showAdd">
					<uni-fab :popMenu="false" :pattern="pattern" horizontal="right" vertical="bottom"
						@fabClick="fabClick"></uni-fab>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="pop">
					<input type="text" :focus="setFocus" v-model="Reply" :placeholder="holder">
					<button type="default" @click="send">回复</button>
				</view>
			</uni-popup>
			<uni-drawer ref="showProRight" mode="right" :mask-click="false" :width="350">
				<scroll-view style="height: 100%;" scroll-y="true">
					<uni-row class="demo-uni-row" style="margin-top: 20rpx; margin-bottom: 20rpx;">
						<uni-col :span="8">
							<view class="menu_text" @click="closeProDrawer">
								<uni-icons type="back" size="30">返回</uni-icons>
							</view>
						</uni-col>
						<uni-col :span="16">
							<view class="menu_text">选择项目</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row">
						<uni-col :span="8">
							<view style="padding-left: 30rpx">项目名称</view>
						</uni-col>
						<uni-col :span="8">
							<uni-easyinput v-model="projectNameSearch" type="text" />
						</uni-col>
						<uni-col :span="8">
							<button @click="searchPro" size="mini" type="primary">搜索</button>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row" v-for="(item,index) in projectList" :key="index"
						@click.native="choosePro(item)">
						<uni-col :span="20">
							<view class="content">{{item.projectName}}</view>
						</uni-col>
						<uni-col :span="4" v-if="item.isWrite == 'y' ? true : false">
							<icon type="success_no_circle" size="26" />
						</uni-col>
					</uni-row>
				</scroll-view>
			</uni-drawer>
		</template>
	</view>
</template>

<script>
	/**
	 * author        chenjie
	 * time          2021-9-1 2:29:52 ?F10: PM?
	 * description   日志填写
	 */
	export default {
		name: 'journal',
		data() {
			return {
				// 简单信息表单数据
				formData: {
					workDetail: '',
					chatDetail: '',
					proId: '',
					projectName: '',
					userName: [],
					id: ''
					// shared: ''
				},
				rules: {
					workDetail: {
						rules: [{
							required: true,
							errorMessage: '必填'
						}]
					},
					projectName: {
						rules: [{
							required: true,
							errorMessage: '必填'
						}]
					}
				},
				userList: [],
				chooseUserVals: '',
				isChat: 0,
				isManager: false,
				chooseProVal: {},
				projectList: [],
				stepOption: [],
				fileList: [],
				isShowTitle: false,
				dateTimeDis: false,
				chatDetailA: [],
				setFocus: false,
				indexV: '',
				Reply: '',
				loginName: '',
				detailsList: [],
				journalId: '',
				journalCommentId: '',
				projectNameSearch: '',
				showChatAll: false,
				showAdd: false,
				proIds: '',
				createBy: '',
				replyName: '',
				replyBy: '',
				holder: '',
				journalTimeList: [],
				journalTimeMsg: '',
				projectType: '',
				startTime: '',
				enTime: ''
			}
		},
		watch: {
			holder: function() {
				this.holder = '回复  ' + this.replyName;
			}
		},

		onLoad: function(options) {
			if (options.item) {
				const val = JSON.parse(options.item)
				this.formData = val
				this.proIds = val.proId
			}
			this.isChat = options.isChat;
			this.createBy = options.createBy;
			this.loginName = uni.getStorageSync('userName');

		},
		mounted() {
			this.getJournalTime();
			var _this = this;
			_this.init();
		},

		methods: {
			async init() {
				if (this.isChat == 1) {
					this.getChatDetailList()
				}
				var _this = this;
				console.log(_this.startTime + "=====" + _this.enTime);
			},
			// 获取评论列表
			async getChatDetailList() {
				this.$request("/system/comment/listCommentDtail", "POST", {
					journalId: this.formData.id == null ? '' : this.formData.id, // 评论id，无评论则为空
					proId: this.proIds,
					commentTime: uni.getStorageSync('datePeople')
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					if (res == 'login' || (res.code == 500 && res.msg.includes("Authentication"))) {
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
						this.chatDetailA = res.data
						this.formData.chatDetail = ''
						if (this.chatDetailA.length > 0) {
							this.showChatAll = true
							this.formData.id = res.data[0].journalId
						}
					}
				})
			},
			// 回复
			jonClick() {
				this.$request("/system/comment/add", "POST", {
					"parentId": this.journalCommentId,
					"chatDetail": this.Reply,
					"journalId": this.formData.id,
					"commentTime": uni.getStorageSync('datePeople'),
					"temporaryName": this.createBy,
					"replyBy": this.replyBy,
					"replyName": this.replyName
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					if (res == 'login' || (res.code == 500 && res.msg.includes("Authentication"))) {
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
						if (res.code == 0) {
							this.getChatDetailList()
						}
					}
				})
			},
			fabClick() {
				uni.redirectTo({
					url: './journalone'
				})
			},

			getProList() {
				const _this = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.$request("/system/project/listProTh", "POST", {
					projectName: this.projectNameSearch
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					if (res == 'login' || (res.code == 500 && res.msg.includes("Authentication"))) {
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
						if (res.code == 0) {
							if (res.data.length > 0) {
								_this.projectList = res.data
							} else {
								_this.projectList = []
								_this.isShowTitle = true
								uni.showToast({
									icon: 'error',
									position: 'bottom',
									title: '没有更多了'
								});
							}
						}
						uni.hideLoading()
					}
				})
			},

			submit() {
				var _this = this;
				setTimeout(function() {
					_this.submitJournal();
				}, 500)
			},
			async submitJournal() {
				this.$refs.form.validate().then(res => {
					this.$request("/system/journal/add", "POST", {
						...this.formData
					}, {
						"content-type": "application/x-www-form-urlencoded",
						"cookie": uni.getStorageSync('setCookie')
					}).then(res => {
						if (res == 'login' || (res.code == 500 && res.msg.includes(
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
											let page =
												getCurrentPages()
												.pop()
											if (!page) return
											page.onLoad()
										}
									})
								}, 3000)
							}, 1000);
						} else {
							if (res.code == 0) {
								this.showAdd = true
								setTimeout(() => {
									uni.showToast({
										title: '提交成功',
										icon: 'success',
										duration: 3000
									})
								}, 500)
							} else {
								console.log(res.msg);
								var msg = res.msg;
								setTimeout(() => {
									uni.showToast({
										title: msg,
										icon: 'none',
										mask: true,
										duration: 3000,
									})
								}, 500)
							}
						}
					})
				}).catch(err => {
					console.log('err', err)
				})
			},
			// 评论填写确定按钮  remarks1为0
			submitIsChat() {
				if (this.formData.chatDetail == '' || this.formData.chatDetail == undefined) {
					uni.showToast({
						title: '评论内容不能为空',
						duration: 3000,
						icon: 'none'
					})
				} else {
					this.$refs.form.validate().then(res => {
						this.$request("/system/comment/add", "POST", {
							"journalId": this.formData.id == null ? '' : this.formData.id,
							"proId": this.proIds,
							"workDetail": this.formData.chatDetail,
							"remarks1": 0,
							"commentTime": uni.getStorageSync('datePeople'),
							"temporaryName": this.createBy
						}, {
							"content-type": "application/x-www-form-urlencoded",
							"cookie": uni.getStorageSync('setCookie')
						}).then(res => {
							if (res == 'login' || (res.code == 500 && res.msg.includes(
									"Authentication"))) {
								setTimeout(function() {
									uni.showToast({
										title: '登录已失效！',
										icon: 'error'
									})
									setTimeout(function() {
										uni.switchTab({
											url: "/pages/home/index",
											success: function() {
												let page =
													getCurrentPages()
													.pop()
												if (!page) return
												page.onLoad()
											}
										})
									}, 3000)
								}, 1000);
							} else {
								if (res.code == 0) {
									this.$refs.chatDetail.val = ''
									this.getChatDetailList()
								}
								console.log('IsChat', res)
							}
						})
					}).catch(err => {})
				}
			},

			huifuClick(i, id, createBy, userName) {
				this.$refs.popup.open('bottom')
				this.setFocus = true
				this.indexV = i
				this.journalCommentId = id
				this.replyBy = createBy
				this.replyName = userName
				this.holder = '回复：' + userName
			},

			send() {
				if (this.Reply == '') {
					uni.showToast({
						title: '回复内容不能为空',
						duration: 2000,
						icon: 'none'
					})
				} else {
					this.jonClick()
				}

				this.Reply = ''
				this.$refs.popup.close()
			},

			showProRight() {
				this.getProList();
				this.$refs.showProRight.open();
			},

			closeProDrawer() {
				this.$refs.showProRight.close();
			},

			inputFocus() {
				if (this.dateTimeDis && this.isChat == 0) {
					uni.showToast({
						title: this.journalTimeMsg + "，请在规定时间内填写",
						icon: 'none'
					})
				}
			},
			choosePro(e) {
				const that = this
				that.$request("/system/journal/listByProId", "POST", {
					proId: e.projectId
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(resProId => {
					if (resProId == 'login' || (resProId.code == 500 && resProId.msg.includes(
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
						if (resProId.rows.length > 0) {
							uni.showModal({
								title: '该项目日志已存在，是否继续编辑？',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										if (resProId.rows[0].proId == 0) {
											that.formData.projectName = '无项目'
										} else {
											that.formData.projectName = resProId.rows[0]
												.projectName
										}
										that.formData.workDetail = resProId.rows[0]
											.workDetail
										that.formData.proId = resProId.rows[0].projectId;
										that.formData.id = resProId.rows[0].id
										that.$refs.showProRight.close();
									} else if (res.cancel) {

									}
								}
							});
						} else {
							that.formData.projectName = e.projectName;
							that.formData.proId = e.projectId;
							that.formData.projectType = e.projectType;
							that.$refs.showProRight.close();
						}
					}
				})
			},

			searchPro() {
				this.getProList()
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
					_this.startTime = s.split(",")[0].replace(/-/gi, '/');
					_this.enTime = s.split(",")[1].replace(/-/gi, '/');
					_this.dateTimeDis = _this.checkAuditTime(s.split(",")[0].replace(/-/gi, '/'), s.split(",")[1].replace(/-/gi, '/'));
					uni.hideLoading();
				})
			},
			checkAuditTime(startTime, endTime) {
				console.log(startTime + "=====-----------" + endTime);
				// 获取当前时间
				const date = new Date();
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
	.footer {
		display: flex;
		flex-direction: row;
		margin: 40rpx 0;

		button {
			width: 300rpx;
		}
	}

	.choose_css {
		justify-content: flex-end;
		display: flex;
		align-items: center;
	}

	.menu_text {
		padding-left: 30rpx;
		font-weight: 900
	}

	.content {
		padding-left: 30rpx;
		padding-top: 20rpx;
		padding-right: 30rpx;
		display: flex;
		justify-content: flex-start;
	}

	.flow-container {
		padding: 30rpx
	}

	.menu_text_close {
		padding-left: 30rpx;
		font-weight: 900;
		display: flex;
		justify-content: flex-end;
		text-align: right;
		float: right;
		padding-right: 30rpx;
	}

	.chatAll {
		background-color: #F5F5F5;
		max-height: 420rpx;
		overflow: auto;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 44rpx;

		.chatDetailAll {
			margin-bottom: 40rpx;
		}

		font-size: 30rpx;
	}

	.date {
		text-align: right;
		margin-top: 10rpx;
	}

	.hr {
		height: 1px;
		background-color: #fff;
		margin: 10rpx 0;
	}

	.huifu {
		text-align: right;
		color: #3B9DEC;
		margin: 30rpx 20rpx;
	}

	.list-title {

		padding: 10px;

		display: flex;

		justify-content: space-between;

	}

	.right {
		color: #3B9DEC;
		;
	}

	.isNotShow {
		display: none;
	}
</style>

<style>
	@import url("@/css/index.css");

	.pop {
		width: 750rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.pop button {
		font-size: 24rpx;
		height: 60rpx;
		margin-left: 10rpx;
		width: 120rpx;
	}

	.pop input {
		width: 600rpx;
		height: 60rpx;
		border: 1rpx solid #999999;
		padding: 0 10rpx;
		box-sizing: border-box;
	}
</style>
