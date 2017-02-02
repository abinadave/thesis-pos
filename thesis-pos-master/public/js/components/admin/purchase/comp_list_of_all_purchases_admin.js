define(['vue','vue-resource','text!templates/admin/purchase/temp_list_of_all_purchases_admin.html',
    'underscore','moment'], 
	function(Vue, VueResource, template, _, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            
    	},
    	data(){
    		return {
               items: [], purchases: [], purchase_items: [],
               branches: [],
               selected_branch: 0,
               foundItems: 0,
               selected_date: '',
               search: ''
    		}
    	},
    	created(){
    		this.fetchAll();
            this.initDT();
    	},
    	ready(){

    	},
    	methods: {
            clearDate(){
                let self = this;
                self.selected_date = '';
                self.selected_branch = '';
                if (Number(self.selected_branch) > 0) {
                    self.filterByBranch(self.selected_branch);
                }else {
                    self.fetchAll();
                }
            },
            getPurchaseBranch(purchase_item){
                let self = this;
                let rsPurchases = self.getPurchase(purchase_item.purchase_id);
                if (rsPurchases.length) {
                    let purchase = rsPurchases[0];
                    let rsBranch = _.where(self.branches, {id: purchase.branch});
                    if (rsBranch.length) {
                        let first = _.first(rsBranch);
                        purchase_item.branch_name = first.name;
                        return first.name;
                    }else {
                        return 'not found';
                    }
                }
            },
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
            getRecordsByDate(date_of_record){
                let self = this;
                let validity = moment(date_of_record).isValid();
                if (validity === true) {
                    self.$http.post('/api/fetch_purchases_by_date', {
                        date: date_of_record,
                        branch: self.selected_branch
                    }).then((resp) => {
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
                self.selected_date = '';
    			self.$http.get('/api/fetch_purchases_admin').then((resp) => {
    				if (resp.status === 200) {
    					let json = JSON.parse(resp.body);
                        self.foundItems = json.purchase_items.length;
    					$.each(json, function(index, val) {
    						 self[index] = val;
    					});
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
            filterByBranch(i){
                let self = this;
                let isValidDate = moment(self.selected_date).isValid();
                let date = (isValidDate === true) ? moment(self.selected_date).format('MMMM DD, YYYY'): '0';
                self.$http.post('/api/fetch_purchases_by_branch',{
                    id: i,
                    date: date
                }).then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        self.foundItems = json.purchase_items.length;
                        $.each(json, function(index, val) {
                            self[index] = val;
                        });
                    }
                }, (resp) => {
                    console.log(resp);
                });
            }
    	},
    	watch: {
    		'selected_branch': function(newVal, oldVal){
                let i = Number(newVal);
                let self = this;
                if (i === 0) {
                    self.fetchAll();
                }else {
                    self.filterByBranch(i);
                }
            }
    	}
    });
   
    return Component; 
});