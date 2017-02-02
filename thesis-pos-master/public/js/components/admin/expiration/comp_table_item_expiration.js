define(['vue','vue-resource',
    'underscore','moment',
	'text!templates/admin/expiration/temp_table_item_expiration.html',
    'components/admin/expiration/comp_edit_alert_date',
    'components/admin/expiration/comp_all_received_items_with_expiration_list',
    'components/admin/expiration/comp_list_of_expired_items',
    'components/admin/expiration/comp_list_of_nearly_expired_items'], 
	function(Vue, VueResource, _, moment, template, CompFormExpiration, CompAllExpirationList,
        CompExpiredItems, CompNearlyExpiredItems) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            
    	},
    	data(){
    		return {
               daysBeforeExpiration: 0,
               alertExpiration: {
                    days: 0
               },
               item_expirations: [], items: [], receiving_items: [], receiving_forms: [],
               numOfExpiredItems: 0,
               numOfNearlyExpiredItems: 0
    		}
    	},
        components: {
            'form-expiration': CompFormExpiration,
            'all-item-expirations': CompAllExpirationList,
            'expired-items': CompExpiredItems,
            'nearly-expired-items': CompNearlyExpiredItems
        },
    	created(){
            this.fetchExpirationLatets();
    	},
    	ready(){

    	},
    	methods: {
            fetchExpirationLatets(){
                let self = this;
                self.$http.get('/api/fetch_expiration_management').then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        self.alertExpiration = json.alert_expiration[0];
                        self.item_expirations = json.item_expirations;
                        self.items = json.items;
                        self.receiving_items = json.receiving_items;
                        self.receiving_forms = json.receiving_forms;
                    }
                }, (resp) => {
                    console.log(resp);
                });
            },
            getProduct(product_id){
                return _.where(this.items, {id: product_id});
            },
            getItemName(model){
                let self = this;
                let rsItems = self.getProduct(model.product_id);
                if (rsItems.length) {
                    return rsItems[0].name;
                }
            },
            getRecevingForm(rid){
                return _.where(this.receiving_forms, {id: rid});
            },
            getDateReceived(model){
                let self = this;
                let rs = self.getRecevingForm(model.rid);
                if (rs.length) { return moment(rs[0].date).format('MMMM DD, YYYY hh:mm a') };
            },
            getReceivingItems(rid){
                return _.where(this.receiving_items, {rid: rid});
            },
            getReceivedItemQty(model){
                let self = this;
                let rsRecevingItems = self.getReceivingItems(model.rid);
                if (rsRecevingItems.length) {
                    let rsItem = _.filter(rsRecevingItems, {pid: model.product_id});
                    if (rsItem.length) {
                        return rsItem[0].qty;
                    }
                }
            },
            getItemUnit(model){
                let self = this;
                let rsProduct = self.getProduct(model.product_id);
                if (rsProduct.length) {
                    return rsProduct[0].unit;
                }
            },
            getExpiryDate(model){
                let self = this;
                return moment(model.expiry_date).format('MMMM DD, YYYY');
            },
            getDaysFromNow(model){
                let self = this;
                return moment(model.expiry_date).fromNow();
            }
    	},
    	watch: {
    		'daysBeforeExpiration': function(newVal, oldVal){
                let self = this;
                self.alertExpiration.days = newVal;
            }
    	}
    });
   
    return Component; 
});