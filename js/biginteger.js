var BigInteger = (function(pico, undefined){
    function normalizeBase(base) {
	return typeof base ==  'undefined' ? 10 : base;
    }

    var cipher = (function(){
	var ciphers = '0123456789abcdefghijklmnopqrstuvwxyz';
	var symbols = ciphers.split('');
	return {
	    'symbol': function(index){
		return ciphers[index];
	    },
	    'index': function(symbol){
		return symbols.indexOf(symbol.toLowerCase());
	    }
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
		return single({ digits: naked({ from: cipher.symbol(from), to: cipher.symbol(to) }) });
	    }
	    if (to > 9) {
		var data = {
		    'digits' : naked({ from: cipher.symbol(from), to: cipher.symbol(9) }),
		    'alpha' : naked({ from: cipher.symbol(10), to: cipher.symbol(to) }),
		    'ALPHA' : naked({ from: cipher.symbol(10), to: cipher.symbol(to) }).toUpperCase()
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

    var Number = function(ciphers, base){
	this.ciphers = ciphers;
	this.base = base;
    };
    Number.prototype.equals = function(other){
	if (this === other) {
	    return true;
	}
	if (this.base === other.base && this.ciphers.length === other.ciphers.length) {
	    var index = 0;
	    while (index < this.ciphers.length) {
		if (this.ciphers[index] !== other.ciphers[index]) {
		    return false;
		}
		index++;
	    }
	    return true;
	}
	return false;
    };
    Number.prototype.plus = function(other){
	if (this.base !== other.base) { throw "mistaken" }
	var ciphers = [];
	var carry = 0;
	var index = 0;
	while(index < this.ciphers.length && index < other.ciphers.length) {
	    ciphers[index] = this.ciphers[index] + other.ciphers[index] + carry;
	    carry = 0;
	    while (ciphers[index] >= this.base) {
		ciphers[index] -= this.base
		carry += 1;
	    }
	    index++;
	}
	if (carry > 0) {
	    ciphers.push(carry);
	}
	return new Number(ciphers, this.base);
    }

    var BigInteger = function(){};
    BigInteger.prototype.parse = function(number, base){
	var baseValidator = new BaseValidator(base);
	if (!baseValidator.isValid()) { throw 'mistaken' };
	var numberValidator = new NumberValidator(number, base);
	if(!numberValidator.isValid()) { throw 'mistaken' };
	var ciphers = number.split('').reverse().map(cipher.index);
	return new Number(ciphers, normalizeBase(base));
    };

    return new BigInteger();
})(pico);
