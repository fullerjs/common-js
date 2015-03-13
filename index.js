"use strict";
let fs = require("fs");
let path = require("path");
let Wrapper = require("wrapper-stream");

let prologue = fs.readFileSync(path.join(__dirname, "js", "prologue.js"));
let epilogue = fs.readFileSync(path.join(__dirname, "js", "epilogue.js"));
let itemPrologue = fs.readFileSync(path.join(__dirname, "js", "item_prologue.js"));
let itemEpilogue = fs.readFileSync(path.join(__dirname, "js", "item_epilogue.js"));

let CommonJS = function(fuller, options) {
	this.prologue = options.prologue || prologue;
	this.epilogue = options.epilogue || epilogue;
	this.itemPrologue = options.itemPrologue || itemPrologue;
	this.itemEpilogue = options.itemEpilogue || itemEpilogue;
};

CommonJS.prototype.build = function(stream) {
	let next = new Wrapper({
		prologue: prologue,
		epilogue: epilogue,
		itemPrologue: itemPrologue,
		itemEpilogue: itemEpilogue
	});

	return stream.pipe(next);
};

module.exports = CommonJS;
