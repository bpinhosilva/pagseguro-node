/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 3rd, 2016
*/

"use strict";

var request = require('request');
var parseString = require('xml2js').parseString;

var Item = require('./lib/item');
var Buyer = require('./lib/buyer');
var Shipment = require('./lib/shipment');
var URL_API_PAY = 'https://ws.pagseguro.uol.com.br/v2/checkout';

var PagSeguro = function (email, token, charset = 'UTF-8') {

  var self = this;

  if (arguments.length === 3) {
    self.charset = charset.toString().toUpperCase();

    if (self.charset != 'UTF-8' && self.charset != 'ISO-8859-1') {
      console.error('Error: correct charsets are UTF-8 or ISO-8859-1');
      return false;
    }
    
    self.email = email;
    self.token = token;
  }
  else if (arguments.length == 2) {
    self.token = token;
    self.email = email;
  }
  else {
     console.error('Error: correct parameters for PagSeguro -> (email, token [,charset])');
     return false;
  }

  self.items = [];
  self.buyer = {};
  self.shipment = {};
  self.redirectURL = '';
  self.notificationURL = '';
  self.maxUses = 1000;
  self.maxAge = 1000;

  var mountQueryString = function () {
    var qs = {};

    return qs;
  };

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
    },
    addBuyer : function (buyer) {
      self.buyer.push(new Buyer(buyer));
    },
    addShipment : function (spm) {
      self.shipment.push(new Shipment(spm));
    },
    processOrder : function (callback) {

      if (!callback || typeof callback != "function") {
        throw "Error: you must provide a callback for processOrder";
        return null;
      }

      var options = {
        url: URL_API_PAY,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=' + self.charset;
        }
      };

      options.qs = mountQueryString();

      request.post(options, function (error, response, body) {

        // parse xml returned from pagSeguro API
        parseString(body, function (err, result) {

          // error reading xml
          if (err) {
            throw "Error: reading xml file";
            return null;
          }

          // got good response
          if (!error && response.statusCode == 200) {            
            callback(null, response, result.checkout);
          }
          else {  // got error
            callback(result.errors.error, response, null); 
          }
        });
      });

    }
  };

};


module.exports = Pagseguro;