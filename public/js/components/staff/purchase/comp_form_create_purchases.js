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
            validateBeforeSaving(){
                let self = this;
                let errors = 0;
                let item = {};
                for (var i = self.selectedItems.length - 1; i >= 0; i--) {
                    item = self.selectedItems[i];
                    if (item.qty === undefined) {
                        errors++;
                        console.log('qty is undefined')
                    }
                    if (Number(item.qty) <= 0) {
                        errors++;
                        console.log('qty <= 0')
                    }
                    if (isNaN(item.qty)) {
                        errors++;
                        console.log('qty is not a number')
                    }
                    if (Number(item.qty) > Number(item.running_balance)) {
                        ++errors;
                        console.log('your qty is greater than the stock');
                    }
                }
                // if (isNaN(self.amount_received)) {
                //     console.log('amount_received not a number: ' + self.amount_received);
                //     errors++;
                // }
                if (Number(self.amount_received) <= 0) {
                    errors++;
                    console.log('amount_received less than zero')
                }
                return errors;
            },
            savePurchased(){
                let self = this;
                let errors = self.validateBeforeSaving();
                console.log(errors);
                if (errors === 0) {
                    self.disableSubmitBtn = true;
                    self.clearErrors();
                    self.form.date = moment().format('MMMM DD, YYYY HH:mm:ss')
                    self.$http.post('api/purchase', self.form).then((resp) => {
                        let json = JSON.parse(resp.body);
                        self.saveItems(json);
                        self.disableSubmitBtn = false;
                    }, (resp) => {
                        self.disableSubmitBtn = false;
                        if (resp.status === 422) {
                            let json = JSON.parse(resp.body);
                            $.each(json, function(index, val) {
                                self.errors[index] = val;
                            });
                        }
                    });
                }else {
                    require(['toastr'], function(toastr){
                        toastr.warning('Please recheck [qty, amount_received] before proceeding. and try again')
                    });
                }
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
                let self = this;
                self.disableSubmitBtn = false;
                let total = Number(model.running_balance) - Number(model.qty);
                if (isNaN(total)) {
                    return model.running_balance;
                }else { 
                    if (Number(model.running_balance) >= Number(model.qty)) {
                        return total; 
                    }else {
                        self.disableSubmitBtn = true;
                        clearTimeout(self.sto);
                        self.sto = setTimeout(function(){
                            require(['toastr'], function(toastr){
                                toastr.error('Please enter a valid quantity');
                            })
                        }, 1000);
                        
                    }
                    
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