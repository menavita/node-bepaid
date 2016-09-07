# node-erip-bepaid
Node module for using ERIP BePaid API

```javascript
var EPaid = require('./node-erip-bepaid');

var epaid = new EPaid('336', '28421dbd7ec390c927b909d3deecffde90b848c1f95693922e2b73862ececc0e','some@email.com', 'http://someurl.com');

epaid.create(200, 'description', '27', false, '123', '99999999').then(function(res){ console.log(JSON.parse(res)); });
epaid.getpaymentbyorder('335538500336').then(function(res){ console.log(JSON.parse(res)); });
epaid.getpaymentbyuid('5a43dcd7-eed8-4b7b-8bdb-74e92513b6d1').then(function(res){ console.log(JSON.parse(res)); });
epaid.delete('4bdeded4-a53d-4151-b1fd-58fce1edce29').then(function(res){ console.log(JSON.parse(res)); });
```
