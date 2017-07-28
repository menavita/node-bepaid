var should = require('should');
var Bepaid = require('../');

var bepaid = new Bepaid({shop_id: '362', shop_key: '9ad8ad735945919845b9a1996af72d886ab43d3375502256dbf8dd16bca59a4e'});

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
		}).then(function(res) {
			console.log(JSON.parse(res));
			JSON.parse(res).should.have.property('checkout');
		})
	})
})

