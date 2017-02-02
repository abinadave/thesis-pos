define([
    'vue',
    'vue-router'
    ], function(Vue, VueRouter) {
        
    Vue.use(VueRouter);
    var App = Vue.extend({});
    router = new VueRouter();
    router.map({
        
        '/': {
            name: 'home',
            component: function(resolve){
                console.log('home component');
            },
        },

        '/Item/All': {
            name: 'list-of-items',
            component: function(resolve){
                require(['components/staff/item/comp_item_list_staff'], resolve);
            }
        },

        '/Category/All': {
            name: 'category-list',
            component(resolve){
                require(['components/staff/category/comp_table_category'], resolve);
            }
        },

        'Purchases/All': {
            name: 'purchases',
            component(resolve){
                require(['components/staff/purchase/comp_table_purchases_staff'], resolve);
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
      '/': '/Item/All'
    });
    return router; 
});