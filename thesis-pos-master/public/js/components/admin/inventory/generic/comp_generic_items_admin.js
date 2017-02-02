define(['vue','vue-resource','underscore'], 
	function(Vue, VueResource, _) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: `
            <div class="span12">
                <label style="float: right" class="label label-info">
                    Generic items ({{ generic_items.length }})
                </label>
                <input v-model="search" type="text" class="form-control" placeholder="Search branch">

                    <div class="widget-box">
                      <div class="widget-title"> <span class="icon"><i class="icon-building"></i></span>
                          <h5 style="color: #31708f;font-weight: bolder">Generic item List </h5>
                      </div>

                      <div class="widget-content nopadding">
                        <table class="table table-bordered data-table">
                          <thead> 
                            <tr>
                              <th style="text-align: center">Branch</th>
                              <th style="text-align: center">Category</th>
                              <th style="text-align: left">Item name</th>
                              <th style="text-align: right">Purchase Price</th>
                              <th style="text-align: right">Selling Price</th>
                              <th style="text-align: right">Stocks</th>
                              <th style="text-align: left">Unit</th>
                              <th style="text-align: right">Reorder point</th>
                              <th style="text-align: left">Additional Description</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in generic_items | filterBy search in 'name' 'purchase_price' 'selling_price' 'running_balance' 'unit' 'additional_description'">
                                  <td style="text-align: center">{{ getBranch(item) }}</td>
                                  <td style="text-align: center">{{ getCategory(item) }}</td>
                                  <td>{{ item.name }}</td>
                                  <td style="text-align: right">{{ item.purchase_price }}</td>
                                  <td style="text-align: right">{{ item.selling_price }}</td>
                                  <td style="text-align: right">{{ item.running_balance }}</td>
                                  <td style="text-align: left">{{ item.unit }}</td>
                                  <td style="text-align: right">{{ item.reorder_point }}</td>
                                  <td>{{ item.additional_description }}</td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
        `,
        created(){
            this.fetchAll();
        },
        props: {
            genericItemLength: {
                type: Number
            }
        },
    	data(){
    		return {
                search: '',
                categories: [], generic_items: [],
                branches: []
    		}
    	},
    	methods: {
            getCategory(item){
                let self = this;
                let rs = _.filter(self.categories, {id: item.category});
                return rs[0].name;
            },
            getBranch(item){
                let self = this;
                let rs = _.filter(self.branches, {id: item.branch});
                return rs[0].name;
            },
            fetchAll(){
                let self = this;
                self.$http.get('/product/generic').then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        self.genericItemLength = json.generic_items.length;
                        $.each(json, function(key, value){ self[key] = value; });
                    }
                });
            }
    	}
    });
   
    return Component; 
});