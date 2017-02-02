define(['vue','vue-resource','underscore'], 
	function(Vue, VueResource, _) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
        props: {
            user: {
                type: Object
            }
        },
        data(){
            return {
                categories: [], branches: [], items: [],
                form: {
                    name: '',
                    category: '',
                    purchase_price: '',
                    selling_price: '',
                    reorder_point: '',
                    additional_description: '',
                    bg_type: ''
                },
                errors: {
                    name: '',
                    category: '',
                    purchase_price: '',
                    selling_price: '',
                    reorder_point: '',
                    additional_description: '',
                    bg_type: ''
                }
            }
      },
    	template: `
        <style type="text/css">
          #inventory-items .text-danger {
              color: #a94442;
          }
        </style>
            <div class="span6" id="inventory-items">
                <div class="widget-box">
                    <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                      <h5>Item</h5>
                    </div>
                    <div class="widget-content nopadding">
                      <form @submit.prevent="saveItem()" class="form-horizontal">
                        <div class="control-group">
                          <label class="control-label">Item name</label>
                          <div class="controls">
                            <input v-model="form.name" type="text" class="span11" placeholder="Item name" />
                            <span class="text-danger"><br>{{ errors.name }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Select Category</label>
                          <div class="controls">
                             <select id="selected-branch" class="select2">
                                <option value="" selected disabled>Select Category</option>
                                <option value="{{ cat.id }}" v-for="cat in categories | orderBy 'name'">
                                  {{ cat.name | uppercase }}
                                </option>
                             </select>
                             <span class="text-danger"><br>{{ errors.category }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Select Branch</label>
                          <div class="controls">
                             <select v-model="form.branch" id="selected-branch">
                                <option value="" selected disabled>Select Branch</option>
                                <option value="{{ branch.id }}" v-for="branch in branches | orderBy 'name'">
                                  {{ branch.name | uppercase }}
                                </option>
                             </select>
                             <span class="text-danger"><br>{{ errors.branch }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Select Type</label>
                          <div class="controls">
                             <select v-model="form.bg_type" id="selected-bg-type">
                                <option selected>Generic</option>
                                <option >Branded</option>
                             </select>
                             <span class="text-danger"><br>{{ errors.branch }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Purchase Price</label>
                          <div class="controls">
                            <input v-model="form.purchase_price" type="text"  class="span11" placeholder="Price"  />
                            <span class="text-danger"><br>{{ errors.purchase_price  }}</span>

                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Selling Price</label>
                          <div class="controls">
                            <input v-model="form.selling_price" type="text" class="span11" placeholder="Price" />
                            <span class="text-danger"><br>{{ errors.selling_price  }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Unit</label>
                          <div class="controls">
                            <input v-model="form.unit" type="text" class="span11" placeholder="Ex. pcs-box-liters-meters" />
                            <span class="text-danger"><br>{{ errors.unit  }}</span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Reorder Point</label>
                          <div class="controls">
                            <input v-model="form.reorder_point" type="text" class="span11" placeholder="Item reorder point" />
                            <!-- <span class="help-block">Description field</span> </div> -->
                            <span class="text-danger"><br>{{ errors.reorder_point  }}</span>
                        </div>
                        <div class="control-group">
                          <label class="control-label">Additional Description</label>
                          <div class="controls">
                            <textarea v-model="form.additional_description" class="span11" placeholder="Optional"></textarea>
                          </div>
                        </div>
                        <div class="form-actions">
                          <button type="submit" class="btn btn-success">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>  
              </div>
      `,
    	created(){
    		this.getCategories();
    		this.getBranch();
    	},
    	ready(){
    		this.initSelect2();
    	},
    	methods: {
            clearWhat(index){
                var self = this; self[index].name = ''; self[index].category = ''; self[index].purchase_price = ''; self[index].selling_price = ''; self[index].reorder_point = ''; self[index].additional_description = '';
            },
    		initSelect2(){
    			var $select = $('.select2');
                var vm = this;
                require(['select2'], function(){
                   $select.select2({
                        placeholder: "Select a category",
                        allowClear: true
                    });
                   $select.change(function(event) {
                       var val = $(this).val();
                       vm.form.category = Number(val);
                   });
                });
    		},
    		getCategories(){
    			var self = this;
    			self.$http.get('/api/category').then((resp) => {
    				self.categories = JSON.parse(resp.body);
    			}, (resp) => {
    				console.log('something went wrong while fetching categories in this branch.');
    				console.log(resp);
    			});  
    		},
    		getBranch(){
    			var self = this;
    			self.$http.get('/api/branch').then((resp) => {
    				self.branches = JSON.parse(resp.body);
    			}, (resp) => {
    				console.log('something went wrong while fetching branches.');
    				console.log(resp);
    			});
    		},
    		saveItem(){
    			var self = this;
                self.clearWhat('errors');
    			self.$http.post('/api/item', self.form).then((resp) => {
    				if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        self.items.push(json);
                        self.clearWhat('form');
                    }
    			}, (resp) => {
    				if (resp.status === 422) {
    					var json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self.errors[index] = val;
    					});
    				}
    			});
    		}
    	}
    });
   
    return Component; 
});