var should = require('should');
var Bepaid = require('../');

var bepaid = new Bepaid({shop_id: '363', shop_key: '4f585d2709776e53d080f36872fd1b63b700733e7624dfcadd057296daa37df6'});

describe('Token', function() {
	it('should return token and redirect_url', function() {
		return bepaid.createToken(
			{
		    "transaction_type": "payment",
		    "version": 2,
		    "attempts": 3,
		    "settings": {
		      "success_url": "http://127.0.0.1:4567/success",
		      "decline_url": "http://127.0.0.1:4567/decline",
		      "fail_url": "http://127.0.0.1:4567/fail",
		      "language": "en"
		    },
		    "order": {
		      "currency": "BYN",
		      "amount": 4,
		      "description": "Order description"
		    },
		    "customer": {
		      "address": "Baker street 221b",
		      "country": "GB",
		      "city": "London",
		      "email": "jake@example.com"
		    }
			}
			, 'https://checkout.bepaid.by/ctp/api/checkouts').then(function(res) {
			console.log(JSON.parse(res));
			JSON.parse(res).should.have.property('checkout');
		})
	})
})

