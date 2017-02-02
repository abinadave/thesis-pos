define(['vue','vue-resource','underscore',
	'text!templates/staff/category/temp_create_category.html'], 
	function(Vue, VueResource, _, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		}
    	},
    	data(){
    		return {
    			branches: [],
    			categories: [],
    			form: {
    				name: ''
    			},

    			errors: {
    				name: ''
    			}
    		}
    	},
    	created(){
    		this.fetchCategories();
    	},
    	methods: {
    		fetchCategories(){
    			var self = this;
    			self.$http.get('/api/category').then((resp) => {
    				if (resp.status === 200) {
    					self.categories = JSON.parse(resp.body);
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		saveCategory(){
    			var self = this;
    			self.clearErrors();
    			self.$http.post('/api/category', {
    				name: self.form.name
    			}).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					self.categories.push(json);
    					self.form.name = '';
    					require(['toastr'], function(toastr){
    					    toastr.success('Category successfully saved');
    					});
    				}
    			}, (resp) => {
    				if (resp.status === 422) {
    					let json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self.errors[index] = val;
    					});
    				}
    			});
    		},

    		clearErrors(){
    			let self = this;
    			$.each(self.errors, function(index, val) {
    				self.errors[index] = '';
    			});
    		}
    		
    	}
    });
   
    return Component; 
});