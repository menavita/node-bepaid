'use strict';

var request = require('request');
var Q = require('q');

function EPaid(shop_id, shop_key, email, notification_url){

	this.email = email;
	this.notification_url = notification_url;
	this.shop_id = shop_id;
	this.shop_key = shop_key;

};

EPaid.prototype.create = function(amount, description, order_id, permanent,account_number, service_no){

	var d = Q.defer();

	var req = {
		'request':{
			'amount': amount,
			'currency': 'BYN',
			'description': description,
			'email': this.email,
			'ip': '127.0.0.1',
			'notification_url': this.notification_url,
			'payment_method':{
				'type': 'erip',
				'permanent': permanent,
				'account_number': account_number,
				'service_no': service_no
			}
		}
	};

	request(
		{ method: 'POST',
			uri: 'https://api.bepaid.by/beyag/payments',
			headers:{
				'Content-Type': 'applcation/json',
				'Accept': 'application/json'
			},
			form: req,
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

EPaid.prototype.getpaymentbyuid = function(uid){

	var d = Q.defer();

	request({
			method: 'GET',
			uri: 'https://api.bepaid.by/beyag/payments/' + uid,
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

EPaid.prototype.getpaymentbyorder = function(order_id){

	var d = Q.defer();

	request({
			method: 'GET',
			uri: 'https://api.bepaid.by/beyag/payments/',
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

EPaid.prototype.delete = function(uid){

	var d = Q.defer();

	request({
			method: 'DELETE',
			uri: 'https://api.bepaid.by/beyag/payments/' + uid,
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

module.exports = EPaid;