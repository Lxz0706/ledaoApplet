<template>
	<view class="contact">
		<view class="isNotShow">
			<uni-easyinput v-model="valuationId"></uni-easyinput>
		</view>
		<view>类型：</view>
		<view>
			<uni-data-select v-model="itemType" :localdata="selectTypeList" @change="typeChange"></uni-data-select>
		</view>
		<view>状态：</view>
		<view>
			<uni-data-select v-model="itemStatus" :localdata="selectStatusList" @change="statusChange">
			</uni-data-select>
		</view>
		<view v-if="showTd">
			<view>参考物土地面积（m²）： </view>
			<view>
				<uni-easyinput v-model="area" placeholder="请输入参考物土地面积"></uni-easyinput>
			</view>
			<view>参考物有证建筑面积（m²）： </view>
			<view>
				<uni-easyinput v-model="building1" placeholder="请输入参考物有证建筑面积"></uni-easyinput>
			</view>
			<view>赋值单价（有证）（元）： </view>
			<view>
				<uni-easyinput v-model="price1" placeholder="请输入赋值单价（有证）"></uni-easyinput>
			</view>
			<view>参考物无证建筑面积（m²）： </view>
			<view>
				<uni-easyinput v-model="building2" placeholder="请输入参考物无证建筑面积"></uni-easyinput>
			</view>
			<view>赋值单价（无证）（元）： </view>
			<view>
				<uni-easyinput v-model="price2" placeholder="请输入赋值单价（无证）"></uni-easyinput>
			</view>
		</view>
		<view v-else>
			<view>参考物建筑面积（m²）： </view>
			<view>
				<uni-easyinput v-model="building" placeholder="请输入参考物建筑面积"></uni-easyinput>
			</view>
		</view>
		<view>成交价格（元）： </view>
		<view>
			<uni-easyinput v-model="itemCurrentPrice" placeholder="请输入成交价格"></uni-easyinput>
		</view>
		<view>评估价/市场价（元）： </view>
		<view>
			<uni-easyinput v-model="itemMarketPrice" placeholder="请输入评估价/市场价"></uni-easyinput>
		</view>
		<view v-if="showTd">
			<view>土地单价： </view>
			<view>
				<uni-easyinput v-model="areaUnitPrice" placeholder="请输入土地单价"></uni-easyinput>
			</view>
		</view>
		<view v-else>
			<view>建筑物单价 ： </view>
			<view>
				<uni-easyinput v-model="unitPrice" placeholder="请输入建筑物单价"></uni-easyinput>
			</view>
		</view>
		<view>与参考物之间距离（米）： </view>
		<view>
			<uni-easyinput v-model="latLon" placeholder="请手动输入与参考物之间距离(米)"></uni-easyinput>
		</view>
		<view>
			<button type="primary" @click="getPrice()">单价计算</button>
		</view>

		<view v-if="showTd">
			<view>标的物土地面积（m²）：</view>
			<view>
				<uni-easyinput v-model="areaSpace" placeholder="请输入标的物土地面积"></uni-easyinput>
			</view>
			<view>标的物有证建筑面积（m²）：</view>
			<view>
				<uni-easyinput v-model="building3" placeholder="请输入标的物有证建筑面积"></uni-easyinput>
			</view>
			<view>赋值单价（有证）（元）：</view>
			<view>
				<uni-easyinput v-model="price3" placeholder="请输入赋值单价（有证）"></uni-easyinput>
			</view>
			<view>标的物无证建筑面积（m²）：</view>
			<view>
				<uni-easyinput v-model="building4" placeholder="请输入标的物无证建筑面积"></uni-easyinput>
			</view>
			<view>赋值单价（无证）（元）：</view>
			<view>
				<uni-easyinput v-model="price4" placeholder="请输入赋值单价（无证）"></uni-easyinput>
			</view>
		</view>
		<view v-else>
			<view>标的物建筑面积（m²）：</view>
			<view>
				<uni-easyinput v-model="floorSpace" placeholder="请输入标的物建筑面积"></uni-easyinput>
			</view>
		</view>
		<view>系数1 (不填默认为1)：</view>
		<view>
			<uni-easyinput v-model="num1" placeholder="请输入系数1 (不填默认为1)"></uni-easyinput>
		</view>
		<view>系数2 (不填默认为1)：</view>
		<view>
			<uni-easyinput v-model="num2" placeholder="请输入系数2 (不填默认为1)"></uni-easyinput>
		</view>
		<view>参考物1估值总价：</view>
		<view>
			<uni-easyinput v-model="valuation" placeholder="参考物1估值总价"></uni-easyinput>
		</view>
		<view>
			<button type="primary" @click="getValuationPrice()">总价计算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemType: '',
				itemStatus: '',
				building: '',
				area: '',
				building1: '',
				price1: '',
				building2: '',
				price2: '',
				itemCurrentPrice: '',
				itemMarketPrice: '',
				unitPrice: '',
				areaUnitPrice: '',
				latLon: '',
				floorSpace: '',
				areaSpace: '',
				building3: '',
				price3: '',
				building4: '',
				price4: '',
				num1: '',
				num2: '',
				valuation: '',
				valuationId: '',
				itemId: '',
				mainId: '',
				showTd: false,
				typeValue: 0,
				showId: false,
				selectTypeList: [{
					value: 0,
					text: "请选择类型"
				}, {
					value: 1,
					text: "住宅用房"
				}, {
					value: 2,
					text: "商业用房"
				}, {
					value: 3,
					text: "工业用房"
				}],
				statusValue: 0,
				selectStatusList: [{
					value: 0,
					text: "请选择状态"
				}, {
					value: 1,
					text: "成交"
				}, {
					value: 2,
					text: "流拍"
				}]
			}
		},
		onLoad(option) {
			this.itemId = option.itemId;
			this.latLon = option.latLon;
			this.getJudicial();
		},
		methods: {
			async getJudicial() {
				this.$request("/system/judicial/selectJudicial", "POST", {
					itemId: this.itemId
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
						let arr = res;
						let temArr = [];
						arr.forEach(item => {
							this.floorSpace = item.floorSpace;
							this.itemCurrentPrice = item.itemCurrentPrice;
							this.itemMarketPrice = item.itemMarketPrice;
							if ('成交' === item.itemStatus) {
								this.itemStatus = 1;
							} else if ('流拍' == item.itemStatus) {
								this.itemStatus = 2;
							}
						
							if ('住宅用房' === item.itemType) {
								this.itemType = 1;
							} else if ('商业用房' === item.itemType) {
								this.itemType = 2;
							} else if ('工业用房' === item.itemType) {
								this.itemType = 3;
								this.showTd = true;
							}
							// this.itemStatus = item.itemStatus;
							// this.itemType = item.itemType;
						})
					}
				})
			},
			//类型change事件
			typeChange(e) {
				let index = e;
				if (e === 3) {
					this.showTd = true;
				} else {
					this.showTd = false;
				}
				if (!this.isEmpty(this.itemStatus)) {
					//this.getPrice();
				}
			},
			statusChange(e) {
				if (!this.isEmpty(this.itemType)) {
					//this.getPrice();
				}
			},
			getPrice() {
				//类型
				let itemType = this.itemType;
				//拍卖状态
				let itemStatus = this.itemStatus;
				//系数1
				let num1 = this.num1;
				//系数2
				let num2 = this.num2;
				//成交价
				let itemCurrentPrice = this.itemCurrentPrice;
				//参考物建筑面积
				let building = this.building;
				//评估价/市场价
				let itemMarketPrice = this.itemMarketPrice;
				//参考物有证建筑面积
				let building1 = this.building1;
				//参考物无证建筑面积
				let building2 = this.building2;
				//参考物有证建筑面积赋值单价
				let price1 = this.price1;
				//参考物无证建筑面积赋值单价
				let price2 = this.price2;
				//参考物土地面积
				let area = this.area;
				let price;
				let prices;
				if (this.isEmpty(num1)) {
					this.num1 = 1;
				}
				if (this.isEmpty(num2)) {
					this.num2 = 1;
				}
				if (3 === itemType) {
					building = area;
					prices = (building1 * price1) + (building2 * price2);
				}
				if (this.isEmpty(prices)) {
					prices = 0;
				}
				if (1 === itemStatus) {
					if (!this.isEmpty(itemMarketPrice)) {
						if (itemCurrentPrice > itemMarketPrice) {
							price = (((itemCurrentPrice * num1) - prices) / building);
						} else {
							price = ((itemCurrentPrice - prices) / building);
						}
					} else {
						price = ((itemCurrentPrice - prices) / building);
					}
				} else if (2 === itemStatus) {
					if (itemCurrentPrice >= itemMarketPrice) {
						price = (((itemCurrentPrice * 0.8) - prices) / building);
					} else {
						price = (((itemMarketPrice * 0.56) - prices) / building);
					}
				}
				if (3 === itemType) {
					//标的物单价
					this.unitPrice = price;
					this.areaUnitPrice = price;
				} else {
					this.unitPrice = price;
				}
				this.addValuation();
			},
			getValuationPrice() {
				this.addMain();
				//类型
				let itemType = this.itemType;
				//标的物建筑面积
				let floorSpace = this.floorSpace;
				//系数1
				let num1 = this.num1;
				//系数2
				let num2 = this.num2;
				//标的物土地面积
				let areaSpace = this.areaSpace;
				//标的物有证建筑面积
				let building3 = this.building3;
				//标的物无证建筑面积
				let building4 = this.building4;
				//标的物有证建筑面积赋值单价
				let price3 = this.price3;
				//标的物无证建筑面积赋值单价
				let price4 = this.price4;
				//结果
				let valuation;
				//单价
				let price;

				if (3 === itemType) {
					price = this.areaUnitPrice;
				} else {
					price = this.unitPrice;
				}

				if (this.isEmpty(num1)) {
					num1 = 1;
				}
				if (this.isEmpty(num2)) {
					num2 = 1;
				}
				if (3 === itemType) {
					valuation = ((areaSpace * num1 * price) + ((building3 * price3) + (building4 * price4)));
				} else {
					valuation = (floorSpace * num1 * num2 * price);
				}
				this.valuation = valuation;
				this.updateValuationModel();
			},
			isEmpty(res) {
				if (typeof res == "undefined" || res == null || res == "") {
					return true;
				} else {
					return false;
				}
			},
			async addValuation() {
				this.$request("/system/valuationModel/add", "POST", {
					"itemType": this.itemType,
					"itemStatus": this.itemStatus,
					"itemCurrentPrice": this.itemCurrentPrice,
					"num1": this.num1,
					"num2": this.num2,
					'building': this.building,
					'itemMarketPrice': this.itemMarketPrice,
					'building1': this.building1,
					'building2': this.building2,
					'price1': this.price1,
					'price2': this.price2,
					'area': this.area,
					'unitPrice': this.unitPrice,
					'areaUnitPrice': this.areaUnitPrice
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					this.valuationId = res.data;
				})
			},
			async updateValuationModel() {
				this.$request("/system/valuationModel/edit", "POST", {
					'valuationId': this.valuationId,
					'mainId': this.mainId,
					"num1": this.num1,
					"num2": this.num2,
					'floorSpace': this.floorSpace,
					'building3': this.building3,
					'building4': this.building4,
					'price3': this.price3,
					'price4': this.price4,
					'areaSpace': this.areaSpace,
					'valuation': this.valuation
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					this.valuationId = res.data;
				})
			},
			addMain() {
				this.$request("/system/valuationModel/addMain", "POST", {
					itemType: this.itemType,
					itemStatus: this.itemStatus
				}, {
					"content-type": "application/x-www-form-urlencoded",
					"cookie": uni.getStorageSync('setCookie')
				}).then(res => {
					this.mainId = res.data;
				})
			}
		}
	}
</script>

<style>
	.isNotShow {
		display: none;
	}
</style>
