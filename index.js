"use strict";
var fs = require('fs');
var path = require('path');

var Stream = require('./stream');

var CommonJS = function(fuller, options) {
	this.options = options || {};
};

CommonJS.prototype.getStream = function() {
	return new Stream(this.options);
};

module.exports = CommonJS;
