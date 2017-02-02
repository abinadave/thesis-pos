define(['vue',
	'vue-resource','underscore','moment'], 
	function(Vue, VueResource, _, moment) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: `
            <div class="span12">

            <input v-model="search" type="text" class="form-control" placeholder="Search logs">

                <div class="widget-box">
                  <div class="widget-title"> <span class="icon"><i class="icon-time"></i></span>
                    <h5>User Logs <span class="badge" style="margin-left: 10px">{{ userlogs.length }}</span></h5>
                  </div>

                  <div class="widget-content nopadding">
                    <table class="table table-bordered data-table">
                      <thead>
                        <tr>
                          <th style="text-align:left" class="text-center">Activity</th>
                          <th style="text-align: center" class="text-center">User</th>
                          <th style="text-align: center" class="text-center">Date</th>
                          <th style="text-align: center" class="text-center">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                         <tr v-for="log in userlogs | filterBy search in 'activity' 'user' 'date' 'time'">
                             <td>{{ log.activity }}</td>
                             <td style="text-align: center">{{ getUserName(log) }}</td>
                             <td style="text-align: center">{{ getDate(log) }}</td>
                             <td style="text-align: center">{{ getTime(log) }}</td>
                         </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
            </div>
        `,
    	props: {
    		user: {
    			type: Object
    		},

    	},
    	data(){
    		return {
    			search: '',
                users: [], userlogs: []
    		}
    	},
    	created(){
            this.fetchAll();
    	},
    	ready(){

    	},
    	methods: {
            getUserName(log){
                let self = this;
                let rs = _.filter(self.users, { id: log.user_id});
                log.user = rs[0].name;
                return rs[0].name;
            },
            getDate(log){
                let self = this;
                let formated = moment(log.created_at).format('MMMM DD, YYYY, dddd');
                log.date = formated;
                return formated;
            },
            getTime(log){
                let self = this;
                let formated = moment(log.created_at).format('hh:mm a');
                log.time = formated;
                return formated;
            },
    		fetchAll(){
                let self = this;
                self.$http.get('/log_management').then((resp) => {
                    if (resp.status === 200) {
                        let json = JSON.parse(resp.body);
                        $.each(json, function(key, value){
                            self[key] = value;
                        });
                    }
                });
            }
    	}
    	
    });
   
    return Component; 
});