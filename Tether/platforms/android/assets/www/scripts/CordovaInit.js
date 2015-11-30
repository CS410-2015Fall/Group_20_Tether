'use strict';

var cordovaInit = function() {

	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};

	var receivedEvent = function(event) {
		console.log('Start event received, bootstrapping application setup.');
		angular.bootstrap($('body'), ['c3aApp']);
	};

	this.bindEvents = function() {
		document.addEventListener('deviceready',onDeviceReady, false);
		document.addEventListener("backbutton", function (e) {
			e.preventDefault();
		}, false );
	};



	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		console.log('Cordova found, wating for device.');
		this.bindEvents();
	} else {
		console.log('Cordova not found, booting application');
		receivedEvent('manual')
	}
};

$(function() {
	console.log('Bootstrapping!');
	new cordovaInit();
});