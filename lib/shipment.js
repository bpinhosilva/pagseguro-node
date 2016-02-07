/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 4th, 2016
*/

"use strict";

/**
 * Shipment object - shipment info
 * @param {integer} type - 1 PAC, 2 SEDEX, 3 shipment not defined
 * @param {string} cost - Total cost of shipment. In case it is set,
      API does not calculate anything based on products weight or individual cost.
      and assumes this is the final cost.
 * @param {string} address country - the destination country
 * @param {string} state - destination state
 * @param {string} city - destination city
 * @param {integer} postalCode - destination postal code (8 digit number)
 * @param {string} district - destination district (bairro)
 * @param {string} street - destination street
 * @param {string} number - destination number
 * @param {string} complement - destination complement
 * @returns {object} Shipment object
 */
var Shipment = function (shipment) {

  if (arguments.length === 0) {
    console.error('Error: Shipment needs an argument');
    return false;
  }

  var self = this;

  if (shipment.hasOwnProperty('type'))
    self.shippingType = shipment.type;

  if (shipment.hasOwnProperty('cost'))
    self.shippingCost = shipment.cost;

  // default value, API only supports BRA  
  self.shippingAddressCountry = 'BRA';

  if (shipment.hasOwnProperty('state'))
    self.shippingAddressState = shipment.state;

  if (shipment.hasOwnProperty('city'))
    self.shippingAddressCity = shipment.city;

  if (shipment.hasOwnProperty('postalCode'))
    self.shippingAddressPostalCode = shipment.postalCode;

  if (shipment.hasOwnProperty('district'))
    self.shippingAddressDistrict = shipment.district;

  if (shipment.hasOwnProperty('street'))
    self.shippingAddressStreet = shipment.street;

  if (shipment.hasOwnProperty('number'))
    self.shippingAddressNumber = shipment.number;

  if (shipment.hasOwnProperty('complement'))
    self.shippingAddressComplement = shipment.complement;
  
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
    },
    mountQueryString : function (qs) {
      qs = (qs || {});
      for (var property in self) {
        if (self.hasOwnProperty(property) && self[property] !== null) {
            qs[property] = self[property];
        }
      }
      return qs;
    }
  };
};

module.exports = Shipment;