define(['vue','vue-resource',
    'text!templates/admin/report/receiving/temp_list_of_receiving_forms.html',
    'moment'], 
    function(Vue, VueResource, template, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: {
    		user: {
    			type: Object
    		},
            receivingForms: {
                type: Array
            },
            items: {
                type: Array
            },
            receivingItems: {
                type: Array
            }
    	},
    	data(){
    		return {
                search: '',
                date_from: '',
                date_to: ''
    		}
    	},
    	created(){

    	},
    	ready(){

    	},
    	methods: {
            printTable(){
                let self = this;
                console.log('printing...');
                $('#some-text-print').html('Incomming Item Report, ' + moment().format('MMMM DD, YYYY'));
                let hideElements = '.pull-right, .toast-container, .icon-remove, label, li, input, #toast-container, #footer, .dropdown, #search-report, .icon-print, .nav-tabs, #c, #header, #sidebar';
                $(hideElements).hide();
                $('table').find('th, td').css({
                    padding: '2px',
                    'font-size': '11px'
                });
                setTimeout(function(){
                    window.print();
                    setTimeout(function(){
                        $(hideElements).show();
                        $('#some-text-print').hide();
                    }, 1000);
                }, 1000);
            },
            getItems(rid){
                return _.where(this.receivingItems, {rid: rid});
            },
            getItemsReceived(model){
                let self = this;
                let rs = self.getItems(model.id);
                return rs.length;
            },
            getNames(model){
                let rsReceivingItems = this.getItems(model.id);
                let pids = _.pluck(rsReceivingItems, 'pid');
                let arr = this.items.filter(function(product) { return _.contains(pids, product.id) === true; });
                let names = _.pluck(arr, 'name').join(', ');
                model.names = names;
                return names;
            },
            emitClearDate(){
                this.$emit('clear-date');
                this.date_from = '';
                this.date_to  = '';
            },
            filterByDates(){
                let self = this;
                let date_from = moment(this.date_from).format('MMMM DD, YYYY');
                let date_to = moment(this.date_to).format('MMMM DD, YYYY');
                if (date_from !== 'Invalid date' && date_to !== 'Invalid date') {
                    self.$http.post('/api/receiving_form/between_dates', {
                        date_from: date_from,
                        date_to: date_to
                    }).then((resp) => {
                        let json = JSON.parse(resp.body);
                        self.receivingForms = json;
                    }, (resp) => {
                        console.log(resp);
                    });  
                }else {
                    console.log('dre pa valid');
                }
                
            }
    	},
    	watch: {
            'date_from': function(newVal, oldVal){
                this.filterByDates();
            },
    		'date_to': function(newVal, oldVal){
                this.filterByDates();
            }
    	}
    });
   
    return Component; 
});