# node-bepaid
Node module for using BePaid API

```javascript
var Bepaid = require('node-bepaid');

var bepaid = new Bepaid({shop_id: 'shop_id', shop_key: 'secret-key'});

bepaid.createEripPayment({
	amount: amount, 
	description: 'description', 
	order_id 'order_id', 
	permanent: (true/false), 
	account_number: 'account_number', 
	service_no: 'service_no', 
	email: 'email', 
	notification_url: 'url'
}, url).then(function(res){ console.log(JSON.parse(res)); });

bepaid.createToken({
	'transaction_type': 'tokenization/authorization/payment',
	'settings': {
		'success_url': 'http://127.0.0.1:4567/success',
		'decline_url': 'http://127.0.0.1:4567/decline',
	      	'fail_url': 'http://127.0.0.1:4567/fail'
	},
	'order': {
		'amount': 10,
		'currency': 'currency USD/BYN etc',
		'description': 'This is a test order',
	},
	'customer': {
		'email': 'email'
	}
}, url).then(function(res) {
	console.log(JSON.parse(res));
})
		
bepaid.getEripPaymentByOrder('order_id', url).then(function(res){ console.log(JSON.parse(res)); });
bepaid.getEripPaymentByUid('uid', url).then(function(res){ console.log(JSON.parse(res)); });
bepaid.deleteEripPayment('uid', url).then(function(res){ console.log(JSON.parse(res)); });
```
