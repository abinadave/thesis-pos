define(['vue','vue-resource','underscore'], 
	function(Vue, VueResource, _) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: `
    		<div class="modal fade" id="receipt-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			    <div class="modal-dialog">
			        <div class="modal-content">
			            <div class="modal-header">
			                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			                <h4 class="modal-title" id="myModalLabel"></h4>
			            </div>
			            <div class="modal-body">                
				            <div>
				            	<h3 class="text-center">SEAN JOE PHARMACY</h3>
				            	<p class="text-center">CHONA A. ESPINOSA - Prop</p>
				            	<p class="text-center">District III, Babatgnon, Leyte</p>
				            	<p class="text-center">NON VAT Reg. TIN: 271-534-401-000</p>
				            </div>
				            <div>
				            		<p class="pull-left">Sales Invoice  _________________________</p>
				            		<p class="pull-right">Date _________________________</p>
				            		<p class="pull-left">Sold to _________________________</p>
				            </div>
			            </div>
			            <div class="modal-footer">
			                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			                <button type="submit" class="btn btn-primary"> Print <i class="glyphicon glyphicon-print"></i></button>
			            </div>
			        </div>
			        <!-- /.modal-content -->
			    </div>
			    <!-- /.modal-dialog -->
			</div>
    	`,
    	props: {
    		user: {
    			type: Object
    		}
    	},
    	data(){
    		return {
    			items: []
    		}
    	},
    	created(){
    		
    	},
    	ready(){

    	},
    	methods: {
    
    	},
        watch: {
          
        },
        components: {

        }
    });
   
    return Component; 
});