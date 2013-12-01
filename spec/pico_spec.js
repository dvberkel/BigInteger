describe('pico', function(){
    it('should exist', function(){
	expect(pico).toBeDefined();
    });

    describe('should correctly template', function(){
	describe('a literal string', function(){
	    var literal = pico('a literal string');

	    it('should return itself', function(){
		expect(literal()).toBe('a literal string');
		expect(literal({})).toBe('a literal string');
		expect(literal({ 'a': 'a' })).toBe('a literal string');
	    });
	});

	describe('an interpretable string', function(){
	    var literal = pico('a {{adjective}} string');

	    it('should return interpretation', function(){
		expect(literal()).toBe('a {{adjective}} string');
		expect(literal({})).toBe('a {{adjective}} string');
		expect(literal({ 'adjective': 'interpretable' })).toBe('a interpretable string');
	    });
	});
    })
});
