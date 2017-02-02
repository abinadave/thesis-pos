define(['vue',
	'vue-resource',
	'text!templates/admin/staff/temp_form_edit_staff.html'], 
	function(Vue, VueResource, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		},
    		editingStaff: {
    			type: Boolean
    		},
    		formStaff: {
    			type: Object
    		},
            branches: {
                type: Array
            }
    	},
    	data(){
    		return {
    			saving: false,
    			errors: {
    				name: ''
    			}
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
    		sendForm(){
    			var self = this;
    			self.$http.put('/api/staff', self.formStaff).then((resp) => {
    				console.log(resp);
    			}, (resp) => {
    				console.log(resp);
    			});
    		}
    	},
    	
    });
   
    return Component; 
});