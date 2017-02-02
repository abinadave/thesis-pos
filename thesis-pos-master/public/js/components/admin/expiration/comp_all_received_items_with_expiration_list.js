define(['vue','vue-resource',
	'text!templates/admin/expiration/temp_all_received_items_with_expiration_list.html'], 
	function(Vue, VueResource, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            itemExpirations: {
            	type: Array
            }
    	},
    	data(){
    		return {
               
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
    		getItemName(model){
    			let self = this;
    			return self.$parent.getItemName(model);
    		},
            getDateReceived(model){
                let self = this;
                return self.$parent.getDateReceived(model);
            },
            getReceivedItemQty(model){
                return this.$parent.getReceivedItemQty(model);
            },
            getItemUnit(model){
                return this.$parent.getItemUnit(model);
            },
            getExpiryDate(model){
                return this.$parent.getExpiryDate(model);
            },
            getDaysFromNow(model){
                return this.$parent.getDaysFromNow(model);
            }
    	},
    	watch: {
    		
    	}
    });
   
    return Component; 
});