/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 3rd, 2016
*/

"use strict";

/**
 * Item object - the products
 * @param {string} id - your product id
 * @param {string} description
 * @param {string} amount - the price for a unique piece of product
                    it must contain two decimal places
 * @param {integer} quantity - number of items someone is buying
 * @param {string} shippingCost - shipment cost for this item 
    Yes, it is string and must have two decimal places
 * @param {integer} weight in grams

 * @returns {object} Item object
 */
var Item = function (item) {

  if (arguments.length === 0) {
    console.error('Error: Item needs an argument');
    return false;
  }

  var self = this;

  if (item.hasOwnProperty('id'))
    self.itemId = item.id;

  if (item.hasOwnProperty('description'))
    self.itemDescription = item.description;

  if (item.hasOwnProperty('amount'))
    self.itemAmount = item.amount;

  if (item.hasOwnProperty('quantity'))
    self.itemQuantity = item.quantity;

  if (item.hasOwnProperty('shippingCost'))
    self.itemShippingCost = item.shippingCost;

  if (item.hasOwnProperty('weight'))
    self.itemWeight = item.weight;

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
    },
    mountQueryString : function (index, qs) {
      qs = (qs || {});
      for (var property in self) {
        if (self.hasOwnProperty(property) && self[property] !== null) {
            qs[property + index] = self[property];
        }
      }
      return qs;
    }
  };


};

module.exports = Item;