<template>
	<view class="ocr">
		<ocrsdk></ocrsdk>
	</view>
</template>

<script>
	/**
	 * author        chenjie
	 * time          2021-9-16 5:06:23 ?F10: PM?
	 * description   
	 */

	export default {
		name: '',
		data() {
			return {

			}
		},

		mounted() {
			const ocrSdk = require('@/wxcomponents/ocrsdk/index.js');
			ocrSdk.start({
				secretId: '', // 不推荐在生产环境中使用固定密钥
				secretKey: '', // 不推荐在生产环境中使用固定密钥
				ocrType: ocrSdk.OcrType.BUSINESS_CARD,
				ocrOption: {
					Config: {
						"RetImageType": "PROPROCESS"
					}
				},
				cameraConfig: {
					autoMode: true,
					maxTry: 3,
				},
				resultPage: true,
				resultPageConfig: {
					modifiable: true,
				},
				theme: 'primary',
				success: (res) => {
					console.log('ocr result is:', res)
					const resOcr = JSON.stringify(res.BusinessCardInfos)
					uni.redirectTo({
						url: '/pages/curstomer/addCurstomer/addAndEdit?ocrData=' + resOcr
					})
				},
				fail: (error) => {
					console.log('ocr failed:', error)
				}
			});
		}
	}
</script>

<style lang="less" scoped>

</style>
