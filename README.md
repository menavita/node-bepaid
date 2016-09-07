# node-erip-bepaid
Node module for using ERIP BePaid API

```javascript
var EPaid = require('./node-erip-bepaid');

var epaid = new EPaid('shop_id', 'secret-key','some@email.com', 'http://someurl.com');

epaid.create(amount, 'description', 'order_id', permanent(true/false), 'account_number', 'service_no').then(function(res){ console.log(JSON.parse(res)); });
epaid.getpaymentbyorder('order_id').then(function(res){ console.log(JSON.parse(res)); });
epaid.getpaymentbyuid('uid').then(function(res){ console.log(JSON.parse(res)); });
epaid.delete('uid').then(function(res){ console.log(JSON.parse(res)); });
```
