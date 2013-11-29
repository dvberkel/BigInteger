var BigInteger = (function(undefined){
    function normalizeBase(base) {
	return typeof base ==  'undefined' ? 10 : base;
    }

    var cipher = (function(){
	var ciphers = '0123456789abcdefghijklmnopqrstuvwxyz';
	return function(index){
	    return ciphers[index];
	};
    })();
    var range = function(from, to){
	if (typeof to == 'undefined'){
	    to = from;
	    from = 0;
	}
	if (to <= 9) {
	    return '[' + cipher(from) + '-' + cipher(to) + ']';
	}
	if (to > 9) {
	    var alpha = cipher(10) + '-' + cipher(to);
	    return '[' + cipher(from) + '-' + cipher(9) + alpha + alpha.toUpperCase() + ']';
	}
    };
    window.range = range;

    var BaseValidator = function(base){
	this.base = normalizeBase(base);
    }
    BaseValidator.prototype.isValid = function(){
	return typeof this.base == 'number' && this.base > 1;
    }

    var NumberValidator = function(number, base){
	this.number = number;
	this.base = normalizeBase(base);
    }
    NumberValidator.prototype.isValid = function(){
	return this.regex().test(this.number);
    }
    NumberValidator.prototype.regex = function(){
	var raw = '^(\\+|-)?(0|' +
	    range(1, this.base) +
	    range(this.base) + '*' +
	    ')$';
	return new RegExp(raw);
    }

    var BigInteger = function(){};
    BigInteger.prototype.parse = function(number, base){
	var baseValidator = new BaseValidator(base);
	if (!baseValidator.isValid()) { throw 'mistaken' };
	var numberValidator = new NumberValidator(number, base);
	if(!numberValidator.isValid()) { throw 'mistaken' };
	return {};
    };

    return new BigInteger();
})();
