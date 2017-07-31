'use strict';

var request = require('request');
var Q = require('q');

function Bepaid(shop) {

	this.shop_id = shop.shop_id;
	this.shop_key = shop.shop_key;

};

Bepaid.prototype.createEripPayment = function(payment, url) {

	var d = Q.defer();

	var req = {
		'request':{
			'amount': payment.amount,
			'currency': payment.currency,
			'description': payment.description,
			'email': payment.email,
			'ip': '127.0.0.1',
			'notification_url': payment.notification_url,
			'payment_method':{
				'type': 'erip',
				'permanent': payment.permanent,
				'account_number': payment.account_number,
				'service_no': payment.service_no
			}
		}
	};

	request(
		{ method: 'POST',
			uri: url, // https://api.bepaid.by/beyag/payments
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

Bepaid.prototype.createToken = function(token, url) {
	var d = Q.defer();

	var req = {
		"checkout": {
	    "transaction_type": token.transaction_type,
	    "version": token.version || 2,
	    "attempts": token.attempts || 1,
	    "settings": {
	      "success_url": token.settings.success_url,
	      "decline_url": token.settings.decline_url,
	      "fail_url": token.settings.fail_url,
	      // "cancel_url": token.settings.cancel_url || "",
	      // "notification_url": token.settings.notification_url || "",
	      // "language": token.settings.language || "",
	      // "customer_fields" : {
	      //   "hidden" : token.settings.customer_fields.hidden || [],
	      //   "read_only" : token.settings.customer_fields.read_only || [],
	      // }
	      "customer_fields": token.settings.customer_fields || []
	    },
	    "order": {
	      "currency": token.order.currency,
	      "amount": token.order.amount,
	      "description": token.order.description,
	    },
	    "customer": {
	    	"email": token.customer.email,
	    	// "first_name": token.customer.first_name || "",
	    	// "last_name": token.customer.last_name || "",
	      // "address": token.customer.address || "",
	      // "city": token.customer.city || "",
	      // "state": token.customer.state || "",
	      // "zip": token.customer.zip || "",
	      // "phone": token.customer.phone || "",
	      // "bith_date": token.customer.bith_date || "",
	      // "country": token.customer.country || "" 
	    }
	  }
	}

	request(
		{ method: 'POST',
			uri: url, // https://checkout.begateway.com/ctp/api/checkouts
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