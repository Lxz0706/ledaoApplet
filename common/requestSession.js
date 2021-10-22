const BASE_URL = "http://192.168.3.8:8002"
const sessionCookie = uni.getStorageSync('setCookie')

const requestSession = (url, method, data, header) => {
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
			resolve(res);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}

export default requestSession