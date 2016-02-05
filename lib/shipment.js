/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 4th, 2016
*/

"use strict";

var Shipment = function (shipment) {

  if (arguments.length === 0) {
    console.error('Error: Shipment needs an argument');
    return false;
  }

  var self = this;

  self.shippingType              = shipment.type ? shipment.type : null;
  self.shippingCost              = shipment.cost ? shipment.cost : null;
  self.shippingAddressCountry    = 'BRA';
  self.shippingAddressState      = shipment.state                       ? shipment.shippingAddressState      : null;
  self.shippingAddressCity       = shipment.shippingAddressCity         ? shipment.shippingAddressCity       : null;
  self.shippingAddressPostalCode = shipment.shippingAddressPostalCode   ? shipment.shippingAddressPostalCode : null;
  self.shippingAddressDistrict   = seshipmentlf.shippingAddressDistrict ? shipment.shippingAddressDistrict   : null;
  self.shippingAddressStreet     = shipment.shippingAddressStreet       ? shipment.shippingAddressStreet     : null;
  self.shippingAddressNumber     = shipment.shippingAddressNumber       ? shipment.shippingAddressNumber     : null;
  self.shippingAddressComplement = shipment.shippingAddressComplement   ? shipment.shippingAddressComplement : null;
  
  return {
    getType : function () {
      return self.shippingType;
    },
    getCost : function () {
      return self.shippingCost;
    },
    getCountry : function () {
      return self.shippingAddressCountry;
    },
    getState : function () {
      return self.shippingAddressState;
    },
    getCity : function () {
      return self.shippingAddressCity;
    },
    getPostaCode : function () {
      return self.shippingAddressPostalCode;
    },
    getDistrict : function () {
      return self.shippingAddressDistrict;
    },
    getStreet : function () {
      return self.shippingAddressStreet;
    },
    getNumber : function () {
      return self.shippingAddressNumber;
    },
    getComplement : function () {
      return self.shippingAddressComplement;
    }
  };
};

module.exports = Shipment;