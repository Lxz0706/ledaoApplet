<template>
	<view class="container">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#3388EC"></uni-segmented-control>
		<view class="content">
			<view v-if="current === 0">
				<v-flow ref="initFlow" :statu="current"></v-flow>
			</view>
			<view v-if="current === 1">
				<v-flow ref="initFlow" :statu="current"></v-flow>
			</view>
			<view v-if="current === 2">
				<v-flow ref="initFlow" :statu="current"></v-flow>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * author        chenjie
	 * time          2021-9-1 11:11:49 ?F10: AM?
	 * description   
	 */
	// 引入flow组件
	import flow from './flow/flow.vue'

	export default {
		name: 'workFlow',
		data() {
			return {
				current: 0,
				items: ['待办', '已办', '我的申请'],
				flowList: []
			}
		},

		components: {
			"v-flow": flow
		},

		onShow() {
			this.$refs.initFlow.getFlowList();
		},

		// onLoad(options) {
		// 	console.log('optionsstatu',statu)
		// },

		mounted() {
			this.onClickItem(this.current)
		},

		methods: {
			onClickItem(e) {
				this.current = e.currentIndex
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
