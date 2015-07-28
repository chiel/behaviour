'use strict';

var indexOf = require('mout/array/indexOf');
var isArray = require('mout/lang/isArray');
var behaviours = [];
var cache = {};

/**
 * Register a new behaviour
 * @param {String} attribute
 * @param {Function} Fn
 */
var register = function(attribute, Fn){
	behaviours.push({
		attribute: attribute,
		Fn: Fn
	});
};

/**
 * Execute all cached behaviours
 */
var execute = function(){
	var i, len = behaviours.length, b, els, x, options, y;

	for (i = 0; i < len; i++){
		b = behaviours[i];
		if (!cache[b.attribute]){
			cache[b.attribute] = [];
		}

		els = document.querySelectorAll('[' + b.attribute + ']');
		if (els && els.length){
			for (x = 0; x < els.length; x++){
				if (indexOf(cache[b.attribute], els[x]) != -1) continue;
				cache[b.attribute].push(els[x]);

				options = els[x].getAttribute(b.attribute);
				try{
					options = JSON.parse(options);
				} catch (e){}

				if (!isArray(options)){
					options = [ options ];
				}
				for (y = 0; y < options.length; y++){
					new b.Fn(els[x], options[y]);
				}
			}
		}
	}
};

module.exports = {
	register: register,
	execute: execute
};
