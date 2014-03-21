"use strict";
var fs = require('fs');
var path = require('path');

var Stream = require('./stream');

var FILE_ENCODING = 'utf-8';

var CommonJS = function(fuller, options) {
	this.src = options.src;
	this.dst = options.dst;
};

CommonJS.prototype.build = function(stream, master) {
	var next = new Stream();

	if(typeof stream === "string") {
		var src = path.join(this.src, stream);
		this.addDependence(src, master);
		return fs.createReadStream(src, {encoding: FILE_ENCODING}).pipe(next);
	} else {
		return stream.pipe(next);
	}
};

module.exports = CommonJS;
