'use strict';

var request = require('request');
var Q = require('q');

function bePaid(shop) {

	this.shop_id = shop.shop_id;
	this.shop_key = shop.shop_key;

};

bePaid.prototype.createEripPayment = function(payment, url) {

	var d = Q.defer();

	request(
		{ method: 'POST',
			uri: url, // https://api.bepaid.by/beyag/payments/
			headers:{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: {"request": payment},
			json: true,			
			encoding: 'UTF-8',
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body) {
			if (error) d.reject(error);
			if (body.errors) d.reject(body);
			d.resolve(body);
		}
	);

	return d.promise;

};

bePaid.prototype.createToken = function(token, url) {
	var d = Q.defer();

	request(
		{ method: 'POST',
			uri: url, // https://checkout.begateway.com/ctp/api/checkouts/
			headers:{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: {"checkout": token},
			json: true,
			encoding: 'UTF-8',
			auth: {
				'user': this.shop_id,
				'pass': this.shop_key
			}
		},
		function(error,res,body) {
			if (error) d.reject(error);
			if (body.errors) d.reject(body);
			d.resolve(body);
		}
	);

	return d.promise;
}

bePaid.prototype.getEripPaymentByUid = function(uid, url) {

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
			if (error) d.reject(error);
			if (body.errors) d.reject(body);
			d.resolve(body);
		}
	);

	return d.promise;

};

bePaid.prototype.getEripPaymentByOrder = function(order_id, url) {

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
			if (error) d.reject(error);
			if (body.errors) d.reject(body);
			d.resolve(body);
		}
	);

	return d.promise;

};

bePaid.prototype.deleteEripPayment = function(uid, url) {

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
			if (error) d.reject(error);
			if (body.errors) d.reject(body);
			d.resolve(body);
		}
	);

	return d.promise;

};

module.exports = bePaid;
