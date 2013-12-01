var BigInteger = (function(pico, undefined){
    function normalizeBase(base) {
	return typeof base ==  'undefined' ? 10 : base;
    }

    var cipher = (function(){
	var ciphers = '0123456789abcdefghijklmnopqrstuvwxyz';
	return function(index){
	    return ciphers[index];
	};
    })();
    var range = (function(){
	var naked = pico('{{from}}-{{to}}');
	var single = pico('[{{digits}}]');
	var multi = pico('[{{digits}}{{alpha}}{{ALPHA}}]')
	return function(from, to){
	    if (typeof to == 'undefined'){
		to = from;
		from = 0;
	    }
	    to = to -1;
	    if (to <= 9) {
		return single({ digits: naked({ from: cipher(from), to: cipher(to) }) });
	    }
	    if (to > 9) {
		var data = {
		    'digits' : naked({ from: cipher(from), to: cipher(9) }),
		    'alpha' : naked({ from: cipher(10), to: cipher(to) }),
		    'ALPHA' : naked({ from: cipher(10), to: cipher(to) }).toUpperCase()
		}
		return multi(data);
	    }
	};
    })();

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
})(pico);
