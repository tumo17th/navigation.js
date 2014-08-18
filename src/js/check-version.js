(function() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if(userAgent.indexOf('msie') == -1) return;
	if(appVersion.indexOf('msie 6.') != -1 || appVersion.indexOf('msie 7.') != -1 || appVersion.indexOf('msie 8.') != -1) {
		alert('Sorry. This browser is Out of Support.');
	}
})();
