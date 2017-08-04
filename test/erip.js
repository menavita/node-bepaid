var should = require('should');
var Bepaid = require('../');

var bepaid = new Bepaid({shop_id: '363', shop_key: '4f585d2709776e53d080f36872fd1b63b700733e7624dfcadd057296daa37df6'});

describe('Create ERIP payment', function() {
	it('should return payment status', function() {
		return bepaid.createEripPayment({
		    "amount": 10,
		    "currency": "BYN",
		    "description": "Оплата заказа #123",
		    "email": "ivanpetrov@example.com",
		    "ip": "127.0.0.1",
		    "order_id": 123456789012,
		    "tracking_id": "AB8923",
		    "notification_url": "http://merchant.example.com",
		    "customer": {
		      "first_name": "Иван",
		      "middle_name": "Иванович",
		      "last_name": "Петров",
		      "country": "BY",
		      "city": "Минск",
		      "zip": "220000",
		      "address": "ул. Независимости, 1",
		      "phone": "+375172000000"
		    },
		    "payment_method": {
		      "type": "erip",
		      "account_number": "123",
		      "service_no": "99999999",
		      "service_info": [
		        "Оплата заказа 123"
		      ],
		      "receipt": [
		        "Спасибо за оплату заказа 123"
		      ]
		    },
		    "additional_data":{
		      "receipt_text": ["Первая строка", "Вторая строка"]
		    }
			}, 'https://api.bepaid.by/beyag/payments').then(function(res) {
			console.log(res);
			res.should.have.property('transaction');
		})
		.catch(function(e){
			console.log(e);
		})
	})
})
