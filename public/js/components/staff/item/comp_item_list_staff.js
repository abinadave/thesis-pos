define(['vue','vue-resource','underscore',
	'text!templates/staff/item/temp_item_list_staff.html',
    'components/staff/purchase/comp_form_create_purchases',
    'components/staff/purchase/comp_modal_show_receipt'], 
	function(Vue, VueResource, _,template, CompFormPurchases, CompReceipt) {

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
    			categories: [], items: [], search: '',
                selected_category: 0,
                selectedItems: [],
                creatingPurchases: false
    		}
    	},
    	created(){
    		this.fetchCategories();
    		this.fetchItems();
    	},
    	ready(){

    	},
    	methods: {
            showReceiptModal(){
                let self = this;
                $('#receipt-modal').modal('show');
            },
            createPurchase(){
                let self = this;
                self.creatingPurchases = true;
            },
            chkChange(e, item){
                let $el = $(e.currentTarget);
                let is = $(e.target).is(":checked");
                if (is) {
                    this.selectedItems.push(item);
                }else {
                    this.selectedItems.$remove(item);
                }
            },
    		getCategoryName(item){
    			let filtered = _.filter(this.categories, {id: item.category});
    			if (filtered.length) {
    				item.category_name = filtered[0].name;
    				return filtered[0].name;
    			}
    		},
    		fetchItems(){
    			var self = this;
    			self.$http.get('/api/item').then((resp) => {
    				if (resp.status === 200) {
    					self.items = JSON.parse(resp.body);
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		fetchCategories(){
    			var self = this;
    			self.$http.get('/api/category').then((resp) => {
    				if (resp.status === 200) {
    					self.categories = JSON.parse(resp.body);
    				}
    			}, (resp) => {
    				console.log('something went wrong while fetching categories in this branch');
    				console.log(resp);
    			});
    		},
            getTotalItemsInCat(cat){
                var rs = _.where(this.items, {category: cat.id});
                return rs.length;
            }
    	},
        watch: {
            'selected_category': function(newVal, oldVal){
                let self = this;
                let resource = self.$resource('api/item/category{/id}');
                resource.get({id: newVal}).then((resp) => {
                    if (resp.status === 200) {
                        self.items = JSON.parse(resp.body)
                    }
                }, (resp) => {
                    console.log(resp);
                });
            }
        },
        components: {
            'form-purchases': CompFormPurchases,
            'modal-receipt': CompReceipt
        }
    });
   
    return Component; 
});