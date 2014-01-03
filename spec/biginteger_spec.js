describe('BigInteger', function(){
    it('should exist', function(){
	expect(BigInteger).toBeDefined();
    });

    it('should have a parse method', function(){
	expect(BigInteger.parse).toBeDefined();
    });

    describe('#parse', function(){
	it('it should create numbers', function(){
	    expect(BigInteger.parse('1')).toBeDefined();
	});

	it('it should create numbers in any base', function(){
	    expect(BigInteger.parse('1', 3)).toBeDefined();
	});

	describe('argument validation', function(){
	    describe('\'base\' should be greater then 1', function(){
		var parsingForBase = function(value){
		    return function(){ BigInteger.parse("0", value); }
		}

		it('should correctly parse', function(){
		    expect(parsingForBase(2)).not.toThrow();
		    expect(parsingForBase(3)).not.toThrow();
		    expect(parsingForBase(4)).not.toThrow();
		    expect(parsingForBase(5)).not.toThrow();
		});

		it('should throw exception on', function(){
		    expect(parsingForBase(1)).toThrow();
		    expect(parsingForBase(0)).toThrow();
		    expect(parsingForBase(-1)).toThrow();
		    expect(parsingForBase('a')).toThrow();
		});
	    });

	    describe('\'number\' should match parseble string', function(){
		var parsing = function(value, base){
		    return function(){ BigInteger.parse(value, base); }
		}

		it('should correctly parse', function(){
		    expect(parsing('0')).not.toThrow();
		    expect(parsing('1')).not.toThrow();
		    expect(parsing('10')).not.toThrow();
		    expect(parsing('+1')).not.toThrow();
		    expect(parsing('-1')).not.toThrow();
		    expect(parsing('ff', 16)).not.toThrow();
		});

		it('should throw exception on', function(){
		    expect(parsing('00')).toThrow();
		    expect(parsing('01')).toThrow();
		    expect(parsing('++1')).toThrow();
		    expect(parsing('+-1')).toThrow();
		    expect(parsing('0z')).toThrow();
		    expect(parsing('z')).toThrow();
		    expect(parsing('Z')).toThrow();
		});
	    });
	});
    });

    describe('operations', function(){
	describe('#equals', function(){
	    it('should be true for same object', function(){
		var identical = BigInteger.parse('1');

		expect(identical.equals(identical)).toBeTruthy();
	    });

	    it('should be false for an other type', function(){
		var n = BigInteger.parse('1');

		expect(n.equals("1")).toBeFalsy();
		expect(n.equals(1)).toBeFalsy();
	    })

	    it('should be false for numbers with different base', function(){
		var base10 = BigInteger.parse('1', 10);
		var base16 = BigInteger.parse('1', 16);

		expect(base10.equals(base16)).toBeFalsy();
	    });

	    it('should be false for numbers of different length', function(){
		var length2 = BigInteger.parse('12', 10);
		var length3 = BigInteger.parse('123', 10);

		expect(length2.equals(length3)).toBeFalsy();
	    });

	    it('should be true for equal numbers', function(){
		['1', '12', '123', '1234', '12345', '123456'].forEach(function(testCase){
		    var m = BigInteger.parse(testCase, 16);
		    var n = BigInteger.parse(testCase, 16);

		    expect(m.equals(n)).toBeTruthy();
		});
	    });
	});

	describe('#plus', function(){
	    it('should add numbers of the same base', function(){
		var base = 3;
		var one = BigInteger.parse('1', base);
		var two = BigInteger.parse('2', base);
		var three = BigInteger.parse('10', base);

		var result = one.plus(two);

		expect(three.equals(result)).toBeTruthy();
	    });

	    it('should throw exception on adding different bases', function(){
		var addDifferentBases = function(b0, b1){
		    var i = BigInteger.parse('1', b0);
		    var j = BigInteger.parse('1', b1);
		    return function(){ i.plus(j); }
		}

		expect(addDifferentBases(2, 3)).toThrow();
	    })
	})
    });
});
