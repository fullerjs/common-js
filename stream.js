"use strict";
var inherits = require('util').inherits;
var fs = require('fs');
var path = require('path');
var Transform = require('stream').Transform;

var prologue = fs.readFileSync(path.join(__dirname, 'js', 'prologue.js'));
var epilogue = fs.readFileSync(path.join(__dirname, 'js', 'epilogue.js'));
var itemPrologue = fs.readFileSync(path.join(__dirname, 'js', 'item_prologue.js'));
var itemEpilogue = fs.readFileSync(path.join(__dirname, 'js', 'item_epilogue.js'));

var Stream = function(options) {
	var self = this;
	Transform.call(this, options);

	this.on('pipe', function(stream){
		self.push(prologue);
		stream
			.on('itemstart', function() {
				self.push(itemPrologue);
			})
			.on('itemend', function() {
				self.push(itemEpilogue);
			});
	});
};
inherits(Stream, Transform);

Stream.prototype._transform = function(chunk, encoding, cb) {
	cb(null, chunk);
};

Stream.prototype._flush = function(cb) {
	this.push(epilogue);
	cb();
};

module.exports = Stream;
