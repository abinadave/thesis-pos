define(['vue','vue-resource','underscore',
	'text!templates/admin/inventory/temp_table_trashed_item.html'], 
	function(Vue, VueResource, _, template) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	data(){
    		return {
    			branches: [], categories: [], items: [],
    			search: ''
    		}
    	},
    	created(){
    		this.fetchAll();
    	},
    	ready(){

    	},
    	methods: {
    		deletePermanently(item){
    			var self = this;
                require(['alertify'], function(alertify){
                    alertify.defaults.glossary.title = "Confirmation";
                    alertify.confirm('Permanently Delete this product', function(e){
                        if (e) {
                            self.thenDestroyItem(item);
                        }
                    });
                });
    		},
    		thenDestroyItem(item){
    			var self = this;
    			let resource = self.$resource('api/item/trashed{/id}');
    			resource.delete({id: item.id}).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					if (json.destroyed) {
    						self.items.$remove(item);
    						require(['toastr'], function(toastr){
    						    toastr.warning('Product permanently removed');
    						});    						
    					}
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		restoreItem(item){
    			let self = this;
    			self.$http.put('/api/item/trashed/restore', item).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					if (json.restored) {
    						self.items.$remove(item);
    					}
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		getCategoryName(item){
    			let filtered = _.filter(this.categories, {id: item.category});
    			if (filtered.length) {
    				item.category_name = filtered[0].name;
    				return filtered[0].name;
    			}
    		},
    		fetchAll(){
    			var self = this;
    			self.$http.get('/api/trashed_product_management').then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self[index] = val;
    					});
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		}
    	}
    })
   
    return Component; 
});