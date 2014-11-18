"use strict";
;(function(window, document, undefined) {
	var modules = {},

		require = function(name) {
			var module = modules[name] || window[name];
			if (!module) {
				throw new Error("Requested module '" + name + "' has not been defined.");
			}
			return module;
		},

		exports = function(name, module, global) {
			if(global) {
				window[name] = module;
			} else {
				modules[name] = module;
			}
		};

