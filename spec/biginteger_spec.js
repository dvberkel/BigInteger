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

	    describe('\'number\' should match /(+|-)?[1-9a-zA-Z][0-9a-zA-Z]*/', function(){
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
});
