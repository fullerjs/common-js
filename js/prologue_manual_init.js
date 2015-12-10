'use strict';
;(function(window, document, undefined) {
  window['<^FILENAME^>'] = function init(modules) {
    var require = function(name) {
      var module = modules[name];
      if (!module) {
        throw new Error('Requested module "' + name + '" has not been defined.');
      }
      return module;
    };

    var exports = function(name, module) {
      if (modules[name]) {
        console.log('Warning! Module "' + name + '" already exists');
      }
      modules[name] = module;
    };
