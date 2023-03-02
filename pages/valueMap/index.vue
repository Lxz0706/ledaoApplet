<template>
	<view class="contact">
		<view class="page-section page-section-gap">
			<view class="contactTitle">区域选择：</view>
			<view class="contactsLable">
				<!-- <uni-data-picker id="city" placeholder="请选择地址" popup-title="请选择城市" collection="opendb-city-china"
					field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
					parent-field="parent_code" @change="onchange" @nodeclick="onnodeclick">
				</uni-data-picker> -->
				<wangding-pickerAddress class="city" @change="onchange">{{city}}</wangding-pickerAddress>
			</view>
			<view class="contactTitle">
				地址：
			</view>
			<view class="contactsLable">
				<uni-easyinput id="address" v-model="address" type="text"
					placeholder="请输入要搜索的地址地址中,请包含城市名称，否则会影响解析效果，如：‘无锡市建筑西路559号’" @blur="formSubmit">
				</uni-easyinput>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						距离：
					</view>
					<view class="uni-list-cell-db">
						<picker :range="list" range-key="waterWorkName" @change="schoolChange">
							<view style="margin-left: 10px;" class="uni-input">
								{{before_school? before_school: '请选择距离...' }}
							</view>
						</picker>
					</view>
					<view class="uni-list-cell-left">
						债权类型：
					</view>
					<view class="uni-list-cell-db">
						<picker :range="typeList" range-key="typeName" @change="typeChange">
							<view style="margin-left: 10px;" class="uni-input">
								{{before_type? before_type: '请选择债权类型...' }}
							</view>
						</picker>
					</view>
					<view class="uni-list-cell-left">
						司法状态：
					</view>
					<view class="uni-list-cell-db">
						<picker :range="judicialList" range-key="judicialName" @change="judicialChange">
							<view style="margin-left: 10px;" class="uni-input">
								{{before_judicial? before_judicial: '请选择司法状态...' }}
							</view>
						</picker>
					</view>
				</view>
			</view>
			<map class="map" style="width: 100%; height: 90vh;" :layer-style='5' :style="{height:mapheight}"
				:longitude="currLoca.longitude" :latitude="currLoca.latitude" :show-location="true" :markers="markers"
				:circles="circles" @markertap="fetchShopDetail" @labeltap="fetchShopDetail"
				@callouttap="fetchShopDetail" :scale="11" id="map" ref="map" @tap="tap">

				<view v-if="viewshow" class="uni-row-show">
					<view class="uni-flex uni-row">
						<text>标题：</text>
						<view style="-webkit-flex: 1;flex: 1;">
							<text class="flex flex-direction">{{itemTitle}}</text>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<text>性质：</text>
						<view style="-webkit-flex: 1;flex: 1;">
							<text class="flex flex-direction">{{itemType}}</text>
						</view>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>地址：</text>
						<text class="flex flex-direction">{{itemAddress}}</text>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>网址：</text>
						<text class="flex flex-direction" @click="copyLink(itemLink)">{{itemLink}}</text>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>成交价格：</text>
						<text class="flex flex-direction">{{itemCurrentprice}}(元)</text>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>状态：</text>
						<text class="flex flex-direction">{{tags}}</text>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>距离：</text>
						<text class="flex flex-direction">{{latLon}}</text>
					</view>
					<view class="uni-flex uni-row" style="-webkit-flex: 1;flex: 1;">
						<text>估值计算：</text>
						<text class="flex flex-direction" @click="toValuation(itemId,latLon)">估值计算</text>
					</view>
				</view>
			</map>
		</view>
	</view>
</template>

