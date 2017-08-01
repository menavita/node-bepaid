'use strict';

var request = require('request');
var Q = require('q');

function Bepaid(shop) {

	this.shop_id = shop.shop_id;
	this.shop_key = shop.shop_key;

};

Bepaid.prototype.createEripPayment = function(payment, url) {

	var d = Q.defer();

	request(
		{ method: 'POST',
			uri: url, // https://api.bepaid.by/beyag/payments/
			headers:{
				'Content-Type': 'applcation/json',
				'Accept': 'application/json'
			},
			form: {"request": payment},
			encoding: 'UTF-8',
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body) {
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;

};

Bepaid.prototype.createToken = function(token, url) {
	var d = Q.defer();

	request(
		{ method: 'POST',
			uri: url, // https://checkout.begateway.com/ctp/api/checkouts/
			headers:{
				'Content-Type': 'applcation/json',
				'Accept': 'application/json'
			},
			form: {"checkout": token},
			encoding: 'UTF-8',
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body) {
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;
}

Bepaid.prototype.getEripPaymentByUid = function(uid, url) {

	var d = Q.defer();

	request({
			method: 'GET',
			uri: url + uid, // 'https://api.bepaid.by/beyag/payments/' + uid,
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body){
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;

};

Bepaid.prototype.getEripPaymentByOrder = function(order_id, url) {

	var d = Q.defer();

	request({
			method: 'GET',
			uri: url,// 'https://api.bepaid.by/beyag/payments/',
			qs: {order_id: order_id},
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body){
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;

};

Bepaid.prototype.deleteEripPayment = function(uid, url) {

	var d = Q.defer();

	request({
			method: 'DELETE',
			uri: url + uid,// https://api.bepaid.by/beyag/payments/
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body){
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;

};

module.exports = Bepaid;