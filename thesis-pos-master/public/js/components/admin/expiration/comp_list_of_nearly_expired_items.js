define(['vue','vue-resource','moment','underscore',
	'text!templates/admin/expiration/temp_list_of_nearly_expired_items.html'], 
	function(Vue, VueResource, moment, _, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            itemExpirations: {
            	type: Array
            },
            numOfNearlyExpiredItems: {
            	type: Number
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
            },
            getNearlyExpiredItems(){
    			let expiration_date = '';
    			let date_now = moment().format('MMMM DD, YYYY');
    			return this.itemExpirations.filter(function(model) {
    				expiration_date = moment(model.expiry_date).format('MMMM DD, YYYY');
    				return moment(date_now).isBefore(expiration_date) === true;
    			});
    		}
    	},
    	computed: {
    		nearlyExpiredItems(){
    			let self = this;
    			let itemsFound = self.getNearlyExpiredItems();
    			self.numOfNearlyExpiredItems = itemsFound.length;
    			return itemsFound;
    		}
    	},
    	watch: {
    		
    	}
    });
   
    return Component; 
});