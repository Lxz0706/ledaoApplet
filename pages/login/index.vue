<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage + '.png'"></image>
			</view>
			<!-- <view class="icon_title">乐道</view> -->
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="adminData" type="text" placeholder="请输入账号" :focus="isFocus"></wInput>
				<wInput v-model="passData" type="password" placeholder="请输入密码" :isShowPass="true">
				</wInput>
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				//logo图片
				logoImage: '../../static/icon/ledao',
				adminData: '', //账号
				passData: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: false, // 是否聚焦
				openId: '',
				unionId: '',
				sessionId: '',
				setCookie: '',
				userName: ''
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			this.getOpenId()
		},
		
		onShow() {
		    wx.hideHomeButton();
		},

		methods: {
			
			// 获取本地存储openId
			getOpenId() {
				const _this = this
				uni.getStorage({
					key: 'getOpenids',
						success: function (res) {
							_this.openId = res.data
								// console.log("res",res.data);
						}
				})
				uni.getStorage({
					key: 'getUnionId',
						success: function (res) {
							_this.unionId = res.data
								// console.log("res",res.data);
						}
				})
			},

			startLogin(e) {
				const _this = this
				console.log("eeeee",e)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.adminData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请填写密码'
					});
					return;
				}
				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 2000)
				this.$requestSession("/weChatLoginUp","POST",{
					username: _this.adminData,
					password: _this.passData,
					rememberMe: true
				}).then(res => {
					uni.showLoading({ 
						title: '登录中'
					});
					// console.log('rememberMe',res)
					// uni.removeStorageSync('setCookie')
					console.log(res.header["Set-Cookie"])
					uni.setStorageSync('setCookie',res.header["Set-Cookie"])
					this.$request("/saveOpenid","POST",{
						openId: _this.openId,
						unionId: _this.unionId
					},{
						"content-type": "application/x-www-form-urlencoded",
						'cookie': uni.getStorageSync("setCookie")
					})
					if(res.data.code === 0) {
							_this.userName = res.data.data.roles
							uni.setStorageSync("loginName",res.data.data.loginName)
							uni.setStorageSync("userName",res.data.data.userName)
							uni.setStorageSync("isDailyRemind",res.data.data.isDailyRemind)
							_this.userName.map((item)=> {
								if(item.roleKey == "documentAdmin") {
									uni.setStorageSync('documentAdmin',true)
								} else {
									uni.setStorageSync('documentAdmin',false)
								}
							})
							// uni.showToast({
							// 	icon: 'success',
							// 	position: 'bottom',
							// 	title: '登录成功'
							// });
							uni.hideLoading();
							setTimeout(function() {
								uni.switchTab({
									url: "../home/index",
									success:function(){
										let page = getCurrentPages().pop()
										if(!page) return
										page.onLoad()
									}
								})
							},1000)
					} else {
						_this.passData = ""
						uni.showToast({
							icon: 'error',
							position: 'bottom',
							title: '账号或密码错误',
							duration: 3000
						});
						// uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("../../css/main.css");
</style>
