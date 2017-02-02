define(['vue','vue-resource',
	'text!templates/staff/category/temp_table_category.html'], 
	function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	created(){
    		this.fetchCategory();
            this.fetchItem();
    	},
    	data(){
    		return {
                items: [],
    			categories: [],
    			search: ''
    		}
    	},
    	methods: {
            getItemsInThisCat(cat){
                return this.items.filter(function(index) {
                    return Number(index.category) === Number(cat.id);
                });
            },
    		editCategory(cat){
    			var self = this;
    			require(['alertify'], function(alertify){
    				alertify.defaults.glossary.title = 'Update category';
    			    alertify.prompt("This is a prompt dialog", cat.name.toUpperCase(), function(e, str){
    			    	if (e) {
    			    		if (str.toUpperCase() !== cat.name.toUpperCase()) {
    			    			self.updateDB(cat, str);
    			    		}
    			    	}
    			    });
    			});
    		},
    		updateDB(cat, str){
    			var self = this;
    			self.$http.put('/api/category', {
    				name: str,
    				cat_id: cat.id
    			}).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					cat.name = str;
    					require(['toastr'], function(toastr){
    					    toastr.info('Category successfully updated');
    					});
    				}
    			}, (resp) => {
    				if (resp.status === 422) {
						self.showErrorsInUpdate(resp);    					
    				}
    			});
    		},
    		showErrorsInUpdate(resp){
    			var json = JSON.parse(resp.body);
			    $.each(json, function(index, val) {
					alert(val);
				});
    		},
    		removeCategory(cat){
    			var self = this;
    			require(['alertify'], function(alertify){
    				alertify.defaults.glossary.title = 'Confirmation';
    			    alertify.confirm('Are you sure you want to delete: <b>'+cat.name + '</b> from the list ?', function(e){
    			    	if (e) {
    			    		self.removeDB(cat);
    			    	}
    			    });
    			});
    		},
    		removeDB(cat){
    			var self = this;
    			var resource = self.$resource('api/category{/id}');
    			resource.delete({id: cat.id}).then( (resp) => {
    				self.categories.$remove(cat);
    			}, (resp) => {
                    console.log('error while deleting branch');
    				console.log(resp);
    			});
    		},
    		fetchCategory(){
    			var self = this;
    			self.$http.get('/api/category').then((resp) => {
    				if (resp.status === 200) {
    					self.categories = JSON.parse(resp.body);
    				}
    			}, (resp) => {
    				console.log('something went wrong while fetching categories in this branch');
    				console.log(resp);
    			})
    		},

            fetchItem(){
                var self = this;
                self.$http.get('/api/item').then((resp) => {
                    if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        self.items = json;
                    }
                }, (resp) => {
                    console.log(resp);
                });
            }
    	}
    });
   
    return Component; 
});