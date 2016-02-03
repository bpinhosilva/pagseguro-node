"use strict";

var Item = function (item) {

  if (arguments.length === 0) {
    console.error('Error: Item needs an argument');
    return false;
  }

  var self = this;

  self.itemId           = item.id           ? item.id           : null;
  self.itemDescription  = item.description  ? item.description  : null;
  self.itemAmount       = item.amount       ? item.amount       : null;
  self.itemQuantity     = item.quantity     ? item.quantity     : null;
  self.itemShippingCost = item.shippingCost ? item.shippingCost : null;
  self.itemWeight       = item.weight       ? item.weight       : null;

  return {
    getId : function () {
      return self.itemId;
    },
    getDescription : function () {
      return self.itemDescription;
    },
    getAmount : function () {
      return self.itemAmount;
    },
    getQuantity : function () {
      return self.itemQuantity
    },
    getShippingCost : function () {
      return self.itemShippingCost
    },
    getWeight : function () {
      return self.itemWeight
    }
  };


};

module.exports = Item;