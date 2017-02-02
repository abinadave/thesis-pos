define(['vue','vue-resource',
	'text!templates/admin/inventory/temp_form_edit_item.html'], 
	function(Vue, VueResource, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		},
    		editingItem: {
    			type: Boolean
    		},
    		item: {
    			type: Object
    		},
            items: {
                type: Array
            },
            branches: {
                type: Array
            },
            categories: {
                type: Array
            }
    	},
    	data(){
    		return {
                saving: false,
    			form: {

    			},
    			errors: {

    			}
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
    		gotoTable(){
    			var self = this;
    			self.editingItem = false;
    		},
    		saveItem(){
    			var self = this;
                self.saving = true;
                self.$http.put('/api/item', self.item).then((resp) => {
                    if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        if (json.updated) {
                            self.editingItem = false;
                            self.saving = false;
                            require(['toastr'], function(toastr){
                                toastr.info('Item successfully updated');
                            });
                        }
                    }
                }, (resp) => {
                    self.saving = false;
                    console.log(resp);
                });
    		}
    	},
    	watch: {
    		
    	}
    });
   
    return Component; 
});