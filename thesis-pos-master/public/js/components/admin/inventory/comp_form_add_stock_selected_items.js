define(['vue','vue-resource','moment',
	'text!templates/admin/inventory/temp_form_add_stock_selected_items.html'], 
	function(Vue, VueResource, moment, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		},
    		addingSomeStocks: {
    			type: Boolean
    		},
    		selectedItems: {
    			type: Array
    		},
    		rrNo: {
    			type: Number
    		}
    	},
    	data(){
    		return {
    			errors: {
    				supplier: '',
    				verified_by: '',
    				date: ''
    			},
    			form: {
    				supplier: '',
    				date: moment().format('MMMM DD, YYYY')
    			}
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
    		getBranchName(item){
    			return this.$parent.getBranchName(item);
    		},
    		getCategoryName(item){
    			return this.$parent.getCategoryName(item);
    		},
    		removeItem(item){
    			this.selectedItems.$remove(item);
    		},
    		receiveItems(){
    			var self = this;
                self.form.date = moment().format('MMMM DD, YYYY HH:mm:ss');
    			self.$http.post('/api/receiving_form', self.form).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					self.saveItems(json);
    				}
    			}, (resp) => {
    				if (resp.status === 422) {
    					let json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self[index].errors = val;
    					});
    				}
    			});
    		},
            saveItems(receiving_form){
                let self = this;
                self.$http.post('/api/receiving_item', {
                    items: self.selectedItems,
                    rid: receiving_form.id
                }).then((resp) => {
                    let json = JSON.parse(resp.body);
                    if(json.saved_items.length === self.selectedItems.length){
                        require(['toastr'], function(toastr){
                            toastr.info('Items successfully received');
                        });
                        self.addingSomeStocks = false;
                    }
                }, (resp) => {
                    console.log(resp);
                });
            }
    	},
    	watch: {
    		'rrNo': function(newVal){
    			var self = this;
    			self.form.rr_no = newVal;
    		}
    	}
    });
   
    return Component; 
});