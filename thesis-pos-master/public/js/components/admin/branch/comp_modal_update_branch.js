define(['vue','vue-resource',
	'text!templates/admin/branch/temp_modal_update_branch.html'], 
	function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		branch: {
    			type: Object
    		}
    	},
    	methods: {
    		updateBranch(){
    			var self = this;
    			self.$http.put('/api/branch', self.branch).then((resp) => {
    				if (resp.status == 200) {
    					var json = JSON.parse(resp.body);
    					$('#modal-update-branch').modal('hide');
    					if (json.updated) {
    						require(['toastr'], function(toastr){
    						    toastr.info('Branch successfully updated');
    						});
    					}
    				}
    			}, (resp) => {
    				$('#modal-update-branch').modal('hide');
    				require(['toastr'], function(toastr){
					    toastr.info('Something went wrong while updating the branch');
					});
    			});
    		}
    	}
    });
   
    return Component; 
});