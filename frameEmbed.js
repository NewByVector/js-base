//防止页面被嵌入到其他框架

if (window != top) {
	//页面被嵌入到其他页面
	top.location.href = window.location.href;
}

//上面的写法有个问题，别人没法嵌入我的网页，但是我自己也没法嵌入
//当被别的域名嵌入时，在IE和Firefox下访问top.location.hostname抛出异常
//在Chrome里面却能正常访问
try {
	top.location.hostname;
	//兼容Chrome
	if (top.location.hostname != window.location.hostname) {
		top.location.href = window.location.href;
	}
} catch (e) {
	top.location.href = window.location.href;
}