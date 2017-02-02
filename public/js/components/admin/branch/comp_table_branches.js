define(['vue','vue-resource',
	'text!templates/admin/branch/temp_table_branches.html',
	'moment',
    'components/admin/branch/comp_modal_update_branch'], 
	function(Vue, VueResource, template, moment, CompModalUpdateBranch) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	data(){
    		return {
                modalEditBranch: {},
                search: '',
    			branches: [], 
                items: [], 
                staffs: []
    		}
    	},
    	created(){
    		this.fetch();
            this.fetchAll();
    	},
       
        components: {
            'modal-update-branch': CompModalUpdateBranch
        },
    	methods: {
            getStaffLengthInBranch(branch){
                return this.staffs.filter(function(index) {
                    return Number(index.branch_id) === Number(branch.id);
                });
            },
            getTotalItemsInBranch(branch){
                return this.items.filter(function(index) {
                    return Number(index.branch) === Number(branch.id);
                });
            },
            fetchAll(){
                var self = this;
                self.$http.get('/api/branch_management').then((resp) => {
                    var json = JSON.parse(resp.body);
                   $.each(json, function(index, val) {
                        self[index] = val;
                   });
                }, (resp) => {
                    console.log(resp);
                });
            },
    		editBranch(branch){
                $('#modal-update-branch').modal('show');
    			this.modalEditBranch = branch;
    		},

    		deleteBranch(branch){
    			var self = this;
    			require(['alertify'], function(alertify){
    				alertify.defaults.glossary.title = 'Confirmation';
    			    alertify.confirm('Are you sure you want to delete: <b>'+branch.name + '</b> from the list ?', function(e){
    			    	if (e) {
    			    		self.removeDB(branch);
    			    	}
    			    });
    			});
    		},
    		removeDB(branch){
    			var self = this;
    			var resource = self.$resource('api/branch{/id}');
    			resource.delete({id: branch.id}).then( (resp) => {
    				self.branches.$remove(branch);
    			}, (resp) => {
                    console.log('error while deleting branch');
    				console.log(resp);
    			});
    		},
    		fetch(){
    			var self = this;
    			self.$http.get('/api/branch').then((resp) => {
    				if (resp.status === 200) {
    					self.branches = JSON.parse(resp.body);
    				}
    			}, (resp) => {
                    console.log('error while fetching branches');
    				console.log(resp);
    			});
    		},
    		getDateCreated(created_at){
    			return moment(created_at).format('MMMM DD, YYYY hh:mm a');
    		}
    	}
    });
   
    return Component; 
});