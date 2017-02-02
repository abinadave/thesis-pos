define([
	'vue',
	'routes/guest-router',
	'components/guest/comp_guest'
	], function(
	 Vue,
	 router, 
	 CompGuest){
		
	var init = function(){	
		var self = this;
		Vue.component('comp-guest', CompGuest);
		router.start({}, '#app');
	};
	return { init: init };
});

