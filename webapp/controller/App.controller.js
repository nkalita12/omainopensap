sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ndc/BarcodeScanner"
], function (Controller, BarcodeScanner) {
	"use strict";

	return Controller.extend("tma.testMobileApp.controller.App", {
		onPressScan: function (oEvent) {
			var odataModel = this.getOwnerComponent().getModel();
			sap.ndc.BarcodeScanner.scan(
				function (mResult) {
					alert("We got a bar code\n" +
						"Result: " + mResult.text + "\n" +
						"Format: " + mResult.format + "\n" +
						"Cancelled: " + mResult.cancelled);
					var oData = {
						ID: mResult.text,
						Text: mResult.format
					}
					odataModel.create("/MyView", oData, {
						success: function () {
							alert("success")
						},
						error: function () {
							alert("error")
						}
					});
				},
				function (Error) {
					alert("Scanning failed: " + Error);
				}
			);
		},
		onRefresh: function () {
			this.getView().byId("idProductsTable").getBinding("items").refresh();
			if (typeof sap.hybrid !== 'undefined') {
				sap.hybrid.refreshStore();
			}
		},
		onFlush: function () {
			if (typeof sap.hybrid !== 'undefined') {
				sap.hybrid.flushStore();
			}
		},
	});
});