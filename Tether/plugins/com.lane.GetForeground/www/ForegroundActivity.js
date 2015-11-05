var ForegroundActivity = {
	createEvent: function(title, message, appName, successCallback, errorCallback){
		cordova.exec(
			successCallback,
			errorCallback,
			'ForegroundActivity',
			'getForegroundApp',
			[{
				"title" : title
				
			}]
		);
	}
}

module.exports = ForegroundActivity;
