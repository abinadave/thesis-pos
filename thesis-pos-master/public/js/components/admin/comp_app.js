define(['vue','vue-resource'], function(Vue, VueResource) {

	Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var App = Vue.extend({
    	data: function(){
    		return {
    			products: [], categories: [], colors: [], sizes: [],
    			genericItemLength: 0, brandedItemLength: 0
    		}
    	},
    	created(){
    		this.countItemByType('generic').countItemByType('branded');
    	},
    	methods: {
    		countItemByType(param){
    			let self = this;
    			let resource = self.$resource('item/count{/type}');
    			resource.get({
    				type: param
    			}).then((resp) => {
    				if (resp.status === 200) {
    					let json = JSON.parse(resp.body);
    					let key = param + 'ItemLength';
    					self[key] = json.count;
    				}
    			});
    			return this;
    		}
    	}
    });
    return App; 
});