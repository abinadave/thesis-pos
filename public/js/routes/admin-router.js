define([
	'vue',
	'vue-router'
	], function(Vue, VueRouter) {
		
	Vue.use(VueRouter);
	var App = Vue.extend({});
    router = new VueRouter();
    var self = this;

	router.map({

		'/Staff/Trashed': {
			name: 'trashed-staff',
			component(resolve){
				require(['components/admin/staff/comp_table_trashed_staff'], resolve);
			}
		},

		'/Staff/Create': {
			name: 'create-staff',
			component(resolve){
				require(['components/admin/staff/comp_create_staff'], resolve);
			}
		},

		'/Staff/All': {
			name: 'staff-list',
			component(resolve){
				require(['components/admin/staff/comp_table_staff'], resolve);
			}
		},

		'/Branch/Create': {
			name: 'create-branch',
			component(resolve){
				require(['components/admin/branch/comp_create_branch'], resolve);
			}
		},

		'/Branch/All': {
			name: 'branch-list',
			component(resolve){
				require(['components/admin/branch/comp_table_branches'], resolve);
			}
		},

		'/Product/All': {
			name: 'list-of-products',
			component: function(resolve){
				require(['components/admin/inventory/comp_inventory_list_admin'], resolve);
			}
		},	

		'/Product/create': {
			name: 'create-product',
			component: function(resolve){
				require(['components/admin/inventory/comp_create_inventory_item'], resolve);
			}
		},

		'/Product/Trashed': {
			name: 'trashed-products',
			component(resolve){
				require(['components/admin/inventory/comp_table_trashed_item'], resolve);
			}
		},

		'/Product/Expiration': {
			name: 'expiration',
			component(resolve){
				require(['components/admin/expiration/comp_table_item_expiration'], resolve);
			}
		},

        '/Category/Create': {
            name: 'create-category',
            component(resolve){
                require(['components/staff/category/comp_create_category'], resolve);
            }
        },

        '/Category/All': {
            name: 'category-list',
            component(resolve){
                require(['components/staff/category/comp_table_category'], resolve);
            }
        },

        '/Reports/Receive': {
        	name: 'reports-receiving',
        	component(resolve){
        		require(['components/admin/report/receiving/comp_receiving_report'], resolve);
        	}
        },

        '/Reports/Outgoing': {
        	name: 'reports-outgoing',
        	component(resolve){
        		require(['components/admin/purchase/comp_list_of_all_purchases_admin'], resolve);
        	}
        },

        'Product/Type/Generic': {
        	name: 'bg-type-generic',
        	component(resolve){
        		require(['components/admin/inventory/generic/comp_generic_items_admin'], resolve);
        	}
        },

        'Product/Type/Branded': {
        	name: 'bg-type-branded',
        	component(resolve){
        		require(['components/admin/inventory/branded/comp_branded_items_admin'], resolve);
        	}
        },

        'System/Logs': {
        	name: 'system-logs',
        	component(resolve){
        		require(['components/admin/logs/comp_table_userlogs_admin'], resolve);
        	}
        },

		'*': {
			component: Vue.extend({
				template:'<div class="jumbotron text-center"><h2>Url you specified was not found!</h2></div>'
			})
		}

	});
	
	router.redirect({
	  // redirect any navigation to /a to /b
	  '/': '/Product/All'
	});

    return router; 
});