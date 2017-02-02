define([
	'vue',
	'routes/admin-router',
	'components/admin/comp_app',
	'components/admin/expiration/expiration'
	], function(
	 Vue,
	 router, App, Expiration){

	var init = function(){	
		var self = this;
		router.start(App, '#app');
	};
	return { init: init };
});

