# pagseguro-node

This is a Node.js package which provides interaction with PagSeguro online payment system. The method used for this module is HTTP Parameters. XML support coming soon!

After you create your seller account and generated your token, you can start making requests.

Keep in mind that you can use tokens in two environments: sandbox and production. They are provided by PagSeguro API, for more information, read their documentation.

======================================================

Este é um pacote Node.js que fornece interação com o sistema de pagamento online PagSeguro. O método usado nesse módulo é o de parâmetros HTTP. Suporte para arquivos XML em breve!

Depois de criar sua conta de vendedor e gerar seu token, poderá começar a fazer requisições.

Tenha em mente que você pode usar token em dois ambientes: sandbox (teste) e produção. Eles são fornecidos pela API do PagSeguro, para maiores informações, leia a documentação deles.

### Version (Versão)
1.0.2

### Installation (Instalação)

```sh
$ npm install pagseguro-node --save
```

### What's new (O que há de novo)
```javascript
pagSeguro.setMode('prod'); // or sanbox, default is prod
pagSeguro.setToken('<your_token>');
pagSeguro.setRedirectURL('http://somepoint/isback');
pagSeguro.setReference('<stuff_ref_number>');
pagSeguro.setNotificationURL('http://somepoint/notification');
```


#### Quick example (Exemplo rápido)

```javascript
var express = require('express');
var app = express();

var email = 'your_seller_email@email.com';
var token = 'your_long_token';

var PagSeguro = require('pagseguro-node');
var pagSeguro = new PagSeguro(email, token);

// provide redirect URL after PagSeguro sends you the transaction code
var URL_RED_PAG = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=';

pagSeguro.addItem({
  id: 1,
  description: 'Item description 1',
  amount: '11.11',  // values in string format with 2 decimal places
  quantity: 1,
  weight: 1200,   // in grams
  shippingCost: '0.00'  // same criterion
});

// shipment depends on options set in PagSeguro store page.
// make sure you set them and read the API
pagSeguro.addShipment({
  type: 3,
  state: 'BA',
  city: 'Jacobina',
  postalCode: '44700000',
  district: 'Um bairro',
  street: 'Rua x',
  number: '999',
  complement: 'Casa',
  cost: '0.00'
});

pagSeguro.addBuyer({
  email: 'buyer_email@email.com',
  name: 'Bruno Pinho', // you must provide at least 2 names, don't know why!
  areaCode: '74'
});

app.get('/', function (req, res) {
  pagSeguro.processOrder(function (err, response, body) {
    
    if (err) {
      res.json(err);
    }
    else {
      // redirect user to payment page (pagseguro)
      res.redirect(URL_RED_PAG + body.code);      
    }   

  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

```



### Changelog

Version 1.0.2 (Feb. 9th, 2016)
* Fixed a bug when adding more items to list and generating only one during request.

Version 1.0.1 (Feb. 8th, 2016)
* Created a few more methods:
setToken, setEmail, setMode, setRedirectURL, setNotificationURL, setReference.

Version 1.0.0 (Feb. 7th, 2016)
* First release with basic interaction to start selling things on internet using PagSeguro.


### License
Please, read the License file on this repository for more information.

### Do you like it? 
Start contributing by forking and sending pull request.

Thanks, Bruno Pinho