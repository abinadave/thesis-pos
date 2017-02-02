define(['vue','vue-resource','moment'], 
	function(Vue, VueResource, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: `
            <input id="search-report" v-model="search" type="text" class="form-control" placeholder="Search">
            <a style="cursor: pointer; float: right" @click="printTable()"><i class="icon icon-2x icon-print"></i></a>
            <h4 class="report-header"></h4>
            <table border="1" class="table table-bordered table-hover" id="table-receive-items">
              <thead>
                  <tr>
                    <th class="text-center">Date Received</th>
                    <th class="text-center">Time</th>
                    <th class="text-center">Supplier</th>
                    <th class="text-center">Qty</th>
                    <th class="text-center">Unit</th>
                    <th class="text-center">Product</th>
                    <th class="text-center">Category</th>
                    <th class="text-center">Branch</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="item in receivingItems | filterBy search in 'qty' 'supplier' 'date' 'unit' 'name' 'branch' 'category'">
                   <td style="text-align: center">{{ getDate(item) }}</td>
                   <td style="text-align: center">{{ getTime(item) }}</td>
                   <td style="text-align: center">{{ getSupplier(item) | uppercase }}</td>
                   <td style="text-align: center">{{ item.qty }}</td>
                   <td style="text-align: center">{{ getItemIndex(item,'unit') | uppercase }}</td>
                   <td style="text-align: center">{{ getItemIndex(item,'name') | uppercase }}</td>
                   <td style="text-align: center">{{ getItemCategory(item) | uppercase }}</td>  
                   <td style="text-align: center">{{ getItemBranch(item) | uppercase }}</td>
               </tr>
              </tbody>
            </table>
        `,
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
                search: '',
                printTime: ''
    		}
    	},
    	created(){
    		this.fetchBranch().fetchCategories();
    	},
    	ready(){

    	},
    	methods: {
            printTable(){
                let self = this;
                $('.report-header').html('Receiving Report as of ' + moment().format('MMMM DD, YYYY'));
                let hideElements = '#toast-container, #footer, .dropdown, #search-report, .icon-print, .nav-tabs, #c, #header, #sidebar';
                $(hideElements).hide();
                window.print();
                setTimeout(function(){
                    $(hideElements).show();
                    $('.report-header').hide();
                }, 1000);
            },
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