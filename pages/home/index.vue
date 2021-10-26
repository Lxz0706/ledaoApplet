<template>
	<view class='container ct-bg'>
		<view class='home-collapse'>
			<view class="line"></view>
			<view class="collapse">
				<view class="title">{{collapseTitle}}</view>
				<view class="list">
					<view class="collapse-list" v-for="(item,index) in listCollapse" :key="index"
						@click="collapseClick(index)">
						<view class="collapse-list-img">
							<image class="icon_tu_collapse" :src="item.menuImg + '.svg'" mode="widthFix"></image>
						</view>
						<view class="collapse-lit-text">
							<view class="icon_title">{{item.detailName}}</view>
						</view>
					</view>
				</view>
			</view>

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
			}
		},

		onLoad(options) {
			// 判断是否登陆过
			if(!uni.getStorageSync("loginSuccess")) {
				this.loginCode()
			}
		},

		onShow() {
		},

		mounted() {
		},

		methods: {
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
								this.$requestSession('/wechatLogin', "POST", {
									openId: resOpenid.data.openId
								}).then(resWeChatLogin => {
									console.log('resWeChatLogin----------------------',resWeChatLogin)
									console.log('登录是否成功', resWeChatLogin.data.code)
									if (resWeChatLogin.data.code === 500) {
										
										uni.showToast({
											title: resWeChatLogin.data.msg,
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
										var cookie =resWeChatLogin.header['Set-Cookie']
										// 字符串分割成数组
										var cookieArray = cookie.split(/,(?=[^,]*=)/)
										// 分号拼接数组
										var newCookie = cookieArray.join(';')
										// 存储拼接后的cookie
										try {
										  uni.setStorageSync('setCookie', newCookie)
										} catch (error) {
										  log.error('setStorageSync cookie fail')
										}
										uni.setStorageSync("loginName",resWeChatLogin.data.data.loginName)
										uni.setStorageSync("userName",resWeChatLogin.data.data.userName)
										uni.setStorageSync("isDailyRemind",resWeChatLogin.data.data.isDailyRemind)
										// const getCookie = uni.getStorageSync("setCookie")
										// if (getCookie) {
											uni.showToast({
												icon: 'success',
												position: 'bottom',
												title: '登录成功'
											});
										// } else {
										// 	uni.redirectTo({
										// 		url: "../../pages/login/index"
										// 	})
										// }
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