<script>
	//var QQMapWx = require('./qqmap-wx-jssdk.js');
	import QQMapWx from '../../common/qqmap-wx-jssdk.min.js';
	var self;
	var qqmapsdk;
	export default {
		data() {
			return {
				markers: [],
				currLoca: {},
				circles: [],
				list: [],
				before_school: '',
				typeList: [],
				before_type: '',
				type: '',
				radius: '',
				cireclePoint: '',
				address: '',
				viewshow: false,
				itemTitle: '',
				itemType: '',
				itemAddress: '',
				itemLink: '',
				itemCurrentprice: '',
				itemEndTime: '',
				tags: '',
				link: '',
				judicialList: [],
				judicialName: '',
				before_judicial: '',
				itemCity: '',
				city: '请选择地址',
				title: 'Hello',
				itemId: '',
				latLon: ''
			}
		},
		onLoad() {
			qqmapsdk = new QQMapWx({
				key: '4PLBZ-Z77WI-WAXG5-5CGO7-X6JYZ-ERBD4'
			});
			this.init();
		},
		computed: {
			mapheight() {
				let data = ''
				if (this.bottomData) {
					if (this.upTop) {
						data = '50px'
					} else {
						data = '200px'
					}
				} else {
					data = '90vh'
				}
				return data
			},
			coverbottom() {
				let data = ''
				if (this.bottomData) {
					data = '20rpx'
				} else {
					data = '100rpx'
				}
				return data
			}
		},
		methods: {
			onchange(data) {
				this.city = data.data.join('')
				this.itemCity = data.data[1];
			},
			tap() { //地图空白处点击事件
				this.viewshow = false;
			},
			init() {
				let that = this;
				that.getValueMapGap();
				that.getType();
				that.getJudicialList();
				uni.getLocation({
					geocode: true,
					type: 'gcj02',
					async success(res) {},
					async complete(res) {
						// 如果同意位置授权获取机主位置，否则默认北京天安门经纬度
						if (res.errMsg == 'getLocation:ok') {
							that.currLoca = res;
							that.cireclePoint = res.longitude + "," + res.latitude;
							qqmapsdk.reverseGeocoder({
								location: {
									longitude: res.longitude,
									latitude: res.latitude
								},
								success: function(res) {
									that.address = res.result.address;
								},
								fail: function(res) {
									console.log(res, 'fail')
								}
							})

						} else {
							that.currLoca = {
								longitude: 116.39747,
								latitude: 39.908823,
							}
						}
					}
				});
			},
			getLocal(lon, lat) {
				qqmapsdk.reverseGeocoder({
					location: {
						longitude: lon,
						latitude: lat
					},
					success: function(res) {
						return res.result.address;
					},
					fail: function(res) {
						console.log(res, 'fail')
					}
				})
			},
			getValueMapGap() {
				this.viewshow = false;
				this.$request("/system/judicial/getValueMapGap", "POST", {}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(resDict => {
					this.list = resDict;
				})
			},
			getType() {
				this.viewshow = false;
				this.$request("/system/judicial/getType", "POST", {}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(resDict => {
					this.typeList = resDict;
				})
			},
			getJudicialList() {
				this.viewshow = false;
				this.$request("/system/judicial/getJudicialList", "POST", {}, {
					"content-type": "application/x-www-form-urlencoded",
					'cookie': uni.getStorageSync("setCookie")
				}).then(resDict => {
					this.judicialList = resDict;
				})
			},
			async getList() {
				let that = this;
				that.viewshow = false;
				if (that.itemCity === '' || that.itemCity === null) {
					uni.showToast({
						title: '请选择地区',
						duration: 2000,
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '加载中...'
				})
				that.$request("/system/judicial/valuationmapList", "POST", {
					itemType: that.type,
					radius: that.radius,
					circlePoint: that.cireclePoint,
					itemStatus: that.judicialName,
					itemCity: that.itemCity
				}).then(res => {
					let arr = res;
					let temArr = [];
					arr.forEach(item => {
						let labelColor = '#aaaab0'
						let iconPath = '../../static/icon/dw.png';
						if (item.itemType === '住宅用房') {
							iconPath = '../../static/icon/zzyf.png';
						} else if (item.itemType === '商业用房') {
							iconPath = '../../static/icon/syyf.png';
						} else if (item.itemType === '工业用房') {
							iconPath = '../../static/icon/gyyf.png';
						} else if (item.itemType === '其他用房') {
							iconPath = '../../static/icon/qtyf.png';
						} else if (item.itemType === '土地') {
							iconPath = '../../static/icon/td.png';
						} else {
							iconPath = '../../static/icon/dw.png';
						}
						let markObj = {
							"id": parseInt(item.id),
							"latitude": item.latitude,
							"longitude": item.longitude,
							"width": 20,
							"height": 20,
							"zINdex": item.id + 1,
							"itemTitle": item.itemTitle,
							"itemType": item.itemType,
							"itemAddress": item.itemAddress,
							"itemLink": item.itemLink,
							"itemCurrentprice": item.itemCurrentprice,
							"itemEndTime": item.itemEndTime,
							"tags": item.tags,
							'itemId': item.itemId,
							'latLon': item.latLon,
							iconPath,
						}
						temArr.push(markObj);
					});
					let newPoint = {};
					newPoint.lat = that.latitude
					newPoint.lng = that.longitude
					that.markers = temArr;
					setTimeout(() => {
						uni.hideLoading()
					}, 4000);
				})
			},
			fetchShopDetail(e) {
				var that = this;
				wx.login({
					success: function(res) {
						if (res.code) {
							that.$request("/system/judicial/decodeUserInfo", "GET", {
								code: res.code
							}).then(res => {
								if (0 === res.code) {
									that.showTest(e);
								} else {
									uni.showToast({
										title: '未关注公众号！',
										icon: 'error',
										duration: 5000
									})
								}
							})
						}
					}
				})
			},
			async showTest(e) {
				this.viewshow = true;
				let obj = this.markers[this.markers.findIndex((role) => role.id === e.detail.markerId)];
				this.itemTitle = obj.itemTitle;
				this.itemType = obj.itemType;
				this.itemAddress = obj.itemAddress;
				this.itemLink = obj.itemLink;
				this.itemCurrentprice = obj.itemCurrentprice;
				this.itemEndTime = obj.itemEndTime;
				this.tags = obj.tags;
				this.itemId = obj.itemId;
				this.latLon = obj.latLon;

			},
			formSubmit() {
				this.viewshow = false;
				let that = this;
				if (this.radius == '') {
					this.radius = 1000;
				}
				//调用地址解析接口
				qqmapsdk.geocoder({
					//获取表单传入地址 e.detail.value.geocoder
					address: that.itemCity + that.address, //地址参数
					success: (res) => { //成功后的回调
						let obj = {};
						let tempArr = [];
						var res = res.result;
						obj.id = 1
						obj.latitude = res.location.lat
						obj.longitude = res.location.lng
						obj.width = 30
						obj.height = 20
						obj.radius = parseInt(that.radius)
						obj.strokeWidth = 2
						obj.fillColor = '#e6060a6a'
						tempArr.push(obj);
						that.currLoca = {
							longitude: res.location.lng,
							latitude: res.location.lat,
						}
						that.circles = tempArr;
						that.latitude = res.location.lat
						that.longitude = res.location.lng
						that.cireclePoint = res.location.lng + ',' + res.location.lat
					},
					fail: (error) => {
						console.error(error);
					},
					complete: (res) => {}
				})
			},
			schoolChange(e) {
				this.viewshow = false;
				const index = e.target.value
				this.before_school = this.list[index].waterWorkName;
				this.radius = this.list[index].url;
				this.formSubmit();
				if (this.type !== '' && this.judicialName !== '') {
					if (this.address == '') {
						let obj = {};
						let tempArr = [];
						obj.id = 1
						obj.longitude = parseInt(this.longitude)
						obj.latitude = parseInt(this.latitude)
						obj.width = 30
						obj.height = 20
						obj.radius = parseInt(this.radius)
						obj.strokeWidth = 2
						obj.fillColor = '#e6060a6a'
						tempArr.push(obj);
						this.currLoca = {
							longitude: this.longitude,
							latitude: this.latitude,
						}
						this.circles = tempArr;
						this.cireclePoint = this.longitude + "," + this.latitude
						this.getList();
					} else {
						this.getList();
					}
				}
			},
			typeChange(e) {
				this.viewshow = false;
				const index = e.target.value;
				this.before_type = this.typeList[index].url;
				this.type = this.typeList[index].url;
				if (this.radius !== '' && this.judicialName !== '') {
					if (this.address == '') {
						let obj = {};
						let tempArr = [];
						obj.id = 1
						obj.longitude = parseInt(this.longitude)
						obj.latitude = parseInt(this.latitude)
						obj.width = 30
						obj.height = 20
						obj.radius = parseInt(this.radius)
						obj.strokeWidth = 2
						obj.fillColor = '#e6060a6a'
						tempArr.push(obj);
						this.currLoca = {
							longitude: this.longitude,
							latitude: this.latitude,
						}
						this.circles = tempArr;
						this.cireclePoint = this.longitude + "," + this.latitude
						this.getList();
					} else {
						this.getList();
					}
				}
			},
			judicialChange(e) {
				this.viewshow = false;
				const index = e.target.value
				this.before_judicial = this.judicialList[index].judicialName
				this.judicialName = this.judicialList[index].url;
				if (this.radius !== '' && this.type !== '') {
					if (this.address == '') {
						let obj = {};
						let tempArr = [];
						obj.id = 1
						obj.longitude = parseInt(this.longitude)
						obj.latitude = parseInt(this.latitude)
						obj.width = 30
						obj.height = 20
						obj.radius = parseInt(this.radius)
						obj.strokeWidth = 2
						obj.fillColor = '#e6060a6a'
						tempArr.push(obj);
						this.currLoca = {
							longitude: this.longitude,
							latitude: this.latitude,
						}
						this.circles = tempArr;
						this.cireclePoint = this.longitude + "," + this.latitude
						this.getList();
					} else {
						this.getList();
					}
				}
			},
			copyLink(link) {
				uni.setClipboardData({
					data: link,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					}
				});
			},
			toValuation(itemId, latLon) {
				uni.redirectTo({
					url: '/pages/valuation/index?itemId=' + itemId + "&latLon=" + JSON.stringify(latLon),
					fail(error) {
						console.log(error);
					}
				})
			}
		}

	}
</script>

<style lang='less' scoped>
	.map-container {
		position: relative;
		overflow: hidden;

		.cover-view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 80rpx;
			height: 80rpx;
			color: #484848;
			background-color: #fff;
			background-size: 120rpx 120rpx;
			background-position: center center;
			position: absolute;
			bottom: 100rpx;
			right: 32rpx;
		}

		.cover-image {
			display: inline-block;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.uni-row-show {
		margin: upx;
		border-radius: 25rpx;
		position: absolute;
		left: 70rpx;
		width: 650rpx;
		color: #000000;
		background-color: #ffffff;
	}

	.uni-row {
		width: 95%;
		margin: 5px auto !important;
		line-height: 20px
	}

	.uni-row>text:last-child {
		color: gray;
		width: 67%;
	}

	.close {
		width: 15px;
		height: 15px;
		margin-top: -10rpx;
		margin-right: -30rpx;
	}

	.audio {
		padding: 20upx;
	}
</style>
<style>
	@import url("@/css/index.css");
</style>
