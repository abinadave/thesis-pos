define(['vue','vue-resource',
	'text!templates/admin/staff/temp_create_staff.html'],
	 function(Vue, VueResource, template) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	data(){
    		return {
    			branches: [],
    			form: {
    				name: '',
    				email: '',
    				password: '',
    				password_confirmation: '',
    				branch_id: ''
    			},
    			errors: {
    				name: '',
    				email: '',
    				password: '',
    				password_confirmation: '',
    				branch_id: ''
    			},
    			saving: false
    		}
    	},
    	created(){
    		this.initSelect2();	
    		this.fetch();
    	},
    	ready(){
    		this.initSelect2();
    	},
    	methods: {
    		clearErrorFirst(){
    			var self = this;
    			self.errors.name = ''; self.errors.email = ''; self.errors.password = ''; self.errors.branch_id = ''; self.errors.password_confirmation = '';
    		},
    		ClearForm(){
    			this.form.name = '';
    			this.form.email = '';
    			this.form.password = '';
    			this.form.password_confirmation = '';
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
                       vm.form.branch_id = Number(val);
                   });
                });
    		},
    		saveStaff(){
    			var self = this;
    			self.saving = true;
    			self.clearErrorFirst();
    			self.$http.post('/api/user', self.form).then((resp) => {
    				if (resp.status === 200) {
    					var json = JSON.parse(resp.body);
    					self.ClearForm();
    					self.saving = false;
    					require(['toastr'], function(toastr){
    					    toastr.info('Branch staff successfully saved');
    					});
    				}
    			}, (resp) => {
    				if (resp.status == 422) {
    					self.saving = false;
    					var json = JSON.parse(resp.body);
    					$.each(json, function(index, val) {
    						self.errors[index] = val;
    					});
    				}
    			});
    		},
    		
    		fetch(){
    			var self = this;
    			self.$http.get('/api/branch').then((resp) => {
    				if (resp.status === 200) {
    					self.branches = JSON.parse(resp.body);
    				}
    			}, (resp) => {
    				console.log(resp);
    			});
    		}
    	}
    });
   
    return Component; 
});