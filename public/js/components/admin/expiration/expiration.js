define(['vue','vue-resource','moment'], function(Vue, VueResource, moment) {
	Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var App = new Vue({
		data: {
		   message: 'Hello Vue!',
		   alert_expiration: [],
		   item_expirations: [],
		   items: [],
		   receiving_forms: [],
		   receiving_items: []
		},
		created(){
			this.fetch();
		},
		methods: {
			fetch(){
				let self = this;
				self.$http.get('api/fetch_expiration_management').then((resp) => {
					if (resp.status = 200) {
						let json = JSON.parse(resp.body);
						$.each(json, function(index, val) {
							self[index] = val;
						});
					}
				}, (resp) => {
					console.log(resp);
				});
			},
			createNotification(list){
				let self = this;
				let expiry_date = '';
				let days = self.alert_expiration[0].days;
				let a =0, b = 0;
				return list.filter(function(model) {
					let expiry_date = moment(model.expiry_date).format('MMMM DD, YYYY');
					a = moment(expiry_date);
					b = moment().format('MMMM DD, YYYY');
					return a.diff(b, 'days') < days;
				});
			}
		},
		watch: {
			'item_expirations': function(newVal, oldVal){
				let self = this;
				setTimeout(function() {
					let list = self.createNotification(newVal);
					let item_expiration = {};
					let rsItem = [];
					require(['toastr'], function(toastr){
						for (var i = 0; i < list.length; i++) {
							item_expiration = list[i];
							rsItem = _.where(self.items, {id: item_expiration.product_id});
							if (rsItem.length) {
								toastr.info(rsItem[0].name.toUpperCase() +' Will expire within ' + moment(item_expiration.expiry_date).fromNow());
							}
						}
					});
				}, 10000);
			}
		}
	})
    return App; 
});