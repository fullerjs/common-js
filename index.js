"use strict";
var fs = require('fs');
var path = require('path');

var Stream = require('./stream');

var CommonJS = function(fuller, plan) {
	this.options = plan.defaults.stream || {};
};

CommonJS.prototype.getStream = function() {
	return new Stream(this.options);
};

module.exports = CommonJS;
