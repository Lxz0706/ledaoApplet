<template>
	<view class='container ct-bg'>
		<view class='home-collapse'>
			<!-- 快捷入口 -->
			<!-- 			<uni-collapse v-if="listCollapse !== []">
				<uni-collapse-item :title="collapseTitle" :open="true"> -->
			<view class="line"></view>
			<view class="collapse">
				<view class="title">{{collapseTitle}}</view>
				<view class="list">
					<view class="collapse-list" v-for="(item,index) in listCollapse" :key="index"
						@click="collapseClick(index)">
						<!-- <view class="collapse-list-img">
										<image v-if="item.menuId == 1" class="icon_tu" :src="menuImg1 + '.svg'" mode="widthFix"></image>
										<image v-else-if="item.menuId == 2" class="icon_tu" :src="menuImg2 + '.svg'" mode="widthFix"></image>
										<image v-else-if="item.menuId == 3" class="icon_tu" :src="menuImg3 + '.svg'" mode="widthFix"></image>
										<image v-else-if="item.menuId == 4" class="icon_tu" :src="menuImg4 + '.svg'" mode="widthFix"></image>
									</view> -->
						<view class="collapse-list-img">
							<image class="icon_tu_collapse" :src="item.menuImg + '.svg'" mode="widthFix"></image>
						</view>
						<view class="collapse-lit-text">
							<view class="icon_title">{{item.detailName}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 				</uni-collapse-item>
			</uni-collapse> -->

			<view class="line"></view>
			<!-- home list -->
			<view class="list-two home-list-bg">
				<view class="home-list" v-for="(item,index) in listHome" :key="index" @click="homeListClick(index)">
					<view class="home-list-img">
						<image class="icon_tu" :src="item.modularIcon + '.svg'" mode="widthFix"></image>
					</view>
					<view class="home-lit-text">
						<view class="icon_title">{{item.modularName}}</view>
					</view>
				</view>
				<!-- <view class="saoma" @click="midBtn">
					<view class="home-list-img">
						<image class="icon_tu" src="#" mode="widthFix"></image>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * author        chenjie
	 * time          2021-9-1 10:02:54 ?F10: AM?
	 * description   
	 */


	export default {
		name: 'home',
		data() {
			return {
				collapseTitle: '快捷入口',
				listCollapse: [{
						menuImg: '/static/icon/journal-add',
						detailName: '日志录入'
					},
					{
						menuImg: '/static/icon/journal-look',
						detailName: '日志查看'
					},
					{
						menuImg: '/static/icon/cus-edit',
						detailName: '客户录入'
					},
					{
						menuImg: '/static/icon/journal-look',
						detailName: '客户查看'
					}
				],
				listHome: [{
						modularName: '日志管理',
						modularIcon: '/static/icon/journal-mang'
					},
					{
						modularName: '客户管理',
						modularIcon: '/static/icon/cus-mang'
					}
				],
				openId: ''
				// menuImg1: '/static/icon/journal-add',
				// menuImg2: '/static/icon/journal-look',
				// menuImg3: '/static/icon/cus-edit',
				// menuImg4: '/static/icon/journal-look'
			}
		},

		onLoad(options) {
			// this.getHomeList()
						this.loginCode()
		},

		onShow() {
		},

		mounted() {
			// this.islogin()
			// this.loginCode()
		},

		methods: {
			// 判断是否登录过
			// islogin() {
			// 	const value = uni.getStorageSync('setCookie');
			// 	if(value) {
			// 		uni.showToast({
			// 			icon: 'success',
			// 			position: 'bottom',
			// 			title: '登录成功'
			// 		});
			// 		this.getHomeList()
			// 	} else {
			// 		this.loginCode()
			// 	}
			// },
			// 快捷入口
			// getListCollapse() {
			// 	this.$request("/system/oper/latelyList", "POST", {}, {
			// 		"content-type": "application/x-www-form-urlencoded",
			// 		'cookie': uni.getStorageSync("setCookie")
			// 	}).then(resColl => {
			// 		this.listCollapse = resColl.rows
			// 		console.log('resColl', resColl)
			// 	})
			// },
			// 登录获取code换取openId
			loginCode() {
				uni.login({
					success: (resLogin) => {
						console.log('code--------------', resLogin)
						this.$request('/getOpenid', 'POST', {
							jsCode: resLogin.code
						}).then(resOpenid => {
							console.log('/Openid-------------', resOpenid)
							this.openId = resOpenid.data.openId
							if (resOpenid.code === 0) {
								this.$request('/wechatLogin', "POST", {
									openId: resOpenid.data.openId
								}).then(resWeChatLogin => {
									console.log('登录是否成功', resWeChatLogin.code)
									if (resWeChatLogin.code === 500) { 
										
										uni.showToast({
											title: resWeChatLogin.msg,
											position: 'bottom',
											icon: 'none',
											mask: true
										});
										setTimeout(function() {
											uni.redirectTo({
												url: "../../pages/login/index"
											})
										}, 1000);
									} else {
										const cookie = uni.getStorageSync("setCookie")
										if (cookie) {
											uni.showToast({
												icon: 'success',
												position: 'bottom',
												title: '登录成功'
											});
										} else {
											uni.redirectTo({
												url: "../../pages/login/index"
											})
										}
									}
								})
								uni.setStorage({
									key: 'getOpenids',
									data: resOpenid.data.openId,
									success: function() {
										console.log('success');
									}
								})
								uni.setStorage({
									key: 'getUnionId',
									data: resOpenid.data.unionId,
									success: function() {
										console.log('success');
									}
								})
							}
						})
					}
				})
			},

			// midBtn() {
			// 	uni.scanCode({
			// 		onlyFromCamera: true,
			// 		scanType: 'qrCode',
			// 		success: function(res) {
			// 			console.log('签到成功', res)
			// 			var urlString = res.rawData;
			// 			if (res.errMsg == "scanCode:ok") {
			// 				// uni.showToast({
			// 				// 	title:'签到成功',
			// 				// 	icon:'success'
			// 				// })
			// 				// var sa = JSON.parse(urlString)
			// 				// console.log('aa--aa',sa)
			// 				// uni.navigateTo({
			// 				// 	url:'../../pages/qrCode/qrCode?url='+encodeURIComponent(JSON.stringify(urlString))
			// 				// })
			// 				uni.navigateTo({
			// 					url: '../../pages/qrCode/qrCode?url=' + encodeURIComponent(JSON
			// 						.stringify(urlString))
			// 				})
			// 			} else {
			// 				uni.showToast({
			// 					title: '二维码无效',
			// 					icon: 'none'
			// 				})
			// 			}
			// 		},
			// 		fail() {
			// 			uni.showToast({
			// 				title: '二维码无效',
			// 				icon: 'none'
			// 			})
			// 		}
			// 	});
			// },

			// getHomeList() {
			// 	this.$request("/system/appletmodular/list","POST",{
			// 	},{
			// 		"content-type": "application/x-www-form-urlencoded",
			// 		'cookie': uni.getStorageSync('setCookie')
			// 	}).then(res => {
			// 		this.listHome = res.rows
			// 		console.log('list',res)
			// 	})
			// },

			homeListClick(e) {
				console.log(e)
				if (e === 0) {
					uni.navigateTo({
						url: '../journal/index'
					})
				} else if (e === 1) {
					uni.navigateTo({
						url: '../curstomer/index'
					})
				}
			},

			collapseClick(e) {
				console.log(e)
				if (e == 0) {
					uni.redirectTo({
						url: '/common/journalInfo/journal?isChat=0'
					})
				} else if (e == 1) {
					uni.redirectTo({
						url: '/common/journalInfo/journalDepart'
					})
				} else if (e == 2) {
					uni.redirectTo({
						url: '/pages/curstomer/addCurstomer/addAndEdit'
					})
				} else if (e == 3) {
					uni.redirectTo({
						url: '/pages/curstomer/addCurstomer/addAndList'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.list-two {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: start;

		.home-list {
			width: 30%;
			text-align: center;
			height: 15vh;
			margin-top: 30rpx;
		}
	}

	.icon_tu {
		width: 100rpx;
	}

	.icon_tu_collapse {
		width: 60rpx;
	}

	.home-list-bg {
		background-color: #fff;
		margin: 30rpx;
		border-radius: 40rpx;
	}

	.line {
		width: 100%;
		height: 30rpx;
		background-color: #fff;
		margin: 20rpx 0
	}
	
	.collapse-list-img {
		text-align: center;
	}
	
	.collapse {
		background-color: #fff;
		border-radius: 20px;
		padding: 15rpx;
		margin: 30rpx;
	}
	
	.title {
		margin-bottom: 40rpx;
	}
</style>

<style>
		@import url("@/css/index.css");
</style>
