define(['vue','vue-resource','underscore','moment',
	'text!templates/staff/purchase/temp_table_purchase_staff.html'], 
	function(Vue, VueResource, _, moment, template) {
   
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
               items: [], purchase_items: [], purchases: [],
               date: moment().format('MM-DD-YYYY'),
               datePickerMsg: '', search: ''
    		}
    	},
    	created(){
    		this.fetchAll();
            this.initDT();
    	},
    	ready(){
            
    	},
    	methods: {
            initDT(){
                let self = this;
                require(['datepicker-bootstrap'], function(){
                    $('#datepicker-purchase').datepicker({
                        format: "mm/dd/yyyy"
                    });
                    $("#datepicker-purchase").on("changeDate", function(e) {
                        let date = moment(e.date).format('MMMM DD, YYYY');
                        self.getRecordsByDate(date);
                    });
                });
            },
            getRecordsByDate(date){
                let self = this;
                let resource = self.$resource('api/purchase/date/staff{/date}');
                resource.get({date: date}).then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        self.datePickerMsg = json.purchase_items.length + ' record/s in database.';
                        $.each(json, function(index, val) {
                            self[index]= val;
                        });
                    }
                }, (resp) => {
                    console.log(resp);
                });
            },
    		getItem(i){
    			return _.where(this.items, {id: i});
    		},
    		getPurchase(purchase_id){
    			return _.where(this.purchases, {id: purchase_id});
    		},
    		getItemWhat(model, index){
    			let self = this;
    			let rs = self.getItem(model.product_id);
    			if (rs.length) {
                    model[index] = rs[0][index];
    				return rs[0][index];
    			}
    		},
    		getPurchasedDate(model){
    			let self = this;
    			let rs = self.getPurchase(model.purchase_id);
    			if (rs.length) {
    				return moment(rs[0].date).format('MMMM DD, YYYY dddd');
    			}
    		},
            getPurchasedTime(model){
                let self = this;
                let rs = self.getPurchase(model.purchase_id);
                if (rs.length) {
                    return moment(rs[0].date).format('hh:mm a');
                }
            },
    		fetchAll(){
    			let self = this;
                self.datePickerMsg = '';
                self.date = moment().format('MM/DD/YYYY');
    			self.$http.get('/api/fetch_purchases_staff').then((resp) => {
    				// console.log('ok');
    				if (resp.status === 200) {
    					let json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self[index] = val;
    					});
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		}
    	},
        computed: {
            getTotal(){
                let self = this;
                let purchase_item = {};
                let total = 0;
                for (var i = self.purchase_items.length - 1; i >= 0; i--) {
                    purchase_item = self.purchase_items[i];
                    total += Number(purchase_item.qty) * Number(purchase_item.old_price);
                }
                return total;
            }
        },
    	watch: {
    		
    	}
    });
   
    return Component; 
});