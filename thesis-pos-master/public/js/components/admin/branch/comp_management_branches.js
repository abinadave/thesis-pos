define(['vue','vue-resource',
	'text!templates/admin/branch/temp_management_branches.html'], 
	function(Vue, VueResource, template) {
    
    Vue.use(VueResource);

    var Component = Vue.extend({
    	template: template
    });
   
    return Component; 
});