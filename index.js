"use strict";
var fs = require('fs');
var path = require('path');

var prologue = fs.readFileSync(path.join(__dirname, 'js', 'prologue.js'));
var epilogue = fs.readFileSync(path.join(__dirname, 'js', 'epilogue.js'));
var itemPrologue = fs.readFileSync(path.join(__dirname, 'js', 'item_prologue.js'));
var itemEpilogue = fs.readFileSync(path.join(__dirname, 'js', 'item_epilogue.js'));

var FILE_ENCODING = 'utf-8';

var CommonJS = function(fuller, options) {
	fuller.bind(this);
	this.Stream = fuller.streams.Wrapper;

	this.src = options.src;
	this.dst = options.dst;
};

CommonJS.prototype.build = function(stream, master) {
	var next = new this.Stream({
		prologue: prologue,
		epilogue: epilogue,
		itemPrologue: itemPrologue,
		itemEpilogue: itemEpilogue
	});

	if(typeof stream === "string") {
		var src = path.join(this.src, stream);
		this.addDependence(src, master);
		return fs.createReadStream(src, {encoding: FILE_ENCODING}).pipe(next);
	} else {
		return stream.pipe(next);
	}
};

module.exports = CommonJS;
