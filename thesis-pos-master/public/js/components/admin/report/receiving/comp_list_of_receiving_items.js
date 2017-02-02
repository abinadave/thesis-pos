define(['vue','vue-resource',
	'text!templates/admin/report/receiving/temp_list_of_receiving_items.html',
    'moment'], 
	function(Vue, VueResource, template, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		},
            receivingForms: {
                type: Array
            },
            items: {
                type: Array
            },
            receivingItems: {
                type: Array
            }
    	},
    	data(){
    		return {
    			branches: [],
    			categories: [],
                search: ''
    		}
    	},
    	created(){
    		this.fetchBranch().fetchCategories();
    	},
    	ready(){

    	},
    	methods: {
    		getSupplier(item){
    			let rs = _.where(this.receivingForms, {id: item.rid});
    			if (rs.length) {
                    item.supplier = rs[0].supplier;
    				return rs[0].supplier;
    			}
    		},
    		getDate(item){
    			let rs = _.where(this.receivingForms, {id: item.rid});
    			if (rs.length) {
                    item.date = moment(rs[0].date).format('MMMM DD, YYYY');
    				return item.date;
    			}
    		},
            getTime(item){
                let rs = _.where(this.receivingForms, {id: item.rid});
                if (rs.length) {
                    return moment(rs[0].date).format('hh:mm a');
                }
            },
    		getItemIndex(item, index){
    			let self = this;
    			let rs = _.where(self.items, {id: item.pid});
    			if (rs.length) {
                    item[index] = rs[0][index];
    				return rs[0][index];
    			}
    		},
    		getBranch(bid){
    			return _.where(this.branches, {id: bid});
    		},
    		getCategory(cid){
    			return _.where(this.categories, {id: cid});
    		},
    		getItemBranch(item){
    			let rs = _.where(this.items, {id: item.pid});
    			if (rs.length) {
    				let model = _.first(rs);
    				let rsBranch = this.getBranch(model.branch);
    				if (rsBranch.length) {
                        item.branch = rsBranch[0].name;
    					return rsBranch[0].name;
    				}else { return '-' };
    			}else { return '-' };
    		},
    		getItemCategory(item){
    			let rs = _.where(this.items, {id: item.pid});
    			if (rs.length) {
    				let model = _.first(rs);
    				let rsCategory = this.getCategory(model.branch);
    				if (rsCategory.length) {
                        item.category = rsCategory[0].name;
    					return rsCategory[0].name;
    				}else { return '-' };
    			}else { return '-' };
    		},
    		fetchBranch(){
    			let self = this;
    			self.$http.get('/api/branch').then((resp) => {
    				self.branches = JSON.parse(resp.body);
    			}, (resp) => {
    				console.log(resp);
    			});
    			return this;
    		},
    		fetchCategories(){
    			let self = this;
    			self.$http.get('/api/category').then((resp) => {
    				self.categories = JSON.parse(resp.body);
    			}, (resp) => {
    				console.log(resp);
    			});
    		}
    	},
    	watch: {
    		
    	}
    });
   
    return Component; 
});