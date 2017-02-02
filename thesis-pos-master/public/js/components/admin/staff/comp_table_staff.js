define(['vue','vue-resource',
    'underscore',
    'moment',
	'text!templates/admin/staff/temp_table_staff.html',
    'components/admin/staff/comp_form_edit_staff'], 
	function(Vue, VueResource, _, moment, template, CompFormEditStaff) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
        props: {
            filtered: {
                type: Array
            }
        },
        data(){
            return {
                branches: [], users: [],
                search: '',
                selected_branch: 0,
                editingStaff: false,
                formStaff: {}
            }
        },
    	created(){
            this.fetch();
    	},
        ready(){
            this.initSelect2Branch();
        },
        components: {
            'form-edit-staff': CompFormEditStaff
        },
        methods: {
            updateStaff(staff){
                this.editingStaff = true;
                this.formStaff = staff;
            },
            deleteUser(user){
                var self = this;
                require(['alertify'], function(alertify){
                    alertify.defaults.glossary.title = "Confirmation";
                    alertify.confirm('Are you sure you want to delete: <b>'+ user.name.toUpperCase() + '</b> from the Staff List ?', function(e){
                        if (e) {
                            self.thenDelete(user);
                        }
                    });
                });
            },
            thenDelete(user){
                var self = this;
                var resource = self.$resource('api/user{/id}');
                resource.delete({id: user.id}).then((resp) => {
                    if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        if (json.deleted) {
                            self.users.$remove(user);
                        }
                    }
                }, (resp) => {
                    console.log(resp);
                })
            },

            getFilteredUsers(){
                var branch = Number(this.selected_branch);
                if (branch === 0) {
                    this.filtered = this.users;
                }else {
                    this.filtered = this.users.filter(function(index) {
                        return Number(index.branch_id) === branch;
                    });
                }
            },

            initSelect2Branch(){
                var $select = $('#selected-branch');
                var vm = this;
                require(['select2'], function(){
                   $select.select2({
                        placeholder: "Select a category",
                        allowClear: true
                    });
                   $select.change(function(event) {
                       var val = $(this).val();
                       vm.selected_branch = Number(val);
                   });
                });
            },
            parseDate(date){
                return moment(date).format('MMMM DD, YYYY, ddd');
            },
            getBranchName(staff){
                var self = this;
                var rs = _.where(self.branches, {id: staff.branch_id});
               if (rs.length) {
                    staff.branch_name = rs[0].name;
                    return rs[0].name;
               }else {
                    return '';
               }
            },
            fetch(){
                var self = this;
                self.$http.get('/api/staff_management').then((resp) => {
                    if (resp.status === 200) {
                        var json = JSON.parse(resp.body);
                        $.each(json, function(index, val) {
                            self[index] = val;
                        });
                    }
                }, (resp) => {
                    console.log('error while fetching branch management');
                    console.log(resp);
                });
            }
        }

    });
   
    return Component; 
});