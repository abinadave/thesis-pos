 // This set's up the module paths for underscore and backbone
require.config({
	waitSeconds : 25, 
    'paths': { 
		"vue": "libs/vue/vue",
		"vue-resource": "libs/vue/vue-resource",
		"vue-router": "libs/vue/vue-router",
		"domReady": "libs/requirejs/domReady",
		"moment": "libs/momentjs/moment.min",
		"css": "libs/require-css/css",
		"underscore": "libs/backbone/underscore-min",
		"file-uploader": "libs/fileuploader/client/fileuploader",
		"jqueryui": "libs/jquery-ui/jquery-ui.min",
		"printarea": "libs/print-area/demo/jquery.PrintArea",
		"alertify": "libs/alertify/alertify.min",
		"tags-input": "libs/bootstrap-tagsinput-latest/src/bootstrap-tagsinput",
		"toastr": "libs/toastr/toastr.min",
		"select2": "../assets/matrix/HTML/js/select2.min",
		"datepicker-bootstrap": "../assets/matrix/HTML/js/bootstrap-datepicker"
	},
	
	'shim': 
	{	
		"fileuploader": {
			'deps': ['css!libs/fileuploader/client/fileuploader.css']
		},

		"vue": {
			'exports': 'Vue'
		},
		
		"vue-resource": {
			'exports': 'VueResource'
		},

		"vue-router": {
			'exports': 'VueRouter'
		},

		"domeReady": {
			'exports': 'domeReady'
		},

		"underscore": {
			'exports':  '_'
		},

		"jqueryui": {
        	"deps": [
        		'css!libs/jquery-ui/jquery-ui.min.css'
        	]
        },

        "alertify": {
        	'exports': 'alertify',
        	'deps': [
				'css!libs/alertify/css/alertify.min.css',
				'css!libs/alertify/css/themes/bootstrap.min.css'
        	]
        },

        "tags-input": {
        	'deps': [
        		'css!libs/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.css'
        	]
        },


        "toastr": {
        	"deps": [
        		'css!libs/toastr/toastr.min.css'
        	]
        },

        "select2": {
        	"deps": [
        		"css!../assets/matrix/HTML/css/select2.css"
        	]
        },

        "datepicker-bootstrap": {
        	"deps": [
        		"css!../assets/matrix/HTML/css/datepicker.css"
        	]
        }


	},

	'map': {
        "*": {
            "css":  "libs/require-css/css"
        }
    }	

}); 

require(
	[
		'domReady',
		'app-staff'
	],
	function(domReady, app_staff){
	domReady(function(){
		app_staff.init();
	});
});

