var app = {
	settings : {
		'firebaseUrl': 'https://codify.firebaseio.com/'
	}
};

angular.module("codify", ['projects.controllers','classes.controllers','properties.controllers','methods.controllers','app.utils'])
    .config(function($routeProvider) {
    	console.log("route provider config");
        $routeProvider.when('/projects', {
            templateUrl: 'partials/pages/projects.html',
            controller: "ProjectListCtrl"
        }).when('/projects/:projectId', {
            templateUrl: 'partials/pages/project.html',
            controller: "ProjectCtrl"
        }).otherwise({
            redirectTo: '/projects'
        });
    });
