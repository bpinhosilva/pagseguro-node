/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 3rd, 2016
*/

"use strict";

var Item = require('./lib/item');

var PagSeguro = function (email, token, charset = 'UTF-8') {

  if (arguments.length === 3) {
    self.charset = charset.toString().toUpperCase();

    if (self.charset != 'UTF-8' && self.charset != 'ISO-8859-1') {
      console.error('Error: correct charsets are UTF-8 or ISO-8859-1');
      return false;
    }
    
    self.email    = email;
    self.token    = token;
  }
  else if (arguments.length == 2) {
    self.token = token;
    self.email = email;
  }
  else {
     console.error('Error: correct parameters for PagSeguro -> (email, token [,charset])');
     return false;
  }

  var self = this;

  self.items = [];

  return {
    getItemsLength : function () {
      return self.items.length;
    },
    addItem : function (item) {
      self.items.push(new Item(item));
    },
    getItemById : function (id) {
      for (var i = 0; i < self.items.length; i++) {
        if (self.items[i].getId() === id) return self.items[i];
      }
      return null;
    }
  };

};


module.exports = Pagseguro;