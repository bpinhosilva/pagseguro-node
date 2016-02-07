/**
* Created by Bruno Sampaio Pinho da Silva
* On Feb. 4th, 2016
*/

"use strict";

/**
 * Buyer object - who's buying something
 * @param {string} email - the buyer's email
 * @param {string} name - buyer's name (it must contain at least two names separated by whitespace)
 * @param {integer} areaCode - the area code for buyer's phone
 * @param {integer} phone - buyer's phone number (7 ~ 9 digits)
 * @param {integer} cpf - buyer's CPF (11 digits)
 * @param {date} bornDate - format dd/MM/yyyy

 * @returns {object} Buyer object
 */
var Buyer = function (buyer) {

  if (arguments.length === 0) {
    console.error('Error: Buyer needs an argument');
    return false;
  }

  var self = this;

  if (buyer.hasOwnProperty('email'))
    self.senderEmail = buyer.email;

  if (buyer.hasOwnProperty('name'))
    self.senderName = buyer.name;

  if (buyer.hasOwnProperty('areaCode'))
    self.senderAreaCode = buyer.areaCode;

  if (buyer.hasOwnProperty('phone'))
    self.senderPhone = buyer.phone;

  if (buyer.hasOwnProperty('cpf'))
    self.senderCPF = buyer.cpf;

  if (buyer.hasOwnProperty('bornDate'))
    self.senderBornDate = buyer.bornDate;

  return {
    getEmail : function () {
      return self.senderEmail;
    },
    getName : function () {
      return self.senderName;
    },
    getAreaCode : function () {
      return self.senderAreaCode;
    },
    getPhone : function () {
      return self.senderPhone;
    },
    getCPF : function () {
      return self.senderCPF;
    },
    getBornDate : function () {
      return self.senderBornDate;
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

module.exports = Buyer;