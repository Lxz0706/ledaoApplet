<template>

		<view class="load-more">{{load_text}}</view>

</template>

<script>
	export default{
		
	  props:{
		load_text:{
			type: String,
		}
	  }
	
	}
	
	
	
</script>

<style scoped>
	
	.load-more{
		text-align: center;
		color: $uni-text-color-grey;
		padding: 15upx;
	}
	
</style>
