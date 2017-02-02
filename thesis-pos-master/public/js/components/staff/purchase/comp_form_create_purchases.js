define(['vue','vue-resource',
	'text!templates/staff/purchase/temp_form_create_purchases.html',
    'underscore',
    'moment'], 
	function(Vue, VueResource, template, _, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            selectedItems: {
                type: Array
            },
    		user: {
    			type: Object
    		},
            creatingPurchases:{
                type: Boolean
            },
            items: {
                type: Array
            }
    	},
    	data(){
    		return {
                form: {
                    amount_received: 0,
                    date: ''
                },
                errors: {
                    amount_received: ''
                },
                disableSubmitBtn: true,
                change: 0
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
            clearErrors(){
                let self = this;
                $.each(self.errors, function(index, val) {
                    self.errors[index] = '';
                });
            },
            savePurchased(){
                let self = this;
                self.clearErrors();
                self.form.date = moment().format('MMMM DD, YYYY HH:mm:ss')
                self.$http.post('api/purchase', self.form).then((resp) => {
                    let json = JSON.parse(resp.body);
                    self.saveItems(json);
                }, (resp) => {
                    if (resp.status === 422) {
                        let json = JSON.parse(resp.body);
                        $.each(json, function(index, val) {
                            self.errors[index] = val;
                        });
                    }
                });
            },
            saveItems(purchase){
                let self = this;
                self.$http.post('api/purchase_item', {
                    items: self.selectedItems,
                    purchase_id: purchase.id
                }).then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        if (json.length === self.selectedItems.length) {
                            self.change = 0;
                            self.form.amount_received = 0;
                            self.deductItems();
                            self.creatingPurchases = false;
                            self.selectedItems = [];
                            require(['toastr'], function(toastr){
                                toastr.success('Saved');
                                $(':checkbox').prop('checked', false);
                            });
                        }
                    }
                }, (resp) => {

                });
            },
            deductItems(items){
                let self = this;
                let item = {};
                let rs = [];
                for (var i = self.selectedItems.length - 1; i >= 0; i--) {
                    item = self.selectedItems[i];
                    rs = _.where(self.items, {id: item.id});
                    if (rs.length) {
                        let first = rs[0];
                        let total = self.getDeductedQty(item);
                        rs[0].running_balance = total;
                    }
                }
            },
            getDeductedQty(model){
                let total = Number(model.running_balance) - Number(model.qty);
                if (isNaN(total)) {
                    return model.running_balance;
                }else { 
                    return total; 
                }
            },
            getTotalAmount(model){
                let total = Number(model.qty) * Number(model.selling_price);
                if (isNaN(total)) {
                    return 0;
                }else { return total; }
            },
            getTotalAmountOverAll(){
                let self = this;
                let itemTotalAmount = 0;
                let overAllTotal = 0;
                let model = {};
                for (let i = 0; i < self.selectedItems.length; i++) {
                    model = self.selectedItems[i];
                    itemTotalAmount = self.getTotalAmount(model);
                    overAllTotal += itemTotalAmount;
                }
                return overAllTotal;
            },
            getChange(amount_received, total_bill){
                let self = this;
                let total = amount_received - total_bill;
                if (total >= 0) {
                    self.change = total;
                }else {
                    self.change = 0;
                }
            }
    	},
    	watch: {
    		'form.amount_received': function(newVal, oldVal){
                let self = this;
                let total = self.getTotalAmountOverAll();
                self.getChange(newVal, total);
                if (Number(newVal) < Number(total)) {
                    self.disableSubmitBtn = true;
                }else {
                    self.disableSubmitBtn = false;
                }
            }
    	}
    });
   
    return Component; 
});