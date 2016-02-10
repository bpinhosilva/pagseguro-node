/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 3rd, 2016
*/

"use strict";

var request = require('request');
var parseString = require('xml2js').parseString;

// default mode
var PROD_MODE = true;

var Item = require('./lib/item');
var Buyer = require('./lib/buyer');
var Shipment = require('./lib/shipment');

var URL_API_PAY;
var URL_API_PAY_PROD = 'https://ws.pagseguro.uol.com.br/v2/checkout/';
var URL_API_PAY_SAND = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/';

if (PROD_MODE) {  // Production mode
  URL_API_PAY = 'https://ws.pagseguro.uol.com.br/v2/checkout/';
}
else {  // Sandbox mode
  URL_API_PAY = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/';
}

/**
 * PagSeguro object interacts with payment API
 * @param {string} email - account which makes requests to PagSeguro
 * @param {string} token - necessary token to start requests
 * @param {string} charset - optional charset
 * @returns {object} PagSeguro object
 */
var PagSeguro = function (email, token, charset) {

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
    self.charset = 'UTF-8';
  }
  else {
     console.error('Error: correct parameters for PagSeguro -> (email, token [,charset])');
     return false;
  }

  self.currency = "BRL";
  self.items = [];
  self.buyer;
  self.shipment;
  self.reference = '';
  self.redirectURL = '';
  self.notificationURL = '';
  self.maxUses = 1000;
  self.maxAge = 1000;

  var mountQueryString = function () {
    var qs = {};

    for (var i = 0; i < self.items.length; i++) {
      qs = self.items[i].mountQueryString(i + 1, qs);
    }

    if (self.buyer) 
      qs = self.buyer.mountQueryString(qs);

    if (self.shipment)
      qs = self.shipment.mountQueryString(qs);

    return qs;
  };

  return {
    setToken : function (newToken) {
      self.token = newToken;
    },
    setEmail : function (email) {
      if (email && typeof email === 'string')
        self.email = email;
    },
    setMode : function (mode) {
      if (mode && typeof mode === 'string') {
        if (mode.toUpperCase() == 'SANDBOX')
          PROD_MODE = false;
        else if (mode.toUpperCase() == 'PROD')
          PROD_MODE = true;
      }
      else if (typeof mode === 'boolean') {
        PROD_MODE = mode;
      }
      else {
        console.log('Invalid mode, default set: PROD');
      }
    },
    setRedirectURL : function (url) {
      self.redirectURL = url;
    },
    setNotificationURL : function (url) {
      self.notificationURL = url;
    },
    setReference : function (ref) {
      self.reference = ref;
    },
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
      self.buyer = new Buyer(buyer);
    },
    addShipment : function (spm) {
      self.shipment = new Shipment(spm);
    },
    processOrder : function (callback) {

      var hasCallback = true;

      if (!callback || typeof callback != "function") {
        hasCallback = false;
      }

      var options = {
        url: PROD_MODE ? URL_API_PAY_PROD : URL_API_PAY_SAND,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=' + self.charset
        }
      };

      options.qs = mountQueryString();

      options.qs.email = self.email;
      options.qs.token = self.token;
      options.qs.currency = self.currency;

      if (self.redirectURL != '') options.qs.redirectURL = self.redirectURL;
      if (self.notificationURL != '') options.qs.notificationURL = self.notificationURL;
      if (self.reference != '') options.qs.reference = self.reference;

      if (!PROD_MODE) console.log(options);

      request.post(options, function (error, response, body) {

        // parse xml returned from pagSeguro API
        parseString(body, function (err, result) {

          // if you get an error here, make sure you are
          // passing parameters correctly

          // error reading xml
          if (err) {
            console.log(err);
            if (hasCallback)
              callback(err, response, null); 
            else
              return err;
          }

          // got good response
          if (!error && response.statusCode == 200) {
            if (hasCallback)
              callback(null, response, result.checkout);
            else
              return result.checkout;
          }
          else {  // got error
            if (hasCallback)
              callback(result.errors.error, response, null); 
            else
              return result.errors.error;
          }
        });
      });

    }
  };

};


module.exports = PagSeguro;