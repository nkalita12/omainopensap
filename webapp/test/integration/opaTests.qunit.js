/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"tma/testMobileApp/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});