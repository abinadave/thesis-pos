define(['vue','vue-resource',
	'text!templates/admin/expiration/temp_edit_alert_date.html'], 
	function(Vue, VueResource, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
            daysBeforeExpiration: {
            	type: Number
            }
    	},
    	data(){
    		return {
               	days: '',
                item_expirations: []
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
    		saveDaysBeforeAlert(){
    			let self = this;
    			self.$http.post('/api/alert_expiration', {
    				days: self.days
    			}).then((resp) => {
    				if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        if (json.id > 0) {
                            self.daysBeforeExpiration = Number(json.days);
                            self.days = '';
                        }
                    }
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