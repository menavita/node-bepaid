var should = require('should');
var Bepaid = require('../');

var bepaid = new Bepaid({shop_id: '363', shop_key: '4f585d2709776e53d080f36872fd1b63b700733e7624dfcadd057296daa37df6'});

describe('Token', function() {
	it('should return token and redirect_url', function() {
		return bepaid.createToken({
			'transaction_type': 'tokenization',
			'settings': {
				"success_url": "http://127.0.0.1:4567/success",
	      "decline_url": "http://127.0.0.1:4567/decline",
	      "fail_url": "http://127.0.0.1:4567/fail"
			},
			'order': {
				'amount': 10,
				'currency': 'BYN',
				'description': 'This is a test order',
			},
			'customer': {
				'email': 'j1367127@mvrht.net'
			}
		}, 'https://checkout.bepaid.by/ctp/api/checkouts').then(function(res) {
			console.log(JSON.parse(res));
			JSON.parse(res).should.have.property('checkout');
		})
	})
})

