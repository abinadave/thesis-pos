define(['vue','vue-resource',
	'text!templates/admin/branch/temp_create_branch.html'], 
	function(Vue, VueResource, template) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
        created(){
            // this.fetchAll();
        },
    	data(){
    		return {
                branches: [],
                staffs: [],
                items: [],
    			form:{
    				name: '',
    				code: ''
    			},
                errors: {
                    name: '',
                    code: ''
                },
                focushere: true
    		}
    	},
    	methods: {
            clearErrors(){
                var self = this;
                self.errors.name = '';
                self.errors.code = '';
            },
    		saveBranch(){
    			var self = this;
                self.clearErrors();
    			self.$http.post('/api/branch', self.form).then((resp) => {
                    if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        self.form.name = ''; self.form.code = '';
                        $('.branch-name').focus();
                        require(['toastr'], function(toastr){
                            toastr.info('new branch added');
                        });
                    }
                }, (resp) => {
                    if (resp.status == 422) {
                        var json = JSON.parse(resp.body);
                        $.each(json, function(index, val) {
                            self.errors[index] = val;
                            console.log(index + ': ' + val);
                        });
                    }
                });
    		}
    	}
    });
   
    return Component; 
});