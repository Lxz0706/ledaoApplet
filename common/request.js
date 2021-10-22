// 默认地址url常量 http://139.196.186.29:8001 https://dev.ledaoamc.com http://192.168.3.8:8001
const BASE_URL = "http://192.168.3.8:8002"
const sessionCookie = uni.getStorageSync('setCookie')
// 封装好的函数导入
const request = (url, method, data, header) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: method || 'GET',
			data: data || {},
			header: header || {
				"content-type": "application/x-www-form-urlencoded",
				"cookie": sessionCookie
				},
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			},200);
			let [error,res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}

export default request