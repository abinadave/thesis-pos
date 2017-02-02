define([
	'vue',
	'routes/staff-router'
	], function(
	Vue, 
	router){

	var init = function(){	
		var self = this;
		router.start({}, '#app');
	};
	return { init: init };
});

