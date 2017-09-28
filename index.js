'use strict';
const fs = require('fs');
const path = require('path');
const Transform = require('stream').Transform;
const Material = require('fuller-material-file');

const prologue = fs.readFileSync(path.join(__dirname, 'js', 'prologue.js')).toString();
const epilogue = fs.readFileSync(path.join(__dirname, 'js', 'epilogue.js')).toString();
const prologueManualInit = fs.readFileSync(path.join(__dirname, 'js', 'prologue_manual_init.js')).toString();
const epilogueManualInit = fs.readFileSync(path.join(__dirname, 'js', 'epilogue_manual_init.js')).toString();
const itemPrologue = fs.readFileSync(path.join(__dirname, 'js', 'item_prologue.js')).toString();
const itemEpilogue = fs.readFileSync(path.join(__dirname, 'js', 'item_epilogue.js')).toString();

const CommonJS = function(fuller, options) {
  fuller.bind(this);

  this.src = options.src;
  this.dst = options.dst;
  this.external = options.external;
  this.prologue = options.prologue || options.external ? prologueManualInit : prologue;
  this.epilogue = options.epilogue || options.external ? epilogueManualInit : epilogue;
  this.itemPrologue = options.itemPrologue || itemPrologue;
  this.itemEpilogue = options.itemEpilogue || itemEpilogue;
};

CommonJS.prototype.build = function(src, dst) {
  const newMat = new Material({
    id: dst,
    path: path.join(this.dst, dst)
  }).error(err => this.error(err));

  let newContent = this.prologue;

  if (this.external) {
    newContent = newContent.replace('<^FILENAME^>', path.basename(dst));
  }

  const next = new Transform({
    objectMode: true,
    transform: (mat, enc, cb) => {
      mat.getContent(content => {
        newContent += this.itemPrologue;
        newContent += content.toString();
        newContent += this.itemEpilogue;
        cb();
      });
    },

    flush: done => {
      newContent += this.epilogue;
      next.push(newMat.setContent(newContent));
      done();
    }
  });

  return next;
};


module.exports = CommonJS;
