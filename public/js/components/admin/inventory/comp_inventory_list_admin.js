define(['vue','vue-resource','underscore',
	'text!templates/admin/inventory/temp_inventory_list_admin.html',
    'components/admin/inventory/comp_form_edit_item',
    'components/admin/inventory/comp_form_add_stock_selected_items'], 
	function(Vue, VueResource, _,template, CompFormEditItem, CompFormAddStocks) {

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
    			categories: [], 
                items: [], 
                search: '',
    			branches: [],
    			selected_branch: 0, 
                selected_category: 0,
                modalUpdateItem: {},
                editingItem: false,
                loadingData: true,
                selectedItems: [],
                addingSomeStocks: false,
                rrNo: 0
    		}
    	},
    	created(){
    		this.fetchAll();
    	},
    	ready(){
    		this.initSelect2();
    		this.initSelectCat();
    	},
        components: {
            'form-edit-item': CompFormEditItem,
            'form-add-stocks': CompFormAddStocks
        },
    	methods: {
            updateStocks(changedItems){
                let self = this;
                let changedItem = {};
                let rs = [], item = {};
                for (var i = changedItems.length - 1; i >= 0; i--) {
                    changedItem = changedItems[i];
                    rs = _.filter(self.items, {id: changedItem.id});
                    if (rs.length) {
                        item = rs[0];
                        item.running_balance = Number(changedItem.qty) + Number(changedItem.running_balance);
                    }
                }
                $('input:checkbox').prop('checked', false);
            },
            checkIfChecked(item){
                var rs = _.filter(this.selectedItems, {id: item.id});
                if (rs.length) {
                    return true;
                }else {
                    return false;
                }
            },
            addSelectedItems(e, item){
                let self = this;
                let is = $(e.target).is(':checked');
                if (is) {
                    /* add item in selected items*/
                    self.selectedItems.push(item);
                }else {
                    /* remove item in selected item */
                    self.selectedItems.$remove(item);
                }
            },
            showModalAddStock(){
                let self = this;
                self.addingSomeStocks = true;
                self.generateRrNo();
            },
            generateRrNo(){
                var self = this;
                self.$http.get('/api/receiving_form/max_id').then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        self.rrNo = json.max_id;    
                    }
                }, (resp) => {
                    console.log(resp);
                });
            },
            initializeTbl(){
                var self = this;
                $(function() {
                    require(['modules/functions'], function(Fn){
                        setTimeout(function() {
                            Fn.datatablePlugin('#tbl-items');
                        }, 500);
                    });
                });            
            },
    		fetchAll(){
    			var self = this;
    			self.$http.get('/api/product_management').then((resp) => {
    				if (resp.status === 200) {
                        self.loadingData = false;
    					var json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self[index] = val;
    					});
                      // self.initializeTbl();
    				}
    			}, (resp) => {
                    self.loadingData = false;
    				console.log(resp);
    			});
    		},
    		removeItem(item){
    			var self = this;
                require(['alertify'], function(alertify){
                    alertify.defaults.glossary.title = "Confirmation";
                    alertify.confirm('Are you sure you want to delete: <b>'+ item.name.toUpperCase() + '</b> from the Product List ?', function(e){
                        if (e) {
                            self.thenDeleteItem(item);
                        }
                    });
                });
    		},
    		thenDeleteItem(item){
    			var self = this;
    			var resource = self.$resource('api/item{/id}');
    			resource.delete({id: item.id}).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					if (json.deleted) {
    						self.items.$remove(item);
    					}
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		},
    		editItem(item){
    			var self = this;
                self.editingItem = true;
                self.modalUpdateItem = item;
    		},
    		initSelectCat(){
    			// select-category
    			var $select = $('#select-category');
                var vm = this;
                require(['select2'], function(){
                   $select.select2({
                        placeholder: "Select a category",
                        allowClear: true
                    });
                   $select.change(function(event) {
                       var val = $(this).val();
                       vm.selected_category = Number(val);
                   });
                });
    		},
    		initSelect2(){
    			var $select = $('#select-branch');
                var vm = this;
                require(['select2'], function(){
                   $select.select2({
                        placeholder: "Select a branch",
                        allowClear: true
                    });
                   $select.change(function(event) {
                       var val = $(this).val();
                       vm.selected_branch = Number(val);
                   });
                });
    		},
    		getCategoryName(item){
    			let filtered = _.filter(this.categories, {id: Number(item.category)});
    			if (filtered.length) {
    				item.category_name = filtered[0].name;
    				return filtered[0].name;
    			}else {
                    return '-';
                }
    		},
            getBranchName(item){
                let filtered = _.where(this.branches, {id: Number(item.branch)});
                if (filtered.length) {
                    item.branch_name = filtered[0].name;
                    return filtered[0].name;
                }else {
                    return '-';
                }
            },
            jsFilterCategory(newVal){
                var self = this;
                var resource = self.$resource('api/item/category{/id}');
                resource.get({id: newVal}).then((resp) => {
                    if (resp.status === 200) {
                        self.items = JSON.parse(resp.body);
                    }
                }, (resp) => {
                    console.log(resp);
                });
            },
            jsFilterBranch(newVal){
                var self = this;
                var resource = self.$resource('api/item/branch{/id}');
                resource.get({id: newVal}).then((resp) => {
                    if (resp.status === 200) {
                        self.items = JSON.parse(resp.body);
                    }
                }, (resp) => {
                    console.log(resp);
                });
            }
    	},
    	watch: {
            'selected_bg_type': function(newVal, oldVal){
                console.log(newVal);
            },
    		'selected_category': function(newVal){
    			this.jsFilterCategory(newVal);
    		},
    		'selected_branch': function(newVal){
    			this.jsFilterBranch(newVal);
    		}
    	}
    });
   
    return Component; 
});