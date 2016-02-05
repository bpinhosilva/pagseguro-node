"use strict";

var Buyer = function (buyer) {

  if (arguments.length === 0) {
    console.error('Error: Buyer needs an argument');
    return false;
  }

  var self = this;

  self.senderEmail    = buyer.email    ? buyer.email    : null;
  self.senderName     = buyer.name     ? buyer.name     : null;
  self.senderAreaCode = buyer.areaCode ? buyer.areaCode : null;
  self.senderPhone    = buyer.phone    ? buyer.phone    : null;
  self.senderCPF      = buyer.cpf      ? buyer.cpf      : null;
  self.senderBornDate = buyer.bornDate ? buyer.bornDate : null;

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
    }
  };


};

module.exports = Buyer;