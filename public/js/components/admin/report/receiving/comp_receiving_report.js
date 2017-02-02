define([
	'vue',
	'vue-resource',
	'underscore',
	'text!templates/admin/report/receiving/temp_receiving_report.html',
    'components/admin/report/receiving/comp_list_of_receiving_forms',
    'components/admin/report/receiving/comp_list_of_receiving_items'], 
	function(Vue, VueResource, _, template,
        CompListOfReceivingForms, CompListOfReceivingItems) {
   
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
    			items: [],
    			receiving_forms: [],
    			receiving_items: [],
    			search_receiving_forms: ''
    		}
    	},
    	created(){
    		this.fetchAll();
    	},
    	ready(){

    	},
        components: {
            'receiving-form-list': CompListOfReceivingForms,
            'receiving-item-list' : CompListOfReceivingItems
        },
    	methods: {
    		fetchAll(){
    			let self = this;
    			self.$http.get('/api/receive_item_management').then((resp) => {
    				let json = JSON.parse(resp.body);
    				$.each(json, function(index, val) {
    					self[index] = val;
    				});
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