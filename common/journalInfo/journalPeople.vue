<template>
  <view class="people-container">
		<view class="top-search">
			<view class="dept-name">
					日期
			</view>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
    <view class="cur-list">
    	<uni-list v-for="(item,index) in peopleList" :key="index">
    		<uni-list-item link="navigateTo" @click="onClick($event,item)" >
    			<template slot="body">
						<view class="people-list">
							<view class="slot-box slot-text">{{item.userName}}</view>
							<view class="icon" v-if="item.isWrite == 'y' ? true : false">
								<icon type="success_no_circle" size="26"/>
							</view>
						</view>

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
* time          2021-9-27 9:21:37 ?F10: AM?
* description   
*/


export default {
  name: '',
  data () {
		const currentDate = this.getDate({
				format: true
		})
    return {
			peopleList: [],
			departId: '',
			date: currentDate
    }
  },
	
	onLoad(options) {
		this.departId = options.deptId
	},
	
	mounted() {
		this.getPeopleList()
	},
	
	computed:{
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	
	methods: {
		// 获取部门下用户的列表
		getPeopleList() {
			this.$request("/system/journal/userListByDepParentId","POST",{
				parentId: this.departId,
				createDateFormat: this.date
			},{
				"content-type": "application/x-www-form-urlencoded",
				"cookie": uni.getStorageSync('setCookie')
			}).then(resPeople=> {
				console.log('人员选择列表',resPeople)
				this.peopleList = resPeople.rows
			})
		},
		
		bindDateChange(e) {
			this.date = e.target.value
			this.getPeopleList()
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
		
		// 进入日志列表
		onClick(e,item) {
			uni.setStorageSync('datePeople', this.date)
			uni.navigateTo({
				url: './journalList?date=' + this.date + '&createBy=' + item.loginName
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
	margin: 35rpx;
	.dept-name {
		margin-right: 20rpx;
	}
}

.people-list {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 300rpx;
	justify-content: space-between;
}
</style>
