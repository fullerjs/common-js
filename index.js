'use strict';
let fs = require('fs');
let path = require('path');
let Transform = require('stream').Transform;
let Material = require('fuller-material-file');

let prologue = fs.readFileSync(path.join(__dirname, 'js', 'prologue.js')).toString();
let epilogue = fs.readFileSync(path.join(__dirname, 'js', 'epilogue.js')).toString();
let prologueManualInit = fs.readFileSync(path.join(__dirname, 'js', 'prologue_manual_init.js')).toString();
let epilogueManualInit = fs.readFileSync(path.join(__dirname, 'js', 'epilogue_manual_init.js')).toString();
let itemPrologue = fs.readFileSync(path.join(__dirname, 'js', 'item_prologue.js')).toString();
let itemEpilogue = fs.readFileSync(path.join(__dirname, 'js', 'item_epilogue.js')).toString();

let CommonJS = function(fuller, options) {
  fuller.bind(this);

  this.src = options.src;
  this.dst = options.dst;
  this.external = options.external;
  this.prologue = options.prologue || options.external ? prologueManualInit : prologue;
  this.epilogue = options.epilogue || options.external ? epilogueManualInit : epilogue;
  this.itemPrologue = options.itemPrologue || itemPrologue;
  this.itemEpilogue = options.itemEpilogue || itemEpilogue;
};

CommonJS.prototype = {
  build: function(src, dst) {
    let self = this;
    let newMat = new Material({
      id: dst,
      path: path.join(self.dst, dst)
    })
    .error(function(err) {
      self.error(err);
    });

    let newContent = self.prologue;

    if (this.external) {
      newContent = newContent.replace('<^FILENAME^>', path.basename(dst));
    }

    let next = new Transform({
      objectMode: true,
      transform: function(mat, enc, cb) {
        mat.getContent(function(content) {
          newContent += self.itemPrologue;
          newContent += content.toString();
          newContent += self.itemEpilogue;
          cb();
        });
      },

      flush: function(done) {
        newContent += self.epilogue;
        this.push(newMat.setContent(newContent));
        done();
      }
    });

    return next;
  }
};


module.exports = CommonJS;
