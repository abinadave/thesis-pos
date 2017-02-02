define(['vue','vue-resource',
	'text!templates/admin/staff/temp_table_trashed_staff.html'], 
	function(Vue, VueResource, template) {
 
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	created(){
    		this.fetch();
    	},
    	data(){
    		return {
    			branches: [], trashed: [],
    			loadingData: true
    		}
    	},
    	methods: {
            deletePermanently(staff){
                var self = this;
                require(['alertify'], function(alertify){
                    alertify.confirm('Would you like to permanently delete <b>'+staff.name.toUpperCase() + '</b> from the list ?', function(e){
                        if (e) {
                            var resource = self.$resource('/api/staff/trashed{/id}');
                            resource.delete({id: staff.id}).then((resp) => {
                                if (resp.status === 200) {
                                    var json = JSON.parse(resp.body);
                                    if (json.destroyed) {
                                        self.trashed.$remove(staff);
                                    }
                                }
                            }, (resp) => {
                                console.log(resp);
                            });
                        }
                    });
                });
                
            },
    		restoreStaff(user){
    			var self = this;
    			var resource = self.$resource('api/trashed/user{/id}');
    			self.$http.put('/api/user/trashed', user).then((resp) => {
    				var json = JSON.parse(resp.body);
    				if (json.restored) {
    					self.trashed.$remove(user);
    					require(['toastr'], function(toastr){
    					    toastr.info('Staff restored');
    					});
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		fetch(){
    			var self = this;
    			self.$http.get('/api/branch/trashed').then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					self.braches = json.braches;
    					self.trashed = json.trashed;
    					self.loadingData = false;
    				}
    			}, (resp) => {
    				console.log(resp);
    				self.loadingData = false;
    			});
    		}
    	}
    });
   
    return Component; 
});