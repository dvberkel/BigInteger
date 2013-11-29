pico = (function(undefined){
    var pico = function pico(template){
        var _regexp = /\{\{(\w*)\}\}/g;
        return function(data) {
	    data = data || {};
            return template.replace(_regexp, function(str, key){
		if (data[key]) {
                    return data[key];
		} else {
		    return str;
		}
            });
        }
    };
    return pico;
})();
